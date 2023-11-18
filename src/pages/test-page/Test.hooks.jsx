import { useEffect, useState } from 'react';

export const useTest = () => {
  const [data, setData] = useState({
    names: [],
    numbers: [],
    notes: [],
  });

  useEffect(() => {
    // console.log('🚀 ~ file: Test.hooks.jsx:11 ~ useTest ~ names:', data.names);
  }, [data.names]);

  useEffect(() => {
    // console.log('🚀 ~ file: Test.hooks.jsx:15 ~ useTest ~ numbers:', data.numbers);
  }, [data.numbers]);

  useEffect(() => {
    // console.log('🚀 ~ file: Test.hooks.jsx:19 ~ useTest ~ notes:', data.notes);
  }, [data.notes]);

  return {
    names: data.names,
    numbers: data.numbers,
    notes: data.notes,
    setData: setData,
  };
};
