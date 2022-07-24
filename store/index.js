import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// import users from './users';
import goods from './goods';
import cars from './cars';
// import trade from './trade';


export default new Vuex.Store({
    modules:{
        // users,
        goods,
        cars,
        // trade,
    }

})
