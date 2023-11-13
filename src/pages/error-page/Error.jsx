import Layout from '../../layouts';
import { Container, Figure, Section } from '../../components/content';
import { Link } from 'react-router-dom';

export default function NotFoundError() {
  return (
    <Layout>
      <Section className="section__error">
        <Figure />

        <Container>
          <h2 className='big-title'>Opps!</h2>
          <h1 className="title">404 - Page not found</h1>
          <p className='subtitle'>
            <span>The page you are looking for might have been removed</span>
            <span>had its name changed or is temporarily unavailable.</span>
          </p>

          <Link className='btn-primary btn-medium' to='/'>Go to Homepage</Link>
        </Container>
      </Section>
    </Layout>
  );
}
