import { AppContext } from '@edx/frontend-platform/react';
import { Dropdown, Icon } from '@edx/paragon';
import React, { useContext } from 'react';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { ArrowDropDown } from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';
import { ReactComponent as Avatar } from '../../assets/header-avatar.svg';
import { handleLogout } from '../handleRedirect';
import useGetUserProfile from '../useGetUserProfile';
import useGetConfig from '../useGetConfig';

const ProfileDropdown = () => {
  const { authenticatedUser } = useContext(AppContext);
  const { userProfile, loading: userProfileLoading } = useGetUserProfile();
  const { hasBilling } = useGetConfig();

  const renderAvatar = () => {
    if (userProfileLoading) {
      return <Icon src={Avatar} />;
    }
    if (userProfile?.profile_image?.has_image) {
      return (
        <div className="avatar-wrapper">
          <img
            src={userProfile?.profile_image?.image_url_medium}
            alt="avatar"
          />
        </div>
      );
    }
    return <Icon src={Avatar} />;
  };

  return (
    <Dropdown className="ml-3 avatar-dropdown-wrapper">
      <Dropdown.Toggle iconAfter={ArrowDropDown} iconBefore={renderAvatar} />
      <Dropdown.Menu alignRight>
        <Dropdown.Item
          href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`}
        >
          <FormattedMessage
            id="header.dropdownOption.profile"
            defaultMessage="Profile"
          />
        </Dropdown.Item>
        <Dropdown.Item
          href={getConfig().ACCOUNT_SETTINGS_URL}
        >
          <FormattedMessage
            id="header.dropdownOption.account"
            defaultMessage="Account"
          />
        </Dropdown.Item>
        <Dropdown.Item
          href={`https://${getConfig().BASE_URL.replace('apps.', '')}/homepage/overview`}
        >
          <FormattedMessage
            id="header.dropdownOption.dashboard"
            defaultMessage="Dashboard"
          />
        </Dropdown.Item>
        { hasBilling && (
        <Dropdown.Item
          href={`https://billing.${getConfig().LMS_BASE_URL.replace(
            'https://',
            '',
          )}`}
        >
          <FormattedMessage
            id="header.dropdownOption.orderHistory"
            defaultMessage="Order History"
          />
        </Dropdown.Item>
        )}
        <Dropdown.Item onClick={handleLogout}>
          <FormattedMessage
            id="header.dropdownOption.signOut"
            defaultMessage="Sign Out"
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
