import { AppContext } from '@edx/frontend-platform/react';
import { useContext, useEffect, useState } from 'react';
import logoPlaceholder from '../assets/org-logo-place-holder.svg';

export default function useLogo() {
  const [data, setData] = useState({});
  const { config } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.LMS_BASE_URL}${config.AC_INSTANCE_CONFIG_API_URL}`);
        const result = await response.json();
        setData(JSON.parse(result));
      } catch (error) {
        console.log(error);
      }
    };

    if (config.AC_INSTANCE_CONFIG_API_URL && config.LMS_BASE_URL) {
      fetchData();
    }
  }, [config.AC_INSTANCE_CONFIG_API_URL, config.LMS_BASE_URL]);

  return data?.logo || logoPlaceholder;
}