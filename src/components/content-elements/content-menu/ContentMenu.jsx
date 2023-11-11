import { Navbar } from '@/components/content';
import { useCallback, useLayoutEffect } from 'react';
import { ESCAPE_KEY, ESCAPE_CODE } from '@/helpers/constant';
import { useApp } from '@/context/useApp';

export default function ContentMenu({ setContextMenu, contextMenu, contextMenuRef, initialState }) {
  const { theme, handleOnChangeTheme } = useApp();
  const hasWindow = typeof window !== 'undefined';

  const handleRemoveContextMenu = useCallback(
    (event) => {
      if (contextMenu.visible && contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenu(initialState);
      }
    },
    [contextMenu, contextMenuRef]
  );

  useLayoutEffect(() => {
    contextMenu.visible && hasWindow && document.addEventListener('click', handleRemoveContextMenu);

    return () => {
      hasWindow && document.removeEventListener('click', handleRemoveContextMenu);
    };
  }, [handleRemoveContextMenu, contextMenuRef, contextMenu, hasWindow]);

  const handleOnKeyDownContextMenu = useCallback(
    ({ key, keyCode }) => {
      if (key === ESCAPE_KEY || keyCode === ESCAPE_CODE) {
        setContextMenu(initialState);
      }
    },
    [ESCAPE_KEY, ESCAPE_CODE]
  );

  useLayoutEffect(() => {
    contextMenu.visible && hasWindow && document.addEventListener('keydown', handleOnKeyDownContextMenu);

    return () => {
      hasWindow && document.removeEventListener('keydown', handleOnKeyDownContextMenu);
    };
  }, [handleOnKeyDownContextMenu, contextMenu, hasWindow]);

  const handleOnScrollAndResizeContextMenu = useCallback(({ type }) => {
    const isAllowedEventListener = ['resize', 'scroll'];
    isAllowedEventListener.includes(type) && setContextMenu(initialState);
  }, []);

  useLayoutEffect(() => {
    hasWindow && window.addEventListener('resize', handleOnScrollAndResizeContextMenu);
    hasWindow && document.addEventListener('scroll', handleOnScrollAndResizeContextMenu);

    return () => {
      hasWindow && window.removeEventListener('resize', handleOnScrollAndResizeContextMenu);
      hasWindow && document.removeEventListener('scroll', handleOnScrollAndResizeContextMenu);
    };
  }, [handleOnScrollAndResizeContextMenu, contextMenu, hasWindow]);

  const menuStyle = {
    position: 'fixed',
    top: `${contextMenu.top}px`,
    left: `${contextMenu.left}px`,
    backgroundColor: 'white',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
    opacity: contextMenu.visible ? '1' : '0',
    visibility: contextMenu.visible ? 'visible' : 'hidden',
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.6, 1)',
    willChange: 'opacity',
    padding: '20px',
    width: '200px',
    height: '300px',
    backgroundColor: '#f9f9f9',
    zIndex: '100',
  };

  return (
    <Navbar ref={contextMenuRef} className="context-menu" style={menuStyle}>
      <button className="btn btn-primary block w-full mb-2" onClick={() => handleOnChangeTheme('dark')} type="button">
        <span className="text">Theme: {theme}</span>
      </button>

      <div className="print-format flex gap-x-2">
        <button onClick={() => console.log('a3 format')} className="btn btn-primary block w-full" type="button">
          <span className="text">A3</span>
        </button>
        <button onClick={() => console.log('a4 format')} className="btn btn-primary block w-full" type="button">
          <span className="text">A4</span>
        </button>
        <button onClick={() => console.log('a5 format')} className="btn btn-primary block w-full" type="button">
          <span className="text">A5</span>
        </button>
      </div>
    </Navbar>
  );
}
