import React, { Suspense, lazy } from 'react';
import Layout from '@/layouts';
import { useTest } from './Test.hooks';
import { Container, Section } from '@/components/content';

import { useApp } from '@/context/useApp';
import { Navigate } from 'react-router-dom';
import { REDIRECT_TO } from '@/helpers/constant';

// import RenderName from '@/components/render-list/RenderName';
// import RenderNumber from '@/components/render-list/RenderNumber';
// import RenderBoth from '@/components/render-list/RenderBoth';
// import RenderNotes from '@/components/render-list/RenderNotes';
// import RenderData from '@/components/render-list/RenderData';
// import RenderLazy from '@/components/render-list/RenderLazy';

const RenderName = lazy(() => import('@/components/render-list/RenderName'));
const RenderNumber = lazy(() => import('@/components/render-list/RenderNumber'));
const RenderBoth = lazy(() => import('@/components/render-list/RenderBoth'));
const RenderNotes = lazy(() => import('@/components/render-list/RenderNotes'));
const RenderData = lazy(() => import('@/components/render-list/RenderData'));
const RenderLazy = lazy(() => import('@/components/render-list/RenderLazy'));

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
          <Suspense fallback={false}>
            <RenderName setData={setData} />
            <RenderNumber setData={setData} />
            <RenderBoth names={names} numbers={numbers} />
            <RenderNotes setData={setData} />
            <RenderData />
            <RenderLazy />
          </Suspense>
        </Container>
      </Section>
    </Layout>
  );
}
