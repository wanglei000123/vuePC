import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Sxyj.json',
        method: 'get',
        params: query
    });
};
