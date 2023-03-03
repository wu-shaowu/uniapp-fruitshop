import {addCars,getUsersCars,updataCars} from '@/api/index.js'
const state ={
    usersCars:[],
};
const actions ={
            //在进行查找出用户的购物车
            async getCars({commit},data){
				console.log(data)
                const result = await getUsersCars(data);
				console.log(result)
                commit('GETCARS',result.data.data)
            },
            async updataCars({commit},data){
                const result = await updataCars(data);
				console.log(result)
                // commit('UPDATACARS',result.data.data)
            },
            async addCars({commit},data){
              const result = await addCars(data);
              console.log(result)
            }
            
};
const mutations ={
    GETCARS(context,value){ 
      console.log(state.usersCars)
        state.usersCars = value.filter(item=>item.isTrade==false);
        console.log(state.usersCars)
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