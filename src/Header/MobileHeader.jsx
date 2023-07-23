/* eslint-disable react/prop-types */
import { Icon, IconButton, Nav } from '@edx/paragon';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { Search } from '@edx/paragon/icons';
import { NavLink, useLocation } from 'react-router-dom';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import DefaultLogo from '../assets/NavLogo-placeholder.svg';
import { ReactComponent as HomeNav } from '../assets/nav-icons/home-nav.svg';
import { ReactComponent as HomeNavColored } from '../assets/nav-icons/home-nav-colored.svg';
import { ReactComponent as DashboardNav } from '../assets/nav-icons/dashboard-nav.svg';
import { ReactComponent as DashboardNavColored } from '../assets/nav-icons/dashboard-nav-colored.svg';
import { ReactComponent as DiscoverNav } from '../assets/nav-icons/discover-nav.svg';
import { ReactComponent as DiscoverdNavColored } from '../assets/nav-icons/discover-nav-colored.svg';
import { ReactComponent as ProfileNav } from '../assets/nav-icons/profile-nav.svg';
import { ReactComponent as ProfileNavColored } from '../assets/nav-icons/profile-nav-colored.svg';
import useGetConfig from './useGetConfig';

const MobileHeader = ({ setOpenModal }) => {
  const { authenticatedUser } = useContext(AppContext);
  const { headerLogo } = useGetConfig();

  const [ActiveLink, setActiveLink] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <div className="hidden-top-mobile-header" />
      <div className="py-1.5 px-4 mobile-header">
        <div className="logo-container mr-4">
          <a href="/homepage">
            <img src={headerLogo ?? DefaultLogo} alt="edspirit-logo" />
          </a>
        </div>
        <IconButton
          className="mobile-search"
          src={Search}
          iconAs={Icon}
          alt="Search"
          onClick={() => setOpenModal(true)}
        />
      </div>
      <Nav
        variant="pills"
        className="d-flex justify-content-between w-100 mobile-bottom-nav-wrapper"
      >
        <Nav.Item>
          <a
            className={ActiveLink === '/homepage' ? 'active' : ''}
            href="/homepage"
            as={NavLink}
          >
            <Icon src={ActiveLink === '/homepage' ? HomeNavColored : HomeNav} />
            <FormattedMessage id="header.nav.home" defaultMessage="Home" />
          </a>
        </Nav.Item>
        <Nav.Item>
          <a
            className={ActiveLink === '/homepage/overview' ? 'active' : ''}
            href="/homepage/overview"
            as={NavLink}
          >
            <Icon
              src={
                ActiveLink === '/homepage/overview'
                  ? DashboardNavColored
                  : DashboardNav
              }
            />
            <FormattedMessage
              id="header.nav.dashboard"
              defaultMessage="Dashboard"
            />
          </a>
        </Nav.Item>
        <Nav.Item>
          <a
            className={ActiveLink === '/homepage/discover' ? 'active' : ''}
            href="/homepage/discover"
            as={NavLink}
          >
            <Icon
              src={
                ActiveLink === '/homepage/discover'
                  ? DiscoverdNavColored
                  : DiscoverNav
              }
            />
            <FormattedMessage
              id="header.nav.discover"
              defaultMessage="Discover"
            />
          </a>
        </Nav.Item>
        <Nav.Item>
          <a
            className={
              ActiveLink === `/u/${authenticatedUser?.username}` ? 'active' : ''
            }
            href={`/profile/u/${authenticatedUser?.username}`}
            as={NavLink}
          >
            <Icon
              src={
                ActiveLink === `/u/${authenticatedUser?.username}`
                  ? ProfileNavColored
                  : ProfileNav
              }
            />
            <FormattedMessage
              id="header.dropdownOption.profile"
              defaultMessage="Profile"
            />
          </a>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default MobileHeader;
