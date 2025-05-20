import { useSWRConfig } from "swr";
import axios from "axios";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await mutate(null, undefined, false);
      await removeUser();
      axios.defaults.headers.common["Authorization"] = "";
      axios.defaults.headers["X-Access-Token"] = "";
      document.cookie = "";
      navigate("/auth/login", { replace: true }); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};
