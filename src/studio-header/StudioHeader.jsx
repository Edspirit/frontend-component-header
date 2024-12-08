import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Responsive from 'react-responsive';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
import { QueryClient, QueryClientProvider } from 'react-query';

import MobileHeader from './MobileHeader';
import HeaderBody from './HeaderBody';
import Head from '../Header/Head';

ensureConfig([
  'STUDIO_BASE_URL',
  'SITE_NAME',
  'LOGOUT_URL',
  'LOGIN_URL',
  'LOGO_URL',
], 'Studio Header component');

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

const StudioHeader = ({
  number, org, title, containerProps, isHiddenMainMenu, mainMenuDropdowns, outlineLink, searchButtonAction, isNewHomePage, mfeTitle
}) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const props = {
    logo: config.LOGO_URL,
    logoAltText: `Studio ${config.SITE_NAME}`,
    number,
    org,
    title,
    containerProps,
    username: authenticatedUser?.username,
    isAdmin: authenticatedUser?.administrator,
    authenticatedUserAvatar: authenticatedUser?.avatar,
    studioBaseUrl: config.STUDIO_BASE_URL,
    logoutUrl: config.LOGOUT_URL,
    isHiddenMainMenu,
    mainMenuDropdowns,
    outlineLink,
    searchButtonAction,
    isNewHomePage,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Head mfeTitle={mfeTitle} />
      <div className="studio-header">
        <a className="nav-skip sr-only sr-only-focusable" href="#main">Skip to content</a>
        <Responsive maxWidth={841}>
          <MobileHeader {...props} />
        </Responsive>
        <Responsive minWidth={842}>
          <HeaderBody {...props} />
        </Responsive>
      </div>
    </QueryClientProvider>
  );
};

StudioHeader.propTypes = {
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string.isRequired,
  containerProps: HeaderBody.propTypes.containerProps,
  isHiddenMainMenu: PropTypes.bool,
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.node,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.node,
    })),
  })),
  outlineLink: PropTypes.string,
  searchButtonAction: PropTypes.func,
  isNewHomePage: PropTypes.bool.isRequired,
  mfeTitle: PropTypes.string,
};

StudioHeader.defaultProps = {
  number: '',
  org: '',
  containerProps: {},
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  outlineLink: null,
  searchButtonAction: null,
  mfeTitle: null,
};

export default StudioHeader;
