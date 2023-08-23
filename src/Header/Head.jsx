import React from 'react';
import { Helmet } from 'react-helmet';
import useGetConfig from './useGetConfig';

const Head = () => {
  const { favicon } = useGetConfig();

  return (
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
    </Helmet>
  );
};

export default Head;
