import { arraysAreEqual, arraysHaveEqualElements } from '@/helpers';
import { memo, useEffect, useState } from 'react';

const initNumbers = [1];

const Number = ({ setData }) => {
  const [numbers, setNumbers] = useState(initNumbers);
  const [hasReverse, setHasReverse] = useState(false);

  const addNewNumber = () => {
    setNumbers((prev) => {
      if (!hasReverse) {
        const last = prev[prev.length - 1] + 1;
        return [...prev, last];
      }

      const first = prev[0] + 1;
      return [first, ...prev];
    });
  };

  const undoNumber = () => {
    setNumbers((prev) => {
      if (!hasReverse) {
        if (prev.length <= initNumbers.length) {
          return [...prev];
        }

        prev.pop();

        return [...prev];
      }

      if (prev.length <= initNumbers.length) {
        return [...prev];
      }

      prev.shift();
      return [...prev];
    });
  };

  const reverseNumbers = () => {
    setHasReverse((p) => !p);
    setNumbers((prev) => {
      const reverse = [...prev];
      reverse.reverse();
      return reverse;
    });
  };

  const resetNumbers = () => {
    setNumbers(initNumbers);
    setHasReverse(false);
  };

  const listItems = numbers.map((item) => {
    return <li key={item.toString()}>{item}</li>;
  });

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        numbers: numbers,
      };
    });
  }, [numbers]);

  const isDisabled = arraysAreEqual(initNumbers, numbers);
  const hasDisabled = arraysHaveEqualElements(initNumbers, numbers);

  console.log('re-render numbers');

  return (
    <div>
      <h2>Render Number</h2>
      <button onClick={addNewNumber}>Add new number</button>
      <button onClick={reverseNumbers}>Reverse</button>
      <button disabled={hasDisabled} onClick={undoNumber}>
        Undo
      </button>
      <button disabled={isDisabled} onClick={resetNumbers}>
        Reset
      </button>
      <ul>{listItems}</ul>
    </div>
  );
};

export const RenderNumber = memo(Number);
