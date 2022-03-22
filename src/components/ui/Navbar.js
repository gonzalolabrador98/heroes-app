import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const userName = user.name;

  const history = useHistory();

  const handleLogout = () => {
    history.replace('/login');

    dispatch({
      type: types.logout,
    });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand m-2" href="" to="/">
        HEROES APP
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/dc"
          >
            DC
          </NavLink>

          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/search"
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className="d-flex me-3">
        <div className="navbar-collapse collapse order-3  dual-collapse2 d-flex">
          <ul className="navbar-nav">
            <span
              className="nav-item nav-link text"
              style={{ paddingTop: '15px' }}
            >
              {userName}
            </span>

            <NavLink
              activeClassName="active"
              className="nav-item nav-link"
              exact
              to="/login"
              onClick={handleLogout}
            >
              <button className="btn btn-primary " type="submit">
                Logout
              </button>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};
