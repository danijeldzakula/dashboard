import { useState } from "react";
import { useApp } from "@/context/useApp";
import { NavLink } from "react-router-dom";
import { isValidEmail } from '@/helpers';
import { clsx } from 'clsx';

const initialState = {
  email: '',
  currentPassword: ''
}

export default function LoginForm() {
  const { setLoggedIn } = useApp();

  const [form, setForm] = useState(initialState);

  const onFocus = (event) => { };

  const onBlur = (event) => { };

  const onChange = (event) => {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  };

  const onReset = () => {
    setForm(initialState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Payload', form);
  };

  const FORGOT_PASSWORD_URL = form.email !== '' && isValidEmail(form.email) ? `/forgot-password?email=${form.email}` : '/forgot-password';

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="wrapper">

        <h1 className="title">Investment</h1>
        <p className="subtitle">Welcome to login screen</p>

        <div className="group">
          <NavLink className='btn-medium' to='/login'>
            Login
          </NavLink>

          <span className="separator separator-y" />

          <NavLink className='btn-medium' to='/register'>
            Register
          </NavLink>
        </div>

        <div className="field">
          <input value={form.email} onChange={onChange} onBlur={onBlur} onFocus={onFocus} type="text" id="email" name="email" className="field-input" autoComplete="off" required />
          <label htmlFor="email" className={clsx('field-label')}>Email</label>
        </div>

        <div className="field">
          <input value={form.currentPassword} onChange={onChange} onBlur={onBlur} onFocus={onFocus} type="password" id="currentPassword" name="currentPassword" className="field-input" autoComplete="off" required />
          <label htmlFor="currentPassword" className={clsx('field-label')}>Password</label>
        </div>

        <div className="group group-actions">
          <button onClick={onReset} className='btn btn-link btn-medium' type="button">Restart</button>
          <button className='btn btn-primary btn-medium' type="submit">Log In</button>
        </div>

        <div className="group">
          <NavLink className='btn btn-primary-link btn-medium' to={FORGOT_PASSWORD_URL}>
            Forgot Password
          </NavLink>
        </div>
      </div>
    </form>
  );
}
