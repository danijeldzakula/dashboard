import { Sidebar, Header, Row, Col, Div } from '../../content';

export default function SidebarContent({ children }) {
  return (
    <Sidebar className="sidebar__content hide-pdf">
      <Header>
        <Row>
          <Col></Col>
        </Row>
      </Header>

      <Div>{children}</Div>
    </Sidebar>
  );
}
