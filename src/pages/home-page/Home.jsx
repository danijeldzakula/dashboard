import Layout from '@/layouts';
import Content from '@/components/content-elements';
import { Section, Wrapper } from '@/components/content';
import { navbarMenu } from '@/common/navbarMenu';

const BREAD_CRUMB = [
  {
    _id: '1',
    url: '/dashboard',
    label: 'Dashboard',
  },
];

export default function Home() {
  return (
    <Layout>
      <Section className="section__studio section__studio--home">
        <Wrapper>
          <Content.Sidebar />
          <Content.Article breadCrumb={BREAD_CRUMB} />
        </Wrapper>
        <Content.Settings />
      </Section>
    </Layout>
  );
}
