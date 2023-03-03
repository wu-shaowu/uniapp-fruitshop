import {
  getGoodInfo,
  getGoodDetail,
  searchGoods
} from '@/api/index.js'

const state = {
  goodInfo: [],
  searchGoods: [],
  detailInfo: {},
  page: 0,
  total: 0,
  price:0,
  detailGoodInfo:{}
};
const actions = {
  async getGoodInfo({commit}) {
    const result = await getGoodInfo();
    if (result.status == 1) {
      commit('GETGOODINFO', result.data.data);
    } else {
      alert('请求出错')
    }

  },
  async searchGoods({commit}, data) {
    const result = await searchGoods(data);
    console.log(result)
    if (result.data.status == 1) {
      commit('SEARCHGOODS', result.data.data)
    } else {
      alert("搜索出错");
    }
  },
  async searchGoodsByPassword({commit}, data) {
    const result = await searchGoods(data);
    console.log(result)
    if (result.data.status == 1) {
      commit('searchGoodsByPassword2', result.data.data)
    } else {
      alert("搜索出错");
    }
  },
  async getGoodDetail({commit}, id) {
    const result = await getGoodDetail(id);
    commit('GETGOODDETAIL', result.data.data)
  }

};
const mutations = {
  searchGoodsByPassword2(state,data){
console.log(data)    
    state.searchGoods = data.goods
  },
  GETGOODINFO(state, data) {
    state.searchGoods = data.goods;
  },
  SEARCHGOODS(context, data) {  
    console.log(data)
    state.searchGoods = data.goods
  // if(state.searchGoods.length ==20){
  //   return 
  // }else{
  //   state.searchGoods = state.searchGoods.concat(data.goods) ;
  //   let arr = [];
  //   state.searchGoods.forEach((item)=>{
  //       if(arr.indexOf(item)==-1){
  //         arr.push(item)
  //       }     
  //   })
  //   state.searchGoods = arr;
  //   state.total = data.total;
  //   state.page = data.page;
    // }
  },
  GETGOODDETAIL(context, data) {
    state.detailInfo = data;
    state.price = data.price;
  },
  DETAILGOODINFO(context,data){
    state.detailGoodInfo = data;
  },
  QKSZ(context,data){
    state.searchGoods = []
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
}