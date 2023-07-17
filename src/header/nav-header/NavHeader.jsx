import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { NavLink, useHistory } from 'react-router-dom';
import React from 'react';

const NavHeader = () => {
  const history = useHistory();

  function handleClick() {
    history.push('/homepage/overview');
  }

 return <nav>
    <ul className="nav-wrapper">
      <NavLink  activeClassName="active" onClick={handleClick}>
        <div className="border-bottom" />
        <li>
          <FormattedMessage
            id="header.nav.overview"
            defaultMessage="Overview"
          />
        </li>
      </NavLink>
      <NavLink to="/inprogress" activeClassName="active">
        <li>
          <div className="border-bottom" />
          <FormattedMessage
            id="header.nav.inProgress"
            defaultMessage="In Progress"
          />
        </li>
      </NavLink>
      <NavLink to="/completed" activeClassName="active">
        <li>
          <div className="border-bottom" />
          <FormattedMessage
            id="header.nav.completed"
            defaultMessage="Completed"
          />
        </li>
      </NavLink>
      <a exact href="/homepage/discover" activeClassName="active">
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
}

export default NavHeader;
