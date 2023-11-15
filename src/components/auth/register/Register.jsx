import { useState } from 'react';
import { clsx } from 'clsx';
import { FiLogIn } from 'react-icons/fi';
import { RippleButton } from '@/components/ripple-button/RippleButton';
import { RippleLink } from '@/components/ripple-link/RippleLink';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  currentPassword: '',
  confirmPassword: ''
}

export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const onFocus = (event) => { };
  const onBlur = (event) => { };
  const onReset = () => setForm(initialState);
  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Payload', form);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className='wrapper'>

        <h1 className="title">Investment</h1>
        <p className='subtitle'>Create your account</p>

        <div className="group">
          <RippleLink to="/login" className='btn btn-link btn-medium'>
            Login
          </RippleLink>

          <span className="separator separator-y" />

          <RippleLink to="/register" className='btn btn-link btn-medium'>
            Register
          </RippleLink>
        </div>


        <div className="field">
          <input value={form.firstName} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="text" id="firstName" name="firstName" className="field-input" autoComplete="off" required />
          <label htmlFor="firstName" className={clsx('field-label')}>First Name</label>
        </div>

        <div className="field">
          <input value={form.lastName} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="text" id="lastName" name="lastName" className="field-input" autoComplete="off" required />
          <label htmlFor="lastName" className={clsx('field-label')}>Last Name</label>
        </div>

        <div className="field">
          <input value={form.email} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="text" id="email" name="email" className="field-input" autoComplete="off" required />
          <label htmlFor="email" className={clsx('field-label')}>Email</label>
        </div>

        <div className="field">
          <input value={form.currentPassword} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="password" id="currentPassword" name="currentPassword" className="field-input" autoComplete="off" required />
          <label htmlFor="currentPassword" className={clsx('field-label')}>Password</label>
        </div>

        <div className="field">
          <input value={form.confirmPassword} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="password" id="confirmPassword" name="confirmPassword" className="field-input" autoComplete="off" required />
          <label htmlFor="confirmPassword" className={clsx('field-label')}>Confirm Password</label>
        </div>

        <div className="group group-actions">
          <RippleButton type='button' onClick={onReset} className='btn btn-link btn-medium'>
            Restart
          </RippleButton>

          <RippleButton type='submit' className='btn btn-primary btn-medium'>
            <FiLogIn size={20} />
            Create Account
          </RippleButton>
        </div>
      </div>
    </form>
  );
}
