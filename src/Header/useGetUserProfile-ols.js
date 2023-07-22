import { getConfig } from "@edx/frontend-platform";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@edx/frontend-platform/react";
import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";

const useGetUserProfile = () => {
  const { authenticatedUser } = useContext(AppContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const { data, status } = await getAuthenticatedHttpClient().get(
          `${getConfig().LMS_BASE_URL}/api/user/v1/accounts/${
            authenticatedUser?.username
          }`
        );
        if (status !== 200) {
          throw new Error("user fetch not ok");
        }
        setUserProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (authenticatedUser) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [authenticatedUser]);

  return {
    userProfile,
    loading,
  };
};

export default useGetUserProfile;
