// import api from 'apiConfig/apiConfig';

export const token = state => {
    return state.user.token || localStorage.getItem('token');
};
export const rightClick = state => state.user.rightClick;

// export const apiUrl = state => api;
