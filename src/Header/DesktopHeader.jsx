import { Button, SearchField } from '@edx/paragon';
import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { getConfig } from '@edx/frontend-platform';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from '@edx/frontend-platform/i18n';
import NavHeader from './NavHeader/NavHeader';
import DefaultLogo from '../assets/NavLogo-placeholder.svg';
import handleRedirect from './handleRedirect';
import ProfileDropdown from './DesktopHeader/ProfileDropdown';
import messages from '../generic/messages';
import useGetConfig from './useGetConfig';

const DesktopHeader = ({ intl }) => {
  const { authenticatedUser } = useContext(AppContext);
  const { headerLogo } = useGetConfig();

  const handleSubmitSearch = (value) => {
    window.location.replace(`/homepage/search?q=${value}`);
  };

  return (
    <div className="d-flex flex-row justify-content-between align-items-center header-wrapper">
      <div className="left-side-container">
        <div className="logo-container mr-4">
          <a href="/homepage">
            <img src={headerLogo ?? DefaultLogo} alt="edspirit-logo" />
          </a>
        </div>
        <NavHeader />
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
            <ProfileDropdown />
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
