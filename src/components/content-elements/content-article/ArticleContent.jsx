import { Suspense } from 'react';
import { Wrapper, Article, Main, Header, Button, Row, Col, Ref } from '@/components/content';
import { CgMenuGridR } from 'react-icons/cg';
import { useApp } from '@/context/useApp';
import ContentDrag from '../content-drag/ContentDrag';
import { Loading } from '../../loading/Loading';
import BreadCrumb from '../../bread-crumb/BreadCrumb';

export default function ArticleContent({ breadCrumb }) {
  const { widgets, handleToggle } = useApp();

  return (
    <Article className="article__content">
      <Header className="hide-pdf">
        <Row>
          <Col>
            <BreadCrumb breadCrumb={breadCrumb} />
          </Col>

          <Col>
            <Button className="btn-medium btn-primary" type="button" onClick={() => handleToggle((p) => !p)}>
              <span className="icon">
                <CgMenuGridR fontSize={24} />
              </span>
              <span className="text">Settings</span>
            </Button>
          </Col>
        </Row>
      </Header>

      <Main>
        <Suspense fallback={<Loading />}>
          <Wrapper>
            <Ref className="print-area" ref={null}>
              <ContentDrag data={widgets} />
            </Ref>
          </Wrapper>
        </Suspense>
      </Main>
    </Article>
  );
}
