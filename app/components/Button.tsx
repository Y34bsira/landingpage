
import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  className,
  asChild = false,
  children,
  ...props
}) => {
  const Component: React.ElementType = asChild ? React.Fragment : 'button';

  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none',
        {
          'bg-[#F86422] text-white hover:bg-orange-500': variant === 'default',
          'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-3 text-base': size === 'md',
          'px-5 py-4 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;