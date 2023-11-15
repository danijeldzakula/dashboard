import { useEffect, useState } from "react";
import { useApp } from "@/context/useApp";
import { NavLink, useSearchParams } from "react-router-dom";
import { clsx } from 'clsx';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const initialState = {
  email: ''
}

export default function ForgotPasswordForm() {
  const { setLoggedIn } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        email: email
      }
    })
  }, [email]);

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
    setForm({
      email: email
    })
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('Payload', form);
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="wrapper">

        <h1 className="title">Investment</h1>
        <p className="subtitle">Forgot Password?</p>

        <div className="field">
          <input value={form.email} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="email" id="email" name="email" className="field-input" autoComplete="off" required />
          <label htmlFor="email" className={clsx('field-label')}>Email</label>
        </div>

        <div className="group group-actions">
          <button onClick={onReset} className='btn btn-link btn-medium' type="button">Restart</button>
          <button className='btn btn-primary btn-medium' type="submit">Log In</button>
        </div>

        <div className="group">
          <NavLink className='btn btn-primary-link hover-left btn-medium' to='/login'>
            <AiOutlineArrowLeft size={22} />

            Back to Login
          </NavLink>
        </div>
      </div>
    </form>
  );
}

