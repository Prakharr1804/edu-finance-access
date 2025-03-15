
import React from 'react';
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

// Use Omit to exclude the variant property from ButtonProps
interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'primary' | 'subtle';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant = 'default', size = 'default', children, isLoading, ...props }, ref) => {
    // Map our custom variants to shadcn button variants
    const getVariant = (): ButtonProps['variant'] => {
      if (variant === 'primary') return 'default';
      if (variant === 'subtle') return 'secondary';
      // Only return valid variants that exist in ButtonProps
      return (variant === 'default' || variant === 'secondary' || 
              variant === 'outline' || variant === 'ghost' || 
              variant === 'link') ? variant : 'default';
    };

    return (
      <Button
        ref={ref}
        variant={getVariant()}
        size={size}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          {
            'bg-primary hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'subtle',
            'opacity-80 pointer-events-none': isLoading,
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
      </Button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export { CustomButton };
