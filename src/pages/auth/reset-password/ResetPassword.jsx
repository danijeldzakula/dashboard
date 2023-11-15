import Layout from '@/layouts';
import { useEffect, useState } from 'react';
import { useApp } from '@/context/useApp';
import { Navigate, useParams } from 'react-router-dom';
import { Figure, Section } from '@/components/content';
import ResetPasswordForm from '@/components/auth/reset-password/ResetPassword';
import { REDIRECT_TO } from '@/helpers/constant';
import { SocialNetwork } from '@/components/social-network/SocialNetwork';

export default function ResetPassword() {
  const { loggedIn } = useApp();
  const { token } = useParams();

  const [validToken, setValidToken] = useState(true);
  const [tokenLoading, setTokenLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              status: 200,
              data: true
            });
          }, 700);
        });

        if (isMounted && response.status === 200) {
          console.log('Token is valid!', response);
          setValidToken(response.data);
          setTokenLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setTokenLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    }
  }, [token]);

  if (loggedIn) {
    return <Navigate replace to={REDIRECT_TO} />;
  }

  return (
    <Layout>
      <Section className="section__auth section__auth--reset-password">
        <Figure />
        <ResetPasswordForm token={token} validToken={validToken} tokenLoading={tokenLoading} />
        <SocialNetwork />
      </Section>
    </Layout>
  );
}
