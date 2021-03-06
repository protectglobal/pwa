import React from 'react';
import { Link } from 'react-router-dom';
// import { Roles } from 'meteor/alanning:roles';
import { propType } from 'graphql-anywhere';
import userFragment from '../../graphql/user/fragment/user';
import Constants from '../../constants';
import LogoutBtn from '../auth/logout-btn';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Menu = ({ curUser }) => {
  // Only display menu content for logged in users
  if (!curUser) {
    return null;
  }

  // Get list of routes to be displayed on the side-menu. Include admin route
  // if and only if current user is admin
  const routes = Constants.ROUTES;
  /* .filter(({ admin }) => (
    (admin && Roles.userIsInRole(curUser._id, ['admin'])) || !admin
  )); */

  // Display menu routes plus logout button
  return (
    <React.Fragment>
      {routes.map(({ path, label }) => (
        <li key={path}>
          <Link
            to={path}
            onClick={window.hideMenu}
          >
            {label}
          </Link>
        </li>
      ))}
      <li>
        <LogoutBtn
          btnType="link"
          underline={false}
          onLogoutHook={window.hideMenu}
        />
      </li>
    </React.Fragment>
  );
};

Menu.propTypes = {
  curUser: propType(userFragment),
};

Menu.defaultProps = {
  curUser: null,
};

export default Menu;
