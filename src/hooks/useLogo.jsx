import { AppContext } from '@edx/frontend-platform/react';

import { useContext, useEffect, useState } from 'react';

export default function useLogo() {
  const [data, setData] = useState(undefined);

  const { config } = useContext(AppContext);
  useEffect(() => {
    fetch(`${config.LMS_BASE_URL}${config.AC_INSTANCE_CONFIG_API_URL}`)
      .then((response) => response.json())
      .then((response) => setData(JSON.parse(response)))
      .catch((err) => {
        console.log(err);
      });
  }, [config.AC_INSTANCE_CONFIG_API_URL, config.LMS_BASE_URL]);
  return `${data?.logo}`;
}
