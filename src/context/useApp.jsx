import { createContext, useContext, useMemo, useState, useEffect, useLayoutEffect } from 'react';
import { arrayMoveImmutable, scrollFreeze, scrollUnfreeze } from '@/helpers';
import { STORAGE_WIDGET, HAS_WINDOW } from '@/helpers/constant';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [loggedIn, setLoggedIn] = useState(false);
  const [refetchWidget, setRefetchWidget] = useState(false);

  const [widgets, setWidgets] = useState(() => {
    const widgets = JSON.parse(localStorage.getItem(STORAGE_WIDGET));

    if (widgets !== null) {
      return widgets || [];
    }

    return [];
  });

  useEffect(() => {
    if (HAS_WINDOW) {
      localStorage.setItem(STORAGE_WIDGET, JSON.stringify(widgets));
    }
  }, [widgets, refetchWidget]);

  const handleWidgets = ({ action }) => {
    switch (action.type) {
      case 'update':
        const toIndex = action.payload.dragIndex;
        const fromIndex = action.payload.hoverIndex;
        const result = arrayMoveImmutable(widgets, fromIndex, toIndex);
        setWidgets(result);
        setRefetchWidget((p) => !p);
        break;
      default:
        console.warn('Default of handleWidgets function!');
    }
  };

  const [toggle, setToggle] = useState(false);
  const handleToggle = (bool) => {
    setToggle(bool);
  };

  useLayoutEffect(() => {
    if (toggle) {
      scrollFreeze();
    } else {
      scrollUnfreeze();
    }
  }, [toggle]);


  const value = useMemo(() => {
    return {
      width,
      height,
      loggedIn,
      setLoggedIn,
      widgets,
      handleWidgets,
      toggle,
      handleToggle,
    };
  }, [width, height, loggedIn, setLoggedIn, widgets, handleWidgets, toggle, handleToggle]);

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
