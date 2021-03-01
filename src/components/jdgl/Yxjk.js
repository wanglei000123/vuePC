import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Yxjk.json',
        method: 'get',
        params: query
    });
};
