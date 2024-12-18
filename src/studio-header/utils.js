import messages from './messages';

const getUserMenuItems = ({ studioBaseUrl, handleLogout, intl, isAdmin }) => {
  let items = [
    {
      href: `${studioBaseUrl}`,
      title: intl.formatMessage(messages['header.user.menu.studio']),
    },
    {
      href: '#',
      title: intl.formatMessage(messages['header.user.menu.signOut']),
      onClick: (e) => {
        e.preventDefault();
        handleLogout();
      },
    },
  ];
  if (isAdmin) {
    items = [
      {
        href: `${studioBaseUrl}`,
        title: intl.formatMessage(messages['header.user.menu.studio']),
      },
      {
        href: '#',
        title: intl.formatMessage(messages['header.user.menu.signOut']),
        onClick: (e) => {
          e.preventDefault();
          handleLogout();
        },
      },
    ];
  }

  return items;
};

export default getUserMenuItems;
