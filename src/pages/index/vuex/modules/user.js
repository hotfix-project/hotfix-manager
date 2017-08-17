import {types} from '../mutation-types'
import _ from 'lodash';

const state = {
    token:'',
    rightClick:''
}
const mutations = {
    [types['setToken']](state, payload) {
        state.token = payload.token;
    },
    [types['setRightClick']](state, payload) {
        state.rightClick = payload.rightClick;
    }
}

export default {
    state,
    mutations
}
