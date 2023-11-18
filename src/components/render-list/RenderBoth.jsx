import { memo, useMemo } from 'react';

const Both = ({ names, numbers }) => {
  const listItem = names.map((item) => {
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

  return (
    <div>
      <h2>Render Both</h2>
      <ul>{listItem}</ul>
    </div>
  );
};

export const RenderBoth = memo(Both);
