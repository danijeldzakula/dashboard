import { memo } from 'react';

const RenderLazy = memo(() => {
  console.log('re-render lazy');

  return (
    <div>
      <h2>Render Lazy</h2>
    </div>
  );
});

export default RenderLazy;
