import React, { useState, useEffect } from "react";
import { Form, Select, Button, message } from "antd";
import { connect } from 'react-redux'

import { reqGetCourseList } from '@api/edu/course'
import { getChapterList } from '../redux'

import "./index.less";

const { Option } = Select;

function SearchForm (props) {
  console.log(props)
  const [form] = Form.useForm();
  //放在一个数组中，前面是状态，第二个是设置状态 useState([])
  const [courseList, setCourseList] = useState([])

  const resetForm = () => {
    form.resetFields(['courseId']);
  };

  useEffect(() => {
    async function fetchState () {
      const res = await reqGetCourseList()
      setCourseList(res)
    }
    fetchState()

  }, [])
  console.log(courseList)

  const handleGetChapter = async value => {
    const data = {
      page: 1,
      limit: 10,
      courseId: value.courseId
    }
    const res = await props.getChapterList(data)
    message.success('课程章节列表数据获取成功')
    console.log(res)
  }

  return (
    <Form layout="inline" form={form} onFinish={handleGetChapter}>
      <Form.Item name="courseId" label="课程">
        <Select
          allowClear
          placeholder="课程"
          style={{ width: 250, marginRight: 20 }}
        >
          {courseList.map(course => {
            return <Option key={course._id} value={course._id}>{course.title}</Option>
          })}

        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getChapterList })(SearchForm)


//第一次没渲染 给个空数组