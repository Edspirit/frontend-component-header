/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getLocale } from '@edx/frontend-platform/i18n';
import useGetConfig from './useGetConfig';
import { injectIntl,intlShape } from '@edx/frontend-platform/i18n';
import messages from '../Header.messages';

const Head = ({ intl,mfeTitle }) => {
  const { favicon, platformName} = useGetConfig();
  useEffect(() => {
    const setFont = () => {
      const body = document.querySelector('body');
      if (getLocale() === 'fa' || getLocale() === 'fa-ir') {
        body.className = 'lang_fa';
      } else if (getLocale() === 'ar') {
        body.className = 'lang_ar';
      } else {
        body.removeAttribute('class');
      }
    };
    setFont();
  }, [getLocale()]);
  return (
    <Helmet>
      <title>
        {intl.formatMessage(messages[mfeTitle], { siteName: platformName || getConfig().siteName })}
      </title>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
  );
};

Head.propTypes = {
  mfeTitle: PropTypes.string,
};

Head.defaultProps = {
  mfeTitle: null,
  intl: intlShape.isRequired,
};
export default injectIntl(Head);
