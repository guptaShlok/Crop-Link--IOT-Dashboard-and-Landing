import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'warning' | 'critical' | 'active' | 'inactive';
  className?: string;
}

const statusConfig = {
  online: {
    variant: 'default' as const,
    class: 'bg-green-500/20 text-green-700 border-green-300',
    label: 'Online',
  },
  offline: {
    variant: 'destructive' as const,
    class: 'bg-red-500/20 text-red-700 border-red-300',
    label: 'Offline',
  },
  warning: {
    variant: 'outline' as const,
    class: 'bg-yellow-500/20 text-yellow-700 border-yellow-300',
    label: 'Warning',
  },
  critical: {
    variant: 'destructive' as const,
    class: 'bg-red-600/20 text-red-800 border-red-400',
    label: 'Critical',
  },
  active: {
    variant: 'default' as const,
    class: 'bg-blue-500/20 text-blue-700 border-blue-300',
    label: 'Active',
  },
  inactive: {
    variant: 'outline' as const,
    class: 'bg-gray-500/20 text-gray-700 border-gray-300',
    label: 'Inactive',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const dotColor =
    status === 'online' || status === 'active'
      ? 'bg-green-500'
      : status === 'warning'
      ? 'bg-yellow-500'
      : 'bg-red-500';

  return (
    <Badge
      variant={config.variant}
      className={cn('gap-1.5', config.class, className)}
    >
      <span className={cn('w-2 h-2 rounded-full', dotColor)} />
      {config.label}
    </Badge>
  );
}
