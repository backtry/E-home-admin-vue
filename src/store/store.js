import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userData:{}
    },
    mutations:{
        GET_USERDATA(state,paylod){
            state.userData = paylod
        }
    },
    actions:{

    },
    plugins:[
        createPersistedState({
            storage:{
                getItem: key => localStorage.getItem(key),
                setItem: (key,value) => localStorage.setItem(key,value),
                removeItem: key => localStorage.removeItem(key)
            }
        })
    ]
})
export default store