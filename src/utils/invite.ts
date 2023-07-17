import router from "@/vendors/route";
export const handleRedirect = ({ data, route } = {}) => {
  if (!data) return;
  const { query = {} } = route;
  const { redirect = "", source } = query;
  if (redirect) {
    window.location.href = redirect;
  } else {
    if (source) {
      router.replace(`/dashboard?source=${source}`);
    } else {
      router.replace("misinformation-list");
    }
  }
};
