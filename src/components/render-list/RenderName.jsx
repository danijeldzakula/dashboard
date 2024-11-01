import { arraysAreEqual } from '@/helpers';
import { memo, useEffect, useState, useCallback } from 'react';

const initNames = ['React', 'Shadcn'];

const RenderName = memo(({ setData }) => {
  const [names, setNames] = useState(initNames);

  const addNewName = () => {
    setNames((prev) => {
      if (prev.includes('❤')) {
        return prev;
      }

      const reverse = [...prev];
      reverse.splice(1, 0, '❤');

      return [...reverse];
    });
  };

  const reverseNames = () => {
    setNames((prev) => {
      const reverse = [...prev];

      reverse.reverse();

      return reverse;
    });
  };

  const resetNames = () => {
    setNames(initNames);
  };

  const listItems = useCallback(() => {
    return names.map((item) => {
      return <li key={item.toString()}>{item}</li>;
    });
  }, [names]);

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        names: names,
      };
    });
  }, [names]);

  const isDisabled = arraysAreEqual(initNames, names);

  console.log('re-render names');

  return (
    <div>
      <h2>Render Name</h2>
      <button onClick={addNewName}>Add new name</button>
      <button onClick={reverseNames}>Reverse</button>
      <button disabled={isDisabled} onClick={resetNames}>
        Reset
      </button>
      <ul>{listItems()}</ul>
    </div>
  );
});

export default RenderName;
