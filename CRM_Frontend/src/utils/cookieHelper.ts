// utils/cookieHelper.ts
import Cookies from 'js-cookie';
export const key = "accessToken";
// Set a cookie (automatically adds secure only in production)
export const setCookie = (key: string, value: string, expires = 1) => {

    console.log("Mode: ",import.meta.env.MODE)
    const sameSiteValue: 'Strict' | 'Lax' | 'None' = 'Strict';
    const options = {
      expires, // days
      sameSite: sameSiteValue,
      ...(import.meta.env.MODE==="production" && { secure: true }), // secure only if production
    };

    Cookies.set(key, value, options);
};

// Get token
export const getToken = (key: string) => {
  return Cookies.get(key);
};

// Remove a token
export const removeToken = (key: string) => {
  Cookies.remove(key);
};
