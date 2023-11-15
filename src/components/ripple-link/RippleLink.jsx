import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { clsx } from 'clsx';

export function RippleLink({ children, className, onClick, ...rest }) {
  const buttonRef = useRef(null);
  const [ripple, setRipple] = useState({});

  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - 10;
    const y = event.clientY - rect.top - 10;

    setRipple({
      x,
      y,
      active: true,
    });

    setTimeout(() => {
      setRipple({
        active: false
      });
    }, 300);
  }

  return (
    <NavLink {...rest} ref={buttonRef} className={clsx('ripple-button', className)} onClick={handleClick}>
      {ripple.active && <span className="ripple" style={{ top: ripple.y, left: ripple.x }} />}
      {children}
    </NavLink>
  );
};