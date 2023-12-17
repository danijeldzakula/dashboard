import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './context/useApp';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import App from './App';
import './scss/main.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Router>
      <AppProvider>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </AppProvider>
    </Router>
  </StrictMode>
);
