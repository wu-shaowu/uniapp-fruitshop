import {getAllTrade} from '@/api/index.js'
const state ={
    tradeInfo:[]
};
const actions ={
    async getAllTrade({commit},value){
        const result = await getAllTrade(value);
        console.log(result);
        if (result.data.data) {
            commit('GETALLTRADE',result.data.data);
        }
    }
};
const mutations ={
    GETALLTRADE(content,data){
        state.tradeInfo = data;
    }
};
const getters = {};
export default{
    state,
    actions,
    mutations,
    getters,
}