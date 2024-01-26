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
    if(!email.length) validationErrors.email = 'Email is required'
    if(username.length < 4) validationErrors.username = 'Username must be at least 4 characters'
    if(!firstName.length) validationErrors.firstName = 'First Name is required'
    if(!lastName.length) validationErrors.lastName = 'Last Name is required'
    if(password.length < 6) validationErrors.password = 'Password must be at lesat 6 characters'
    if(confirmPassword.length < 6) validationErrors.confirmPassword = 'Password must be at lesat 6 characters'
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
      {submitted && errors.email && <p className='error'>{errors.email}</p>}
      {submitted && errors.username && <p className='error'>{errors.username}</p>}
      {submitted && errors.firstName && <p className='error'>{errors.firstName}</p>}
      {submitted && errors.lastName && <p className='error'>{errors.lastName}</p>}
      {submitted && errors.password && <p className='error'>{errors.password}</p>}
      {submitted && errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
      <form onSubmit={handleSubmit} className='signup-form'>
        <label>
          <input
            className='signup-input'
            placeholder='Email'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder='Username'
            className='signup-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder='First Name'
            className='signup-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <input
            placeholder='Last Name'
            className='signup-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder='Password'
            className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            placeholder='Confirm Password'
            className='signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={Object.keys(errors).length}
          className='signup-btn'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
