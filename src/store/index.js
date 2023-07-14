import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)
// 创建并暴露vuex实列
export default new Vuex.Store({
    modules:{
        tab
    }
})