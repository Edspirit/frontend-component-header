import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToggle, ModalPopup } from '@openedx/paragon';
import HeaderBody from './HeaderBody';
import MobileMenu from './MobileMenu';
import useGetConfig from '../Header/useGetConfig';

const MobileHeader = ({
  mainMenuDropdowns,
  ...props
}) => {
  const [isOpen, , close, toggle] = useToggle(false);
  const [target, setTarget] = useState(null);
  const { headerLogo } = useGetConfig();

  return (
    <>
      <HeaderBody
        {...props}
        logo={headerLogo} 
        isMobile
        setModalPopupTarget={setTarget}
        toggleModalPopup={toggle}
        isModalPopupOpen={isOpen}
      />
      <ModalPopup
        hasArrow
        placement="bottom"
        positionRef={target}
        isOpen={isOpen}
        onClose={close}
        onEscapeKey={close}
        className="mobile-menu-container"
      >
        <MobileMenu {...{ mainMenuDropdowns }} />
      </ModalPopup>
    </>
  );
};

MobileHeader.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  authenticatedUserAvatar: PropTypes.string,
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node,
    })),
  })),
  outlineLink: PropTypes.string,
};

MobileHeader.defaultProps = {
  logo: null,
  logoAltText: null,
  number: null,
  org: null,
  title: null,
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  mainMenuDropdowns: [],
  outlineLink: null,
};

export default MobileHeader;
