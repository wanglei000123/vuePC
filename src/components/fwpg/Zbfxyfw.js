import request from '../../utils/request';

export const fetchData = query => {
    return request({
        url: './Zbfxyfw.json',
        method: 'get',
        params: query
    });
};
