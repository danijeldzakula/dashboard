import Layout from '@/layouts';
import { useApp } from '@/context/useApp';
import { Navigate } from 'react-router-dom';
import { Figure, Section } from '@/components/content';
import { REDIRECT_TO } from '@/helpers/constant';
import LoginForm from '@/components/auth/login/LoginForm';
import { SocialNetwork } from '@/components/social-network/SocialNetwork';

export default function Login() {
  const { loggedIn } = useApp();

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <Layout>
      <Section className="section__auth section__auth--login">
        <Figure />
        <LoginForm />
        <SocialNetwork />
      </Section>
    </Layout>
  );
}
