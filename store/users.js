import {
    login,
    checkId,
    recharge
} from '@/api/index.js'
const state = {
    usersInfo: {},

};
const actions = {
    async login({
        commit
    }, data) {
        const result = await login(data)
        console.log(result);
        if (result.data.status == 1) {
       uni.setStorage({
         key:"id",
         data:result.data.data._id,
         success(){
           console.log("�ɹ�")
         }
       })
             uni.navigateTo({
               url:'../../navigation/navigation?show=false'
             })
            commit('LOGIN', result.data);

        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async checkId({
        commit
    }, data) {
        const result = await checkId(data)
        if (result.data.status == 1) {
            commit('CHECKID', result.data);

        }
    },
    async recharge({commit},data){
        const result = await recharge(data);
        if (result.data.status == 1) {
            commit('RECHARGE', result.data);
        }
    }
};
const mutations = {
    LOGIN(context, value) {
        console.log(value.data)
        state.usersInfo = value.data;
    },
    CHECKID(context, value){
        state.usersInfo = value.data;
    },
    LOGOUT(context,value){
        state.usersInfo = {};
    },
    RECHARGE(context,value){
        state.usersInfo = value.data;
    }
};
const getters = {};
export default {
    state,
    actions,
    mutations,
    getters,
}