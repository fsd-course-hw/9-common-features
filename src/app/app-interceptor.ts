import { apiInstance } from "@/shared/api/api-instance";
import { ROUTER_PATHS } from "@/shared/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useApplayAppInterceptor() {
  const navigation = useNavigate();

  useEffect(() => {
    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 403 handler
        if (error.response.status === 403) {
          navigation(ROUTER_PATHS[403], { replace: true });
        }
        throw error;
      },
    );

    apiInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // 401 handler
        if (error.response.status === 401) {
          navigation(ROUTER_PATHS.SIGN_IN, { replace: true });
        }
        throw error;
      },
    );
  }, [navigation]);
}
