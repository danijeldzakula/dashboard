import { clsx } from 'clsx';
import { Div } from '@/components/content';

export function Loading({ className }) {
  return (
    <Div className={clsx('loading', className)}>
      <h3>Loading...</h3>
    </Div>
  );
}
