import Layout from '@/layouts';
import { Navigate } from 'react-router-dom';
import { Container, Figure, Section } from '@/components/content';
import { useApp } from '@/context/useApp';
import { REDIRECT_TO } from '@/helpers/constant';
import RegisterForm from '@/components/auth/register/Register';

export default function Register() {
  const { loggedIn } = useApp();

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <Layout>
      <Section className="section__auth section__auth--register">
        <Figure />
        <RegisterForm />
      </Section>
    </Layout>
  );
}
