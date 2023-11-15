import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { clsx } from 'clsx';
import { Loading } from "@/components/loading/Loading";
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { RippleButton } from '@/components/ripple-button/RippleButton';

const initialState = {
  newPassword: '',
  confirmPassword: '',
}

export default function ResetPasswordForm({ token, validToken, tokenLoading }) {
  const [form, setForm] = useState(initialState);
  const onFocus = (event) => { };
  const onBlur = (event) => { };
  const onReset = () => setForm(initialState);
  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Payload', { ...form, token });
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="wrapper">

        <h1 className="title">Investment</h1>
        <p className="subtitle">Reset Password!</p>

        {!tokenLoading ? (
          <Fragment>
            {validToken ? (
              <Fragment>
                <div className="field">
                  <input value={form.newPassword} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="password" id="newPassword" name="newPassword" className="field-input" autoComplete="off" required />
                  <label htmlFor="newPassword" className={clsx('field-label')}>New Password</label>
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
                    Log In
                  </RippleButton>
                </div>

                <div className="group">
                  <NavLink className='btn btn-primary-link hover-left btn-medium' to='/login'>
                    <AiOutlineArrowLeft size={22} />

                    Back to Login
                  </NavLink>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="alert alert-danger">
                  <p className="subtitle">Your token is not valid!</p>
                </div>

                <div className="group">
                  <NavLink className='btn btn-link hover-left btn-medium' to='/login'>
                    <AiOutlineArrowLeft size={22} />

                    Back to Login
                  </NavLink>

                  <NavLink className='btn btn-primary-link btn-medium' to='/forgot-password'>
                    <AiOutlineArrowLeft size={22} />

                    Forgot Password
                  </NavLink>
                </div>
              </Fragment>
            )}

          </Fragment>
        ) : (
          <Loading />
        )}
      </div>
    </form>
  );
}

