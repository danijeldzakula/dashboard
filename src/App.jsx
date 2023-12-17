import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from '@/pages/auth/login-page';
// import Register from '@/pages/auth/register-page';
// import ForgotPassword from '@/pages/auth/forgot-password';
// import ResetPassword from '@/pages/auth/reset-password';
// import Home from '@/pages/home-page';
// import Studio from '@/pages/studio-page';
// import NotFoundError from '@/pages/error-page';
// import Test from '@/pages/test-page';
import ProtectedRoute from './layouts/protectedRoute/ProtectedRoute';
import { useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, [pathname]);

  useEffect(() => {
    if (window.history.action === 'POP') {
      window.addEventListener('unload', (e) => {
        return window.scrollTo(0, 0);
      });
    }

    if (window.history.scrollRestoration) {
      if (window.history.scrollRestoration === 'auto') {
        window.history.scrollRestoration = 'manual';
      }
      window.addEventListener('unload', () => {
        return window.scrollTo(0, 0);
      });
    }
    return () => {};
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Navigate replace to="/login" />} />

      <Route element={<ProtectedRoute pathname={pathname} redirectPath="/" />}>
        <Route path="/dashboard">
          <Route path="" element={<Home />} />
          <Route path="studio">
            <Route path="" element={<Studio />} />
            <Route path="*" element={<Navigate replace to="studio" />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
}

function Login() {
  return <h1>Login</h1>;
}

function Register() {
  return <h1>Register</h1>;
}

function ForgotPassword() {
  return <h1>ForgotPassword</h1>;
}

function ResetPassword() {
  return <h1>ResetPassword</h1>;
}

function Test() {
  return <h1>Test</h1>;
}

function Home() {
  return <h1>Home</h1>;
}

function Studio() {
  return <h1>Login</h1>;
}

function NotFoundError() {
  return <h1>NotFoundError</h1>;
}
