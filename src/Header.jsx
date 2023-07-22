import { useMediaQuery, useToggle } from '@edx/paragon';
import React from 'react';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import SearchModal from './Header/SearchModal';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set staleTime to 5 minutes
      staleTime: 5 * 60 * 1000,
      // Set cacheTime to 60 minutes
      cacheTime: 60 * 60 * 1000,
    },
  },
});
const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: '768px' });
  const [isOpen, open, close] = useToggle(false);
  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <SearchModal isOpen={isOpen} onClose={close} />
        {isMobile ? <MobileHeader open={open} /> : <DesktopHeader />}
      </header>
    </QueryClientProvider>
  );
};

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Header);
