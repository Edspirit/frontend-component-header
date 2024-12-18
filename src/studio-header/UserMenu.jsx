import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import {
  Avatar,
} from '@openedx/paragon';
import NavDropdownMenu from './NavDropdownMenu';
import getUserMenuItems from './utils';

const UserMenu = ({
  username,
  studioBaseUrl,
  handleLogout,
  authenticatedUserAvatar,
  isMobile,
  isAdmin,
  // injected
  intl,
}) => {
  const avatar = authenticatedUserAvatar ? (
    <img
      className="d-block w-100 h-100"
      src={authenticatedUserAvatar}
      alt={username}
      data-testid="avatar-image"
    />
  ) : (
    <Avatar
      size="sm"
      className="mr-2"
      alt={username}
      data-testid="avatar-icon"
    />
  );
  const title = isMobile ? avatar : <>{avatar}{username}</>;

  return (
    <NavDropdownMenu
      buttonTitle={title}
      id="user-dropdown-menu"
      items={getUserMenuItems({
        studioBaseUrl,
        handleLogout,
        intl,
        isAdmin,
      })}
    />
  );
};

UserMenu.propTypes = {
  username: PropTypes.string,
  studioBaseUrl: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  authenticatedUserAvatar: PropTypes.string,
  isMobile: PropTypes.bool,
  isAdmin: PropTypes.bool,
  // injected
  intl: intlShape.isRequired,
};

UserMenu.defaultProps = {
  isMobile: false,
  isAdmin: false,
  authenticatedUserAvatar: null,
  username: null,
};

export default injectIntl(UserMenu);
