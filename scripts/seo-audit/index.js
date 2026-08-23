#!/usr/bin/env node
/**
 * 🚀 SEO Audit Script for Next.js (App Router)
 * Поддерживает: <h1>, <motion.h1>, <Box.h2>, динамический текст, метаданные, иерархию
 */

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// ================== НАСТРОЙКИ ПУТЕЙ ==================
const PROJECT_ROOT = 'C:/Projects/kub-site';
const APP_DIR = path.join(PROJECT_ROOT, 'app');       // App Router в корне
const SRC_DIR = PROJECT_ROOT;                         // Компоненты тоже в корне
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'scripts/seo-audit/seo-audit-report.json');
// =====================================================

// 🎨 Логгер (chalk@4 совместимый)
const log = {
  info: (msg) => console.log(chalk.blue('ℹ️'), msg),
  success: (msg) => console.log(chalk.green('✅'), msg),
  warn: (msg) => console.log(chalk.yellow('⚠️'), msg),
  error: (msg) => console.log(chalk.red('❌'), msg),
  heading: (msg) => console.log('\n' + chalk.bold.cyan('🔍 ' + msg) + '\n')
};

// ================== 1. Извлечение заголовков ==================
function extractHeadingsFromFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const headings = [];

  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
      errorRecovery: true
    });

    traverse(ast, {
      JSXOpeningElement(path) {
        // ✅ Определяем тег для <h1>, <motion.h1>, <styled.h2>, <Box.h3>
        let tagName = null;
        const nameNode = path.node.name;
        if (nameNode?.type === 'JSXIdentifier') {
          tagName = nameNode.name.toLowerCase();
        } else if (nameNode?.type === 'JSXMemberExpression') {
          tagName = nameNode.property?.name?.toLowerCase();
        } else if (nameNode?.type === 'JSXNamespacedName') {
          tagName = nameNode.local?.name?.toLowerCase();
        }

        if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) return;

        // ✅ Рекурсивный сбор текста из children
        let fullText = '';
        let isDynamic = false;
        const children = path.parent?.children || [];

        const extract = (node) => {
          if (!node) return;
          if (node.type === 'JSXText') {
            fullText += node.value.replace(/\s+/g, ' ').trim();
          } else if (node.type === 'JSXExpressionContainer') {
            isDynamic = true;
            if (node.expression.type === 'StringLiteral') {
              fullText += node.expression.value;
            } else if (node.expression.type === 'TemplateLiteral') {
              fullText += node.expression.quasis.map(q => q.value.raw).join('');
            }
          } else if (node.children) {
            node.children.forEach(extract);
          }
        };
        children.forEach(extract);

        headings.push({
          tag: tagName,
          text: fullText || null,
          line: path.node.loc?.start.line || null,
          isDynamic,
          isStatic: !isDynamic && !!fullText,
          sourceComponent: ''
        });
      }
    });
  } catch (e) {}

  return headings;
}

// ================== 2. Сбор карты компонентов ==================
function buildComponentMap() {
  log.info('Сканирование компонентов...');
  const componentMap = new Map();

  const files = glob.sync('**/*.{tsx,ts}', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/.next/**', '**/*.test.*', '**/*.stories.*', '**/page.tsx', '**/layout.tsx']
  });

  for (const file of files) {
    const headings = extractHeadingsFromFile(file);
    if (headings.length > 0) {
      const name = path.basename(file);
      componentMap.set(name, {
        file: path.relative(PROJECT_ROOT, file),
        headings
      });
    }
  }

  log.success(`Найдено компонентов с заголовками: ${componentMap.size}`);
  return componentMap;
}

