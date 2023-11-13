import { Section, Wrapper } from '@/components/content';
import Layout from '@/layouts';
import Content from '@/components/content-elements';

const BREAD_CRUMB = [
  {
    _id: '1',
    url: '/dashboard',
    label: 'Dashboard',
  },
  {
    _id: '2',
    url: '/dashboard/studio',
    label: 'Studio',
  },
];

export default function Studio() {
  return (
    <Layout>
      <Section className="section__studio section__studio--studio">
        <Wrapper>
          <Content.Sidebar />
          <Content.Article breadCrumb={BREAD_CRUMB} />
        </Wrapper>

        <Content.Settings />
      </Section>
    </Layout>
  );
}
