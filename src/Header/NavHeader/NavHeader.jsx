import { FormattedMessage } from '@edx/frontend-platform/i18n';
import React from 'react';

const NavHeader = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
    const handleLocationChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
    }, []);
  
  return (
    <nav>
      <ul className="nav-wrapper">
        <a
          className={currentPath=== '/homepage/overview' ? 'active' : ''}
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
            currentPath === '/homepage/inprogress' ? 'active' : ''
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
            currentPath === '/homepage/completed' ? 'active' : ''
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
          className={currentPath === '/homepage/discover' ? 'active' : ''}
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
