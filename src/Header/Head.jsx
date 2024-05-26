/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getLocale } from '@edx/frontend-platform/i18n';
import useGetConfig from './useGetConfig';
import safariFavicon from '../assets/favicon.png';

const setHeadElements = (favicon, safariFavicon) => {
  // Helper function to create and append a link element
  const createAndAppendLink = (rel, href, attributes = {}) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    Object.keys(attributes).forEach(attr => {
      link.setAttribute(attr, attributes[attr]);
    });
    document.head.appendChild(link);
  };

  // Remove existing favicons to avoid duplicates
  document.querySelectorAll("link[rel='icon'], link[rel='apple-touch-icon'], link[rel='mask-icon']").forEach(link => link.remove());

  // Set favicons and apple touch icons
  createAndAppendLink('shortcut icon', favicon, { type: 'image/x-icon' });
  createAndAppendLink('apple-touch-icon', safariFavicon);
  createAndAppendLink('mask-icon', favicon, { color: '#000000' });

  const sizes = ['180x180', '152x152', '120x120', '76x76'];
  sizes.forEach(size => {
    createAndAppendLink('apple-touch-icon', safariFavicon, { sizes: size });
  });
};

const Head = () => {
  const { favicon } = useGetConfig();
  
  useEffect(() => {
    const setFont = () => {
      const body = document.querySelector('body');
      const locale = getLocale();
      if (locale === 'fa' || locale === 'fa-ir') {
        body.className = 'lang_fa';
      } else if (locale === 'ar') {
        body.className = 'lang_ar';
      } else {
        body.removeAttribute('class');
      }
    };

    setFont();
    setHeadElements(favicon, safariFavicon);
  }, [getLocale, favicon]);

  return null; // This component does not render anything
};

export default Head;