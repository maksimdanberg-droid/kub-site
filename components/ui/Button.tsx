import Link from "next/link";
import { forwardRef } from "react";

type ButtonBaseProps = {
  variant?: "primary" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ variant = "primary", href, className = "", children, onClick, ...props }, ref) => {
    const baseClasses = 
      "inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-kub-gold disabled:opacity-50 disabled:cursor-not-allowed select-none";
    
    const variants = {
      primary: "bg-kub-gold text-kub-navy hover:bg-[#BFA033] hover:shadow-lg hover:shadow-kub-gold/20 active:scale-[0.98]",
      outline: "border-2 border-kub-navy text-kub-navy hover:bg-kub-navy hover:text-white active:scale-[0.98] dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-kub-navy",
    };

    if (href) {
      return (
        <Link
          href={href}
          className={`${baseClasses} ${variants[variant]} ${className}`}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";