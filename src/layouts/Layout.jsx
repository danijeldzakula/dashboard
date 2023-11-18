import { ToastContainer } from 'react-toastify';
import { Div, Main } from '@/components/content';

export default function Layout({ children, pathname }) {
  return (
    <Div className="app">
      <Main>{children}</Main>
      <ToastContainer />
    </Div>
  );
}
