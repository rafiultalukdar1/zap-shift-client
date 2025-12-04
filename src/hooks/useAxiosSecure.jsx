import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptors = axiosSecure.interceptors.request.use(
            async (config) => {

                // user na thakle token add korbo na
                if (user) {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const resInterceptors = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                const statusCode = error.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    logOut().then(() => {
                        navigate('/login');
                    });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptors);
            axiosSecure.interceptors.response.eject(resInterceptors);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;



























// import axios from 'axios';
// import React, { useEffect } from 'react';
// import useAuth from './useAuth';
// import { useNavigate } from 'react-router';


// const axiosSecure = axios.create({
//     baseURL: 'http://localhost:3000',

// });

// const useAxiosSecure = () => {

//     const {user, logOut} = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const reqInterceptors = axiosSecure.interceptors.request.use(config => {
//             config.headers.Authorization = `Bearer ${user.accessToken}`;
//             return config;
//         });

//         const resInterceptors = axiosSecure.interceptors.response.use((response)=> {
//             return response;
//         }, (error)=> {
//             const statusCode = error.status;
//             if(statusCode === 401 || statusCode === 403){
//                 logOut()
//                     .then(() => {
//                         navigate('/login')
//                     })
//             }
//             return Promise.reject(error);
//         });

//         return () => {
//             axiosSecure.interceptors.request.eject(reqInterceptors);
//             axiosSecure.interceptors.response.eject(resInterceptors);
//         };
//     },[user, logOut, navigate]);

//     return axiosSecure;
// };

// export default useAxiosSecure;