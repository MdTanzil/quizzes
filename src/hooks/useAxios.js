/* eslint-disable no-useless-catch */
import axios from "axios";
import { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  
  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const rfToken = auth?.refreshToken;
            // console.log({"refreshToken": refreshToken});
            
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/refresh-token`,
              {"refreshToken":rfToken}
            );
            
            const { accessToken } = response.data.data;
            

            console.log(`New Token: ${accessToken }`);
            setAuth({ ...auth, authToken: accessToken
            });

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken
            }`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
