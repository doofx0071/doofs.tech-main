import { ProductStatus } from '@/data/products';

interface StatusBadgeProps {
  status: ProductStatus;
}

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  live: {
    label: 'LIVE',
    className: 'bg-emerald-500 text-white',
  },
  beta: {
    label: 'BETA',
    className: 'bg-amber-500 text-black',
  },
  experimental: {
    label: 'EXPERIMENTAL',
    className: 'bg-rose-500 text-white',
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-sm ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