// ================== 3. Извлечение metadata из page.tsx ==================
function extractMetadataFromPage(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const metadata = {
    hasExport: false, title: null, description: null, openGraph: null, canonical: null, isDynamic: false
  };

  try {
    const ast = parser.parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'], errorRecovery: true });

    traverse(ast, {
      ExportNamedDeclaration(path) {
        const decl = path.node.declaration;
        if (decl?.type === 'VariableDeclaration') {
          for (const dec of decl.declarations) {
            if (dec.id.name === 'metadata') {
              metadata.hasExport = true;
              if (dec.init?.type === 'ObjectExpression') {
                for (const prop of dec.init.properties) {
                  if (prop.type !== 'ObjectProperty' || !prop.key?.name) continue;
                  const k = prop.key.name;
                  if (k === 'title' && prop.value?.type === 'StringLiteral') metadata.title = prop.value.value;
                  if (k === 'description' && prop.value?.type === 'StringLiteral') metadata.description = prop.value.value;
                  if (k === 'openGraph' && prop.value?.type === 'ObjectExpression') metadata.openGraph = '[object]';
                  if (k === 'alternates' && prop.value?.type === 'ObjectExpression') {
                    for (const alt of prop.value.properties) {
                      if (alt.key?.name === 'canonical' && alt.value?.type === 'StringLiteral') {
                        metadata.canonical = alt.value.value;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (decl?.type === 'FunctionDeclaration' && decl.id?.name === 'generateMetadata') {
          metadata.hasExport = true;
          metadata.isDynamic = true;
        }
      }
    });
  } catch (e) {}

  return metadata;
}

// ================== 4. Валидация SEO-правил ==================
function validateSEO(pageInfo) {
  const issues = [];
  const headings = pageInfo.headings;

  const h1s = headings.filter(h => h.tag === 'h1');
  if (h1s.length === 0) {
    issues.push({ type: 'warn', msg: 'H1 не найден в статическом анализе (проверьте Hero-компоненты)' });
  } else if (h1s.length > 1) {
    issues.push({ type: 'warn', msg: `Несколько H1: ${h1s.length} (рекомендуется один)` });
  }

  const tags = headings.map(h => h.tag);
  for (let i = 1; i < tags.length; i++) {
    const prev = parseInt(tags[i-1].replace('h', ''));
    const curr = parseInt(tags[i].replace('h', ''));
    if (curr - prev > 1) {
      issues.push({ type: 'warn', msg: `Пропуск уровня: ${tags[i-1]} → ${tags[i]} (лучше: h${prev+1})` });
    }
  }

  if (!pageInfo.metadata.hasExport) {
    issues.push({ type: 'error', msg: 'Отсутствует export const metadata' });
  } else if (!pageInfo.metadata.isDynamic) {
    if (!pageInfo.metadata.title) issues.push({ type: 'warn', msg: 'Title пустой или динамический' });
    if (!pageInfo.metadata.description) issues.push({ type: 'warn', msg: 'Description пустой или динамический' });
  }

  if (pageInfo.metadata.title) {
    const len = pageInfo.metadata.title.length;
    if (len < 30) issues.push({ type: 'warn', msg: `Title слишком короткий: ${len} симв.` });
    if (len > 70) issues.push({ type: 'warn', msg: `Title слишком длинный: ${len} симв.` });
  }
  if (pageInfo.metadata.description) {
    const len = pageInfo.metadata.description.length;
    if (len < 50) issues.push({ type: 'warn', msg: `Description слишком короткий: ${len} симв.` });
    if (len > 170) issues.push({ type: 'warn', msg: `Description слишком длинный: ${len} симв.` });
  }

  return issues;
}

// ================== 5. Генерация отчёта (FIXED) ==================
function generateReport(componentMap) {
  log.heading('Анализ страниц (page.tsx)');
  const pageFiles = glob.sync('**/page.{ts,tsx}', { cwd: APP_DIR, absolute: true, ignore: ['**/node_modules/**'] });
  const report = [];

  for (const pagePath of pageFiles) {
    const pageRel = path.relative(PROJECT_ROOT, pagePath);
    const metadata = extractMetadataFromPage(pagePath);
    const pageHeadings = [];

    try {
      const code = fs.readFileSync(pagePath, 'utf8');
      const ast = parser.parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'], errorRecovery: true });
      
      traverse(ast, {
        ImportDeclaration(path) {
          for (const spec of path.node.specifiers) {
            const compName = spec.local?.name;
            if (!compName) continue;
            const compData = componentMap.get(compName + '.tsx') || componentMap.get(compName + '.ts');
            if (compData) {
              pageHeadings.push(...compData.headings.map(h => ({
                ...h,
                sourceComponent: compData.file
              })));
            }
          }
        }
      });
    } catch (e) {}

    // ✅ Исправлено: создаём объект сначала, потом вызываем валидацию
    const pageInfo = {
      page: pageRel,
      metadata,
      headings: pageHeadings,
      issues: []
    };

    pageInfo.issues = validateSEO(pageInfo);
    report.push(pageInfo);
  }

  return report;
}

// ================== 6. Вывод в консоль ==================
function printSummary(report) {
  const stats = {
    total: report.length,
    withMetadata: report.filter(p => p.metadata.hasExport).length,
    totalHeadings: report.reduce((sum, p) => sum + p.headings.length, 0),
    errors: report.filter(p => p.issues.some(i => i.type === 'error')).length,
    warns: report.filter(p => p.issues.some(i => i.type === 'warn')).length
  };

  console.log('\n' + chalk.bold.cyan('📊 ИТОГИ АУДИТА') + '\n');
  console.log(`Страниц: ${chalk.bold(stats.total)} | С metadata: ${chalk.green(stats.withMetadata)} | Заголовков: ${chalk.bold(stats.totalHeadings)}`);
  console.log(`❌ Ошибки: ${stats.errors} | ⚠️ Предупреждения: ${stats.warns}\n`);

  const byType = { error: [], warn: [] };
  report.forEach(p => p.issues.forEach(i => byType[i.type].push({ page: p.page, ...i })));

  if (byType.error.length) {
    console.log(chalk.red.bold('\n🔴 КРИТИЧЕСКИЕ ОШИБКИ:'));
    byType.error.forEach(i => console.log(`  • ${chalk.gray(i.page)} → ${i.msg}`));
  }
  if (byType.warn.length) {
    console.log(chalk.yellow.bold('\n🟡 ПРЕДУПРЕЖДЕНИЯ (первые 5):'));
    byType.warn.slice(0, 5).forEach(i => console.log(`  • ${chalk.gray(i.page)} → ${i.msg}`));
    if (byType.warn.length > 5) console.log(`  ... ещё ${byType.warn.length - 5} (см. JSON)`);
  }
}

// ================== 🚀 ТОЧКА ВХОДА ==================
async function main() {
  console.log(chalk.bold.cyan('\n🔍 SEO Audit для Next.js App Router\n'));

  if (!fs.existsSync(APP_DIR)) {
    log.error(`Папка App Router не найдена: ${APP_DIR}`);
    process.exit(1);
  }

  const componentMap = buildComponentMap();
  const report = generateReport(componentMap);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    stats: { pages: report.length, withMetadata: report.filter(p => p.metadata.hasExport).length, totalHeadings: report.reduce((s,p)=>s+p.headings.length,0) },
    pages: report
  }, null, 2));
  log.success(`Отчёт сохранён: ${chalk.gray(OUTPUT_FILE)}`);

  printSummary(report);
  process.exit(0);
}

main().catch(err => { log.error(`Критическая ошибка: ${err.message}`); process.exit(1); });