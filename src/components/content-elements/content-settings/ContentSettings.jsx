import { useApp } from '@/context/useApp';
import { Drawer, Header, Button, Row, Col, Div } from '../../content';
import { VscChromeClose } from 'react-icons/vsc';

export default function ContentSettings() {
  const { toggle, handleToggle } = useApp();

  return (
    <Drawer aria-hidden={toggle} onClick={handleToggle} position="right">
      <Header>
        <Row>
          <Col>
            <h3 className="title">Settings</h3>
          </Col>

          <Col>
            <Button className="btn-medium btn-menu" type="button" onClick={() => handleToggle(false)}>
              <span className="icon">
                <VscChromeClose fontSize={24} />
              </span>
            </Button>
          </Col>
        </Row>
      </Header>
      <Div className='main'></Div>
    </Drawer>
  );
}
