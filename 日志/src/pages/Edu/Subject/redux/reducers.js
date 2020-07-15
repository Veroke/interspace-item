import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST,
  UPDATE_SUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: []// 详细user数据
}

// 组件中，取消扩展项xpandedRowRender、rowExpandable，一级菜单图标也会消失

// export default function subjectList (state = initSubjectList, action) {
//   switch (action.type) {
//     case GET_SUBJECT_LIST:
//       return action.data
//     case GET_SECSUBJECT_LIST:
//       return action.data
//     default:
//       return state;
//   }
// }

export default function subjectList (state = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      const items = action.data.items.map(item => {
        return item.children = []
      })
      return action.data

    case GET_SECSUBJECT_LIST:
      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId
        state.items.forEach(item => {
          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
      return { ...state }
    case UPDATE_SUBJECT_LIST:
      state.items.forEach(subject => {
        if (subject._id === action.data.id) {
          subject.title = action.data.title
          return
        }
        subject.children.forEach(item => {
          if (item._id === action.data.id) {
            item.title = action.data.title
            return
          }
        })
      })
      return { ...state }

    default:
      return state
  }
}