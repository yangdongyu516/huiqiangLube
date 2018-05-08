import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex);

// 读取localstorage
function readCartsFromStorage() {
    var cartsStr = localStorage.getItem("carts-info");
    if(cartsStr ==null || cartsStr.trim() == ""){
        return []
    }else{
        return JSON.parse(cartsStr)
    }
}

// 存储到localstorage
function writeCartsToStorage(carts) {
    localStorage.setItem("carts-info",JSON.stringify(carts))
}
 
export default new Vuex.Store({
  state: {
    //先从localstorage中读取数组，没有的话会自动生成一个空数组
    carts: readCartsFromStorage()
  },
  getters: {
    totalCount: state => {
      var result = 0;
      state.carts.forEach(v => {
        result += v.count;
      });
      return result;
    },
    getIds: state => {
      return state.carts.map(v => v.id).join(",");
    },
    getCountById: state => id => {
      var temp = state.carts.find(v => v.id == id);
      return temp.count;
    }
  },
  mutations: {
    addCart(state, cart) {
      let temp = state.carts.find(v => {
        return (v.id = cart.id);
      });
      if (temp) {
        temp.count += cart.count;
      } else {
        state.carts.push(cart);
      }
      //数组发生变化 要更新到localstorage中
      writeCartsToStorage(state.carts);
    },
    updateCarts(state,cartsList){
      cartsList.forEach(function(v,i) {
       let res = state.carts.find(function(e,i) {
          return e.id == v.id
        })
        res.count = v.count
      })
 
      
      writeCartsToStorage(state.carts);
    }
  }
});
