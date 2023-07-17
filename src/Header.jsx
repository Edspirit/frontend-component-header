import { useMediaQuery } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './header/desktop-header/DesktopHeader';

// const MobileHeader = React.lazy(() => import('./header/mobile-header/MobileHeader'));

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });

  return <header>{isMobile ? <DesktopHeader /> : <DesktopHeader />}</header>;
};

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
