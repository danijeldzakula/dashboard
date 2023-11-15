import Layout from '@/layouts';
import { Container, Figure, Section } from '@/components/content';
import { useNavigate } from 'react-router-dom';
import { RippleButton } from '@/components/ripple-button/RippleButton';
import { useApp } from '@/context/useApp';
import { SocialNetwork } from '@/components/social-network/SocialNetwork';
import { useEffect, useState } from 'react';

export default function NotFoundError() {
  const navigate = useNavigate();
  const { loggedIn } = useApp();


  const onNavigate = () => {
    const REDIRECT_URL = !loggedIn ? '/login' : '/dashboard';
    setTimeout(() => {
      navigate(REDIRECT_URL);
    }, 300);
  }

  const [randomNumber, setRandomNumber] = useState(null);
  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    setRandomNumber(randomNumber);
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  // if (!("Notification" in window)) {
  //   throw new Error("Browser dosen't support Notification");
  // }
  // Notification.requestPermission().then((res) => {
  //   new Notification('Hello World');
  // });

  return (
    <Layout>
      <Section className="section__error">
        <Figure />

        <Container>
          <h2 className='big-title'>Opps!</h2>
          <h1 className="title">404 - Page not found</h1>
          <p className='subtitle'>
            <span>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</span>
          </p>

          <RippleButton onClick={() => onNavigate()} type='button' className='btn-primary btn-medium'>Go to Homepage</RippleButton>
        </Container>

        <Container className='social-network-wrapper'>
          <SocialNetwork />
        </Container>
      </Section>
    </Layout>
  );
}
