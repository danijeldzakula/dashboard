import { useState } from "react";
import { NavLink } from "react-router-dom";
import { isValidEmail } from '@/helpers';
import { clsx } from 'clsx';
import { FiLogIn } from 'react-icons/fi';
import { RippleLink } from "@/components/ripple-link/RippleLink";
import { AiOutlineArrowRight } from 'react-icons/ai';
import { RippleButton } from "@/components/ripple-button/RippleButton";

const initialState = {
  email: '',
  currentPassword: ''
}

export default function LoginForm() {
  const [form, setForm] = useState(initialState);
  const onBlur = (event) => { };
  const onFocus = (event) => { };
  const onReset = () => setForm(initialState);
  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const FORGOT_PASSWORD_URL = form.email !== '' && isValidEmail(form.email) ? `/forgot-password?email=${form.email}` : '/forgot-password';

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Payload', form);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="wrapper">

        <h1 className="title">Investment</h1>
        <p className="subtitle">Welcome to login screen</p>

        <div className="group">
          <RippleLink to='/login' className='btn btn-link btn-medium'>
            Login
          </RippleLink>

          <span className="separator separator-y" />

          <RippleLink to='/register' className='btn btn-link btn-medium'>
            Register
          </RippleLink>
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
          <RippleButton type='button' onClick={onReset} className='btn btn-link btn-medium'>
            Restart
          </RippleButton>

          <RippleButton type='submit' className='btn btn-primary btn-medium'>
            <FiLogIn size={20} />
            Log In
          </RippleButton>
        </div>

        <div className="group">
          <NavLink className='btn btn-primary-link hover-right btn-medium' to={FORGOT_PASSWORD_URL}>
            Forgot Password

            <AiOutlineArrowRight size={22} />
          </NavLink>
        </div>
      </div>
    </form>
  );
}
