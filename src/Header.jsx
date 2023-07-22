import { useMediaQuery, useToggle } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import SearchModal from './Header/SearchModal';

const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [isOpen, open, close] = useToggle(false);
  return (
    <header>
      <SearchModal isOpen={isOpen} onClose={close} />
      {isMobile ? <MobileHeader open={open} /> : <DesktopHeader />}
    </header>
  );
};

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
