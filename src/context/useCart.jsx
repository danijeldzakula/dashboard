import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [provider, setProvider] = useState('Use cart context provider');

  const value = useMemo(() => {
    return {
      provider,
      setProvider,
    };
  }, [provider, setProvider]);

  return <CartContext.Provider value={value} children={children} />;
};

export const useCart = () => {
  return useContext(CartContext);
};

// 1. Za code iznad potrebno je kreirati novi fijl pod nazivom `CartContext.js` i treba da se nalazi unutar direktorijuma `context`

// 2. Unutar inicijalizacije aplikacije postaviti sledece kao `wrapper` - next.js `_app.js`
// <CartProvider></CartProvider>

// 3. Pozivanje unutar bilo koje children komponente od inicijalizacije treba da izgleda ovako:
// const [provider, setProvider] = useCart();
