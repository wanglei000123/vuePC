import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Zbkgl.json',
        method: 'get',
        params: query
    });
};
