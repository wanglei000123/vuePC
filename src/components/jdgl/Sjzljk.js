import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Sjzljk.json',
        method: 'get',
        params: query
    });
};
