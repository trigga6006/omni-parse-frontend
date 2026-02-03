import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

export function Toggle({
  className,
  pressed = false,
  onPressedChange,
  children,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        'group inline-flex h-9 items-center gap-2 rounded-full px-4',
        'text-sm font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        pressed
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          'h-4 w-4 rounded-full transition-all duration-200',
          pressed ? 'bg-primary-foreground' : 'bg-muted-foreground/30'
        )}
      />
      {children}
    </button>
  );
}

export default Toggle;
