export const useUserInfo = () => {
  return {
    getToken() {
      return useUserStoreWithout().token;
    },
    getExtraData() {
      const { teamCode } = useUserStoreWithout();
      if (!teamCode) {
        return null;
      }
      return {
        teamCode,
      };
    },
    logout() {
      return useUserStoreWithout().logout(false);
    },
  };
};
