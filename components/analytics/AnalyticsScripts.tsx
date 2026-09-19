'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function AnalyticsScripts() {
  const [consent, setConsent] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const readConsent = () => {
      if (typeof window !== 'undefined') {
        setConsent(localStorage.getItem('kub_consent_accepted'));
      }
    };
    
    // Читаем состояние при первом монтировании
    readConsent();

    // ✅ Слушаем событие от ConsentBanner без перезагрузки страницы
    window.addEventListener('consentUpdated', readConsent);

    return () => {
      window.removeEventListener('consentUpdated', readConsent);
    };
  }, []);

  // ✅ Трекинг SPA-переходов для GA4
  useEffect(() => {
    if (consent === 'true' && typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname, consent]);

  // Если согласия нет, физически не рендерим скрипты
  if (consent !== 'true') {
    return null;
  }

  return (
    <>
      {/* Яндекс.Метрика */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112784493', 'ym');

            ym(112784493, 'init', {
              webvisor: true, 
              clickmap: true, 
              accurateTrackBounce: true, 
              trackLinks: true
            });
          `,
        }}
      />

      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z783WV1XKZ"
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // ✅ send_page_view: false, чтобы не дублировать первый просмотр (мы шлем его вручную через useEffect)
            gtag('config', 'G-Z783WV1XKZ', {
              send_page_view: false
            });
          `,
        }}
      />
    </>
  );
}