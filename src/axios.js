import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL="http://127.0.0.1:8080"

//前置拦截
axios.interceptors.request.use(config => {
    return config;
})

//后置拦截
axios.interceptors.response.use(response => {
    let res = response.data;
    console.log("========================");
    console.log(res);

    if(res.code === 200) {
        return response;
    } else {
        // duration : 3*1000 弹出后3秒自动消失
        Element.Message.error('密码错了哦',{duration : 3*1000});

        return  Promise.reject(response.data.msg);
    }
},
    error => {
        console.log(error);
        if(error.response.data){
            error.message = error.response.data.msg;
        }
        if(error.response.status === 401){
            store.commit("REMOVE_INFO");
            router.push("/login");
        }
        Element.Message.error(error.message,{duration : 3*1000});
    }
    )
