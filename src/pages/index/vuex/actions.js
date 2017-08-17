import {types} from './mutation-types';
import Vue from 'vue';
import api from 'apiConfig/apiConfig';

export function fSetToken({commit},payload) {
    commit(types['setToken'],payload);
}

export function fSetRightClick({commit},payload) {
    commit(types['setRightClick'],payload);
}


