import { useMediaQuery } from '@edx/paragon';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import DesktopHeader from './Header/DesktopHeader';
import MobileHeader from './Header/MobileHeader';
import SearchModal from './Header/SearchModal';
import store from './Header/redux/store/store';

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
        <Router>
          <header>
            <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
            {isMobile ? (
              <MobileHeader setOpenModal={setOpenModal} />
            ) : (
              <DesktopHeader />
            )}
          </header>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
};

export default Header;
