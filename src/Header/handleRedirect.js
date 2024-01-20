import { getConfig } from '@edx/frontend-platform';

const handleRedirect = () => {
  // Get the URL of the login page in the other project
  const loginUrl = `${getConfig().LOGIN_URL}`;

  // Set the URL parameters for the redirect back to your home page after login
  const redirectParams = `?next=${encodeURIComponent(window.location.href)}`;

  // Redirect the user to the login page with the redirect parameters
  window.location.href = `${loginUrl}${redirectParams}`;
};
export default handleRedirect;

export const handleLogout = () => {
  const logoutUrl = `${getConfig().LMS_BASE_URL}/logout`;
  let redirectTo = window.location.href;
  if (redirectTo.startsWith(getConfig().LEARNING_BASE_URL)) {
    alert('zzzzzzzz')
    redirectTo = getConfig().MARKETING_SITE_BASE_URL;
  }
  const redirectParams = `?next=${encodeURIComponent(redirectTo)}`;
  window.location.href = `${logoutUrl}${redirectParams}`;
};
