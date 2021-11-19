import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //属性
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    //set方法
    SET_TOKEN: (state,token) => {
      state.token = token;
      localStorage.setItem("token",token);
    },
    SET_USERINFO: (state,userInfo) => {
      state.userInfo = userInfo;
      //保存在本地
      localStorage.setItem("userInfo",JSON                                                                                                                                                                                                                                                                                                                                                                                         .stringify(userInfo));
    },
    //删除
    REMOVE_INFO: (state) => {
      state.token = '';
      state.userInfo = {};
      localStorage.setItem("token",'');
      localStorage.setItem("userInfo",JSON.stringify(''));

    }
  },
  getters: {
    //get方法
    getUser: state => {
      return state.userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
