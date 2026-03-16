import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-heading font-semibold rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-orange-600",
    secondary: "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
    whatsapp: "bg-brand-green text-white hover:bg-brand-green-hover",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const pxClass = "px-6 py-3";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${pxClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
