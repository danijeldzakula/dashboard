import { useApp } from '@/context/useApp';
import { Sidebar, Header, Row, Col, Div } from '../../content';

export default function SidebarContent({ children }) {
  const { setLoggedIn } = useApp();

  return (
    <Sidebar className="sidebar__content hide-pdf">
      <Header>
        <Row>
          <Col></Col>
        </Row>
      </Header>

      <Div className='main'>
        <button onClick={() => setLoggedIn(false)} className='btn btn-primary btn-medium' type='button'>Log Out</button>
        {children}
      </Div>
    </Sidebar>
  );
}
