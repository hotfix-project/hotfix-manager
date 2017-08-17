export const asynctypes = [
    // 'getUserInfo', 
    // 'getFinanceListData',  
    // 'requestIndexData'
]

export const synctypes = [
    'setToken',
    'setRightClick'
]

export const types = {};
asynctypes.forEach(item => {
    types[item + '.start'] = item + '.start';
    types[item + '.ok'] = item + '.ok';
    types[item + '.error'] = item + '.error';
});
synctypes.forEach(item => {
    types[item] = item;
});
