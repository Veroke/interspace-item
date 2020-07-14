import {
  reqGetSubjectList,
  reqGetSecSubjectList,
  reqUpdateSubjectList
} from "@api/edu/subject";

import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT_LIST
} from "./constants";
// import Item from "antd/lib/list/Item";
/**
 * 获取/搜索 用户分页数据
 */
//同步action  返回一个对象  （异步一般不写后缀，同步添加后缀sync）
const getSubjectListSync = (list) => ({
  type: GET_SUBJECT_LIST,
  data: list,
});

//异步action
// export const getSubjectList = ({ page, limit }) => {
//   return (dispatch) => {
//     return reqGetSubjectList(page, limit).then((response) => {
//       dispatch(getSubjectListSync(response));
//       return response;
//     });
//   };
// };

// export const getSubjectList = ({ page, limit }) => {
//   return dispatch => {
//     return reqGetSubjectList(page, limit).then((response) => {
//       dispatch(getSubjectListSync(response))
//       return response
//     })
//   }
// }
// export const getSubjectList = ({page,limit})=>{
//   return dispatch => {
//     return reqGetSubjectList(page, limit).then(response=>{
//       dispatch(getSubjectListSync(response))
//       return response
//     })
//   }
// }

// export const getSubjectList = ({ page, limit }) => {
//   return dispatch => {
//     return reqGetSubjectList(page, limit).then(response => {
//       dispatch(getSubjectListSync(response))
//       return response
//     })
//   }
// }
// getSubjectListSync  同步action
export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubjectList({ page, limit }).then(response => {
      dispatch(getSubjectListSync(response))
      return response
    })
  }
}

//同步action 获取二级菜单
const getSecSubjectListSync = list => ({
  type: GET_SECSUBJECT_LIST,
  data: list
})

// 异步action 获取二级菜单
export const getSecSubjectList = (parentId) => {
  //异步发送dispatch
  return dispatch => {
    //返回值 调用api接口 返回成功结果 
    return reqGetSecSubjectList(parentId).then(response => {
      dispatch(getSecSubjectListSync(response))
      return response
    })
  }
}

//更新 同步
const updataSubjectSync = (data) => ({
  type: UPDATE_SUBJECT_LIST,
  data
})
//更新 异步
export const updataSubject = (title, id) => {
  return dispatch => {
    reqUpdateSubjectList(title, id).then(response => {
      dispatch(updataSubjectSync({ title, id }))
      return response
    })
  }
}

//reducer、action写完后 在index中引入，导出