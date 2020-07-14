import request from '@utils/request'

const BASE_URL = '/admin/edu/course'

//获取章节数据
export function reqGetCourseList () {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}