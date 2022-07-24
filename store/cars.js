import {addCars,getUsersCars,updataCars} from '@/api/index.js'
const state ={
    usersCars:[],
};
const actions ={
            //在进行查找出用户的购物车
            async getCars({commit}){
                const data ={usersId:"62b178b0e3f366b069b4a39a"};
                const result = await getUsersCars(data);
                console.log(result)
                commit('GETCARS',result.data.data)
            },
            async updataCars({commit},data){
                const result = await updataCars(data);
                commit('UPDATACARS',result.data.data)
            },
            async addCars({commit},data){
              const result = await addCars(data);
              console.log(result)
            }
            
};
const mutations ={
    GETCARS(context,value){
        state.usersCars = value.filter(item=>item.isTrade==false);
        // state.usersCars = value;
    },
    UPDATACARS(context,value){
        state.usersCars = value;
    }
};
const getters = {};
export default{
    state,
    actions,
    mutations,
    getters,
}