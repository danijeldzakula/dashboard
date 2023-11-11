import { Routes, Route, Navigate } from 'react-router-dom';
// Routes
import Login from '../pages/auth/login-page';
import Register from '../pages/auth/register-page';
import Home from '../pages/home-page';
import Studio from '../pages/studio-page';
import NotFoundError from '../pages/error-page';
import ProtectedRoute from '../layouts/protectedRoute/ProtectedRoute';

export default function Router({ pathname }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<Navigate replace to="/login" />} />

      <Route element={<ProtectedRoute pathname={pathname} redirectPath="/" />}>
        <Route path="/dashboard" element={<Home />} />

        <Route path="/dashboard">
          <Route path="studio" element={<Studio />} />
          <Route path="*" element={<Navigate replace to="studio" />} />
        </Route>
      </Route>

      {/* Catch all error */}
      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
}
