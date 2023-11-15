import Layout from '@/layouts';
import { useApp } from '@/context/useApp';
import { Navigate } from 'react-router-dom';
import { Figure, Section } from '@/components/content';
import ForgotPasswordForm from '@/components/auth/forgot-password/ForgotPassword';
import { REDIRECT_TO } from '@/helpers/constant';
import { SocialNetwork } from '@/components/social-network/SocialNetwork';

export default function ForgotPassword() {
  const { loggedIn } = useApp();

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <Layout>
      <Section className="section__auth section__auth--forgot-password">
        <Figure />
        <ForgotPasswordForm />
        <SocialNetwork />
      </Section>
    </Layout>
  );
}
