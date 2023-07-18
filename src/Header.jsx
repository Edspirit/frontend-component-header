import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './header/desktop-header/DesktopHeader';
import MobileHeader from './header/mobile-header/MobileHeader';
import {
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return <header>{isMobile ? <MobileHeader /> : <DesktopHeader />}</header>;
};

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
