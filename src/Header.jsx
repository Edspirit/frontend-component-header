import { useMediaQuery } from '@edx/paragon';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import store from './Header/redux/store/store';
import Head from './Header/Head';

const SearchModal = React.lazy(() => import('./Header/SearchModal'));

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
  const [openModal, setOpenModal] = useState(false);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <header>
            <Head />
            {openModal && (
              <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
            )}
            {isMobile ? (
              <MobileHeader setOpenModal={setOpenModal} />
            ) : (
              <DesktopHeader />
            )}
          </header>
      </QueryClientProvider>
    </Provider>
  );
};

export default Header;
