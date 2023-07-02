import { useEffect, useState } from 'react';
import logoPlaceholder from '../assets/org-logo-place-holder.svg';

export default function useLogo(config) {
  const [data, setData] = useState();

  useEffect(() => {
    if (config.AC_INSTANCE_CONFIG_API_URL && config.LMS_BASE_URL) {
      fetch(`${config.LMS_BASE_URL}${config.AC_INSTANCE_CONFIG_API_URL}`)
        .then((response) => response.json())
        .then((response) => setData(JSON.parse(response)))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [config.AC_INSTANCE_CONFIG_API_URL, config.LMS_BASE_URL]);

  return `${data?.logo ?? (data?.edspirit_logo || logoPlaceholder)}`;
}
