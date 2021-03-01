import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Yxwddb.json',
        method: 'get',
        params: query
    });
};
