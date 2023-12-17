import { memo, useCallback } from 'react';

const RenderBoth = memo(({ names, numbers }) => {
  const listItem = useCallback(() => {
    return names.map((item) => {
      return (
        <li style={{ display: 'flex', gridGap: '15px' }} key={item.toString()}>
          {item}
          <p>
            {numbers.map((number) => {
              return <span key={number.toString()}>{number}</span>;
            })}
          </p>
        </li>
      );
    });
  }, [names, numbers]);

  console.log('re-render both');

  return (
    <div>
      <h2>Render Both</h2>
      <ul>{listItem()}</ul>
    </div>
  );
});

export default RenderBoth;
