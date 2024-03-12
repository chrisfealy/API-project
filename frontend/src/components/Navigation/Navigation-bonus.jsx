import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import logo from '../../../public/falcodair.png'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div className='nav-left'>
        <NavLink to="/">
          <img src={logo} alt="dairbnb" className='nav-logo' />
        </NavLink>
        <NavLink to="/">
          <h2>dairbnb</h2>
        </NavLink>
      </div>
      <div className='nav-right'>
        {sessionUser && (
          <div className='nav-new-spot'>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </div>
        )}
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
