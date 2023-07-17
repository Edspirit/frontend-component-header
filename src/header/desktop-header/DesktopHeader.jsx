import { Button, SearchField, Skeleton } from '@edx/paragon';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
// import { useDispatch } from 'react-redux';
import NavHeader from '../nav-header/NavHeader';
import DropdownNavHeader from '../dropdown-nav-header/DropdownNavHeader';
import DefaultLogo from '../../assets/NavLogo-placeholder.svg';
import handleRedirect from '../handleRedirect';
// import {
//   resetSearchFilters,
//   setSearchString,
// } from '../../../../redux/slice/searchQuerySlice';
// import ProfileDropdown from './ProfileDropdown';
import messages from '../../generic/messages';
import useLogo from '../../hooks/useLogo';


const DesktopHeader = ({ intl }) => {
  const history = useHistory();
  const { authenticatedUser } = useContext(AppContext);
   const logo = useLogo();
  // const dispatch = useDispatch();

  const handleSubmitSearch = (value) => {
    // dispatch(resetSearchFilters());
    // dispatch(setSearchString(value));
    history.push('/search');
  };

  return (
    <div className="d-flex flex-row justify-content-between align-items-center header-wrapper">
      <div className="left-side-container">
        <div className="logo-container mr-4">
            <Link to="/">
              <img
                src={logo ?? DefaultLogo}
                alt="edspirit-logo"
              />
            </Link>
        </div>
        {authenticatedUser ? <NavHeader /> : <DropdownNavHeader />}
      </div>
      <div className="d-flex right-side-wrapper">
        <SearchField
          onSubmit={handleSubmitSearch}
          placeholder={intl.formatMessage(
            messages['header.search.placeholder'],
          )}
        />
        {/* <div className="d-flex align-items-center">
            <Button variant="tertiary" size="sm" className="mx-1">
              Help
            </Button>
          </div> */}
        <div className="sign-in-container ml-3">
          {authenticatedUser ? (
            // <ProfileDropdown />
          <>hi</>
          ) : (
            <>
              <Button
                variant="tertiary"
                className="mx-1"
                size="sm"
                onClick={handleRedirect}
              >
                <FormattedMessage id="header.signIn" defaultMessage="Sign In" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                href={`${getConfig().LMS_BASE_URL}/register`}
              >
                <FormattedMessage
                  id="header.register"
                  defaultMessage="Register"
                />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

DesktopHeader.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(DesktopHeader);