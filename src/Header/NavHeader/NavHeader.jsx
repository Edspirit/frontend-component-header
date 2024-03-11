import { FormattedMessage } from '@edx/frontend-platform/i18n';
// import { useLocation } from 'react-router-dom';
import React from 'react';

const NavHeader = () => {
  // const location = useLocation();
  const location = window.location.pathname;

  return (
    <nav>
      <ul className="nav-wrapper">
        <a
          className={location.pathname === '/homepage/overview' ? 'active' : ''}
          href="/homepage/overview"
        >
          <div className="border-bottom" />
          <li>
            <FormattedMessage
              id="header.nav.overview"
              defaultMessage="Overview"
            />
          </li>
        </a>
        <a
          href="/homepage/inprogress"
          className={
            location.pathname === '/homepage/inprogress' ? 'active' : ''
          }
        >
          <li>
            <div className="border-bottom" />
            <FormattedMessage
              id="header.nav.inProgress"
              defaultMessage="In Progress"
            />
          </li>
        </a>
        <a
          href="/homepage/completed"
          className={
            location.pathname === '/homepage/completed' ? 'active' : ''
          }
        >
          <li>
            <div className="border-bottom" />
            <FormattedMessage
              id="header.nav.completed"
              defaultMessage="Completed"
            />
          </li>
        </a>
        <a
          href="/homepage/discover"
          className={location.pathname === '/homepage/discover' ? 'active' : ''}
        >
          <li>
            <div className="border-bottom" />
            <FormattedMessage
              id="header.nav.discover"
              defaultMessage="Discover"
            />
          </li>
        </a>
      </ul>
    </nav>
  );
};

export default NavHeader;
