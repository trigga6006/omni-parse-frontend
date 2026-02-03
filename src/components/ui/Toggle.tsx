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
      aria-pressed={pressed}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-3 py-2',
        'text-sm font-medium transition-colors',
        'hover:bg-muted hover:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-50',
        pressed && 'bg-accent text-accent-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Toggle;
