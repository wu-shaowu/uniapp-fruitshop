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
    console.log(result.data);
    if (result.status == 1) {
      commit('GETGOODINFO', result.data.data);
    } else {
      alert('请求出错')
    }

  },
  async searchGoods({commit}, data) {
    const result = await searchGoods(data);
    if (result.data.status == 1) {
      commit('SEARCHGOODS', result.data.data)
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
  GETGOODINFO(state, data) {
    console.log(data);
    state.searchGoods = data;
  },
  SEARCHGOODS(context, data) {
    state.searchGoods = state.searchGoods.concat(data.goods) ;
    let arr = [];
    state.searchGoods.forEach((item)=>{
        if(arr.indexOf(item)==-1){
          arr.push(item)
        }
        
    })
    state.searchGoods = arr;
    state.total = data.total;
    state.page = data.page;
  },
  GETGOODDETAIL(context, data) {
    state.detailInfo = data;
    state.price = data.price;
  },
  DETAILGOODINFO(context,data){
    console.log(data)
    state.detailGoodInfo = data;
  }
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
}