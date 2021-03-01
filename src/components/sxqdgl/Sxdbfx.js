import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Sxdbfx.json',
        method: 'get',
        params: query
    });
};
