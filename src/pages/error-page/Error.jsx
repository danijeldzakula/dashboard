import Layout from '../../layouts';
import { Section } from '../../components/content';

export default function NotFoundError() {
  return (
    <Layout>
      <Section className="section__error">
        <h2 className="text-center">404 | Page not found</h2>
      </Section>
    </Layout>
  );
}
