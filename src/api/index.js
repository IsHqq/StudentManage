import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: '../utils/students.json',
        method: 'get',
        params: query
    });
};
