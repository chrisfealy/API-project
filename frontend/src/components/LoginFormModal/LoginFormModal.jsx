import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false)
  const { closeModal } = useModal();

  useEffect(() => {
    const validationErrors = {}
    if(credential.length < 3) validationErrors.credential = "Credential must have at least 3 characters"
    if(password.length < 6) validationErrors.password = "Password must have at least characters"
    setErrors(validationErrors)
  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitted(true)
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoLogin = () => {
    setCredential('DemoUser')
    setPassword('password')
    handleSubmit()
  }

  return (
    <div className='login-container'>
      <div className='login-header'>Log in</div>
      {submitted && errors.credential && (<p className='error'>{errors.credential}</p>)}
      {submitted && errors.password && (<p className='error'>{errors.password}</p>)}
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='login-input'>
          <input
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className='login-input'>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className='login-btn'
          disabled={Object.keys(errors).length}
        >
          Continue
        </button>
        <hr className="login-line" />
        <button className='demo-login-btn' onClick={handleDemoLogin}>
          Continue as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
