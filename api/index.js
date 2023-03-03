
import api from '@/api/api.js'

// export const getgoods =  () => { 
// 	let data =  api({
// 		url: 'goods/getGoodInfo'
// 	})
// 	return data
// }
export const  getGoodInfo=()=>api({url: 'goods/getGoodInfo',method:'GET'});
export const login = (data) =>api({url:'users/login',method:'POST',data});
export const getGoodDetail =(data)=>api({url:'goods/getGoodDetail',method:'POST',data});
export const addCars =(data)=>api({url:'cars/addcars',method:'POST',data});
export const checkId =(data)=>api({url:'users/checkId',method:'POST',data});
export const updataCars =(data)=>api({url:'cars/updataCars',method:'POST',data});
export const getUsersCars = (data)=>api({url:'cars/getUsersCars',method:'POST',data});
export const deleteCars = (data)=>api({url:'cars/deleteCars',method:'POST',data});
export const addTrade = (data) =>api({url:'trade/addTrade',method:'POST',data});
export const getTrade = (data) =>api({url:'trade/getTrade',method:'POST',data});
export const keepTradeInfo =(data) =>api({url:'trade/keepTradeInfo',method:'POST',data});
export const deleteAllCars =(data) =>api({url:'cars/deleteAllCars',method:'POST',data});
export const recharge = (data) =>api({url:'users/recharge',method:'POST',data});
export const getAllTrade = (data) =>api({url:'trade/getAllTrade',method:'POST',data});
export const searchGoods = (data) =>api({url:'goods/search',method:'POST',data});
export const changeAddress = (data) =>api({url:'users/changeAddress',method:'POST',data});
export const register = (data) =>api({url:'users/register',method:'POST',data});


