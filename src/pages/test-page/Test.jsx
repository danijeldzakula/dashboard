import Layout from '@/layouts';
import { useTest } from './Test.hooks';
import { Container, Section } from '@/components/content';
import { RenderName } from '@/components/render-list/RenderName';
import { RenderNumber } from '@/components/render-list/RenderNumber';
import { RenderBoth } from '@/components/render-list/RenderBoth';
import { RenderNotes } from '@/components/render-list/RenderNotes';
import { useApp } from '@/context/useApp';
import { Navigate } from 'react-router-dom';
import { REDIRECT_TO } from '@/helpers/constant';

export default function Test() {
  const { loggedIn } = useApp();
  const { names, numbers, setData } = useTest();

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <Layout>
      <Section className="section__test">
        <Container>
          <RenderName setData={setData} />
          <RenderNumber setData={setData} />
          <RenderBoth names={names} numbers={numbers} />
          <RenderNotes setData={setData} />
        </Container>
      </Section>
    </Layout>
  );
}
