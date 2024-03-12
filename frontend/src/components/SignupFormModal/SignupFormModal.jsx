import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const { closeModal } = useModal();

  useEffect(() => {
    const validationErrors = {}
    if (!email.length) validationErrors.email = 'Email is required'
    if (username.length < 4) validationErrors.username = 'Username must be at least 4 characters'
    if (!firstName.length) validationErrors.firstName = 'First Name is required'
    if (!lastName.length) validationErrors.lastName = 'Last Name is required'
    if (password.length < 6) validationErrors.password = 'Password must be at least 6 characters'
    if (confirmPassword !== password) validationErrors.confirmPassword = 'Passwords must match'
    setErrors(validationErrors)
  }, [email, username, firstName, lastName, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      setSubmitted(true)
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='signup-container'>
      <div className='signup-header'>Sign Up</div>
      <form onSubmit={handleSubmit} className='signup-form'>
        <div className='signup-input'>
          {submitted && errors.email && <p className='error'>{errors.email}</p>}
          <input
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='signup-input'>
          {submitted && errors.username && <p className='error'>{errors.username}</p>}
          <input
            placeholder='Username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className='signup-input'>
          {submitted && errors.firstName && <p className='error'>{errors.firstName}</p>}
          <input
            placeholder='First Name'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className='signup-input'>
          {submitted && errors.lastName && <p className='error'>{errors.lastName}</p>}
          <input
            placeholder='Last Name'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='signup-input'>
          {submitted && errors.password && <p className='error'>{errors.password}</p>}
          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='signup-input'>
          {submitted && errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
          <input
            placeholder='Confirm Password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className='signup-btn'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
