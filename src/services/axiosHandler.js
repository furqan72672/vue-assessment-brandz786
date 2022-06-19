import axios from 'axios'
import router from "@/router";

const axiosHandler = axios.create({
    baseURL: 'http://3.232.244.22/api',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

axiosHandler.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    // console.log(token)
    if (token) {
        config.headers.common["Authorization"] = 'bearer ' + token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
});

axiosHandler.interceptors.response.use(
    res=>{
        if(res.status===200||res.status===201){
            return Promise.resolve(res);
        }
        else{
            return Promise.reject(res);
        }
    },
    async error=>{
        if(error.response.status){
            switch(error.response.status){
                case 401:
                    localStorage.removeItem('token');
                    await router.push('/login')
            }
        }
    }
)

export default axiosHandler;
