// import { useEffect } from "react";
// import * as fetchIntercept from "fetch-intercept";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";

// const useInterceptedFetch = () => {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {
//     const unregister = fetchIntercept.register({
//       request: function (url, config) {
//         if (!config.headers["Authorization"]) {
//           config.headers["Authorization"] = `${auth?.accessToken}`;
//         }
//         return [url, config];
//       },

//       requestError: function (error) {
//         return Promise.reject(error);
//       },

//       response: async function (response) {
//         const clonedResponse = response.clone();
//         const json = async () =>
//           await clonedResponse.json().then((data) => {
//             return { ...data, title: `Intercepted:` };
//           });
//         response.json = await json();
//         return response;
//       },

//       responseError: async function (error) {
//         console.log("here");
//         console.log(error);
//         const prevReq = error?.config;
//         // console.log(object);
//         if (error?.response?.status === 401 && !prevReq.sent) {
//           prevReq.sent = true;
//           const newAccessToken = await refresh();
//           prevReq.headers["Authorization"] = `${newAccessToken}`;
//           return fetch(prevReq);
//         }

//         return Promise.reject(error);
//       },
//     });

//     return () => {
//       unregister();
//     };
//   }, [auth, refresh]);

//   //TODO: put return thinng
//   return fetch;
// };

// export default useInterceptedFetch;
