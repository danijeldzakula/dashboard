import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/auth/login-page';
import Register from '@/pages/auth/register-page';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import Home from '@/pages/home-page';
import Studio from '@/pages/studio-page';
import NotFoundError from '@/pages/error-page';
import ProtectedRoute from '@/layouts/protectedRoute/ProtectedRoute';

export default function Router({ pathname }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="" element={<Navigate replace to="/login" />} />

      <Route element={<ProtectedRoute pathname={pathname} redirectPath="/" />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard">
          <Route path="studio" element={<Studio />} />
          <Route path="*" element={<Navigate replace to="studio" />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
}
