import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

//获取章节数据
export function reqGetLessonList (chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}

//新增课时， 上传视频 获取七牛云token的api uploadtoken
export function reqGetQiniuToken () {
  return request({
    url: `/uploadtoken`,
    method: 'GET'
  })
}

//新增课时， 上传视频 获取七牛云token的api uploadtoken
// export function reqAddLessonList ({ chapterId, title, free, video }) {
//   return request({
//     url: `${BASE_URL}/save`,
//     method: 'POST',
//     data: {
//       chapterId,
//       title,
//       free,
//       video,
//     }
//   })
// }
export function reqAddLesson ({ chapterId, free, title, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      chapterId,
      title,
      free,
      video
    }
  })
}
