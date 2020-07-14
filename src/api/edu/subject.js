import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

// const MOCK_URL = `http://localhost:8888${BASE_URL}`

// 获取
export function reqGetSubjectList (page, limit) {
  return request({
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}

//获取二级菜单
export function reqGetSecSubjectList (parentId) {
  return request({
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}

//添加课程分类
export function reqAddSubjectList (title, parentId) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      title,
      parentId
    }
  });
}
//更新
export function reqUpdateSubjectList (title, id) {
  return request({
    url: `${BASE_URL}/update`,
    method: "PUT",
    data: {
      title,
      id
    }
  });
}

//删除
export function reqDelSubjectList (id) {
  return request({
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}