import { createContext, useContext, useMemo, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { scrollFreeze, scrollUnfreeze } from '@/helpers';
import { ESCAPE_KEY, ESCAPE_CODE, DEFAULT_THEME, STORAGE_THEME, ATTRIBUTE_THEME, STORAGE_WIDGET } from '@/helpers/constant';
import useWindowDimensions from '@/hooks/useWindowDimensions';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const hasWindow = typeof window !== 'undefined';

  const [loggedIn, setLoggedIn] = useState(false);

  const [refetchWidget, setRefetchWidget] = useState(false);
  const [widgets, setWidgets] = useState(() => {
    if (typeof window !== 'undefined') {
      const widgets = JSON.parse(localStorage.getItem(STORAGE_WIDGET));

      if (widgets !== null) {
        return widgets || [];
      }
    }

    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_WIDGET, JSON.stringify(widgets));
    }
  }, [widgets, refetchWidget]);

  const arrayMoveImmutable = useCallback((array, fromIndex, toIndex) => {
    const element = array.splice(fromIndex, 1)[0];
    array.splice(toIndex, 0, element);

    return array;
  }, []);

  const handleWidgets = useCallback(({ action }) => {
    switch (action.type) {
      case 'add':
        const newWidgets = {
          _id: action.payload._id,
          name: action.payload.name,
        };

        setWidgets((prev) => {
          if (!prev.some(({ _id }) => _id === action.payload._id)) {
            return [...prev, newWidgets];
          }

          return prev;
        });
        break;
      case 'update':
        const toIndex = action.payload.dragIndex;
        const fromIndex = action.payload.hoverIndex;
        const result = arrayMoveImmutable(widgets, fromIndex, toIndex);

        setWidgets(result);
        setRefetchWidget((p) => !p);

        break;
      case 'remove':
        setWidgets((prev) => {
          const removeWidget = prev.filter(({ _id }) => _id !== action.payload._id);

          return removeWidget;
        });
        break;
      default:
        console.warn('Default of handleWidgets function!');
    }
  }, []);

  const [toggle, setToggle] = useState(false);
  const handleToggle = useCallback(
    (bool) => {
      setToggle(bool);
    },
    [setToggle]
  );

  useLayoutEffect(() => {
    toggle ? scrollFreeze() : scrollUnfreeze();
  }, [toggle, scrollFreeze, scrollUnfreeze]);

  const handleOnEscape = useCallback(
    ({ key, keyCode }) => {
      if (key === ESCAPE_KEY || keyCode === ESCAPE_CODE) {
        setToggle(false);
      }
    },
    [ESCAPE_KEY, ESCAPE_CODE]
  );

  useLayoutEffect(() => {
    hasWindow && toggle && document.addEventListener('keydown', handleOnEscape);

    return () => {
      hasWindow && document.removeEventListener('keydown', handleOnEscape);
    };
  }, [handleOnEscape, toggle, hasWindow]);

  const [toggleMenu, setToggleMenu] = useState(false);
  const handleMenuToggle = useCallback(
    (bool) => {
      setToggleMenu(bool);
    },
    [width, setToggleMenu]
  );

  // THEME
  const [theme, setTheme] = useState(() => {
    if (hasWindow) {
      const themes = JSON.parse(localStorage.getItem(STORAGE_THEME));
      if (themes !== null) return themes;
    }

    return DEFAULT_THEME;
  });

  const handleOnChangeTheme = useCallback(
    (changeTheme) => {
      setTheme((prev) => {
        if (prev === changeTheme) {
          return DEFAULT_THEME;
        }

        return changeTheme;
      });
    },
    [DEFAULT_THEME]
  );

  useLayoutEffect(() => {
    hasWindow && localStorage.setItem(STORAGE_THEME, JSON.stringify(theme));
  }, [theme, hasWindow, STORAGE_THEME]);

  const getThemes = useCallback(() => {
    return hasWindow && JSON.parse(localStorage.getItem(STORAGE_THEME));
  }, [STORAGE_THEME, hasWindow, theme]);

  const setThemes = (theme) => {
    document.documentElement.setAttribute(ATTRIBUTE_THEME, theme);
  };

  useLayoutEffect(() => {
    const theme = getThemes();
    setThemes(theme);
  }, [getThemes]);

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
      toggleMenu,
      handleMenuToggle,
      theme,
      handleOnChangeTheme,
    };
  }, [width, height, loggedIn, setLoggedIn, widgets, handleWidgets, toggle, handleToggle, toggleMenu, handleMenuToggle, theme, handleOnChangeTheme]);

  return <AppContext.Provider value={value} children={children} />;
};

export const useApp = () => {
  return useContext(AppContext);
};
