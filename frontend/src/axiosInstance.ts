import axios from "axios";
import { caesarEncrypt, caesarDecrypt } from "./utils/caesarCipher";

// Créer une instance Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercepteur de requête pour chiffrer les données
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data) {
      const encryptedData: Record<string, any> = {};
      for (const key in config.data) {
        if (typeof config.data[key] === "string") {
          encryptedData[key] = caesarEncrypt(config.data[key]);
        } else {
          encryptedData[key] = config.data[key];
        }
      }
      config.data = encryptedData;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(error));
  },
);

// Intercepteur de réponse pour déchiffrer les données
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      const decryptedData: Record<string, any> = {};
      for (const key in response.data) {
        if (typeof response.data[key] === "string") {
          decryptedData[key] = caesarDecrypt(response.data[key]);
        } else {
          decryptedData[key] = response.data[key];
        }
      }
      response.data = decryptedData;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
