import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Zwfwsxcx.json',
        method: 'get',
        params: query
    });
};
