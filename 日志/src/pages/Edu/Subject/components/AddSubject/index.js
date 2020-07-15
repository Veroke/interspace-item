import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { Card, Button, Form, Input, Select, message } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import { reqGetSubjectList, reqAddSubjectList } from '@api/edu/subject'

// import { getSubjectList } from '../../redux'

import './index.less'

// 获取Option组件
const Option = Select.Option

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}

// 点击添加按钮,表单校验成功之后的回调函数
const onFinish = values => {
  console.log('Success:', values)
}
// 表单校验失败的回调函数
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo)
}

// @connect(state => ({ subjectList: state.subjectList }), { getSubjectList })

class AddSubject extends Component {
  state = {
    subjectList: {
      total: 0,
      items: []
    }
  }
  page = 1

  async componentDidMount () {
    // console.log(this.props)
    // this.props.getSubjectList(this.page++, 5)

    const res = await reqGetSubjectList(this.page, 10)
    this.setState({
      subjectList: res
    })
  }

  //获取更多二级数据
  handleloadMore = async () => {
    // this.props.getSubjectList(this.page++, 10)
    const res = await reqGetSubjectList(this.page++, 10)
    const newItems = [...this.state.subjectList.items, ...res.items]

    this.setState({
      subjectList: {
        total: res.total,
        items: newItems
      }
    })
  }

  //提交按钮
  onFinish = async values => {
    try {
      await reqAddSubjectList(values.subjectname, values.parentid)
      message.success('课程分类添加成功')
      this.props.history.push('/edu/subject/list')
    } catch{
      message.error('课程分类添加失败')
    }
  }

  render () {
    return (
      <Card title={
        <>
          <Link to='/edu/subject/list'>
            <RollbackOutlined />
          </Link>
          <span className='add-subject'>新增课程</span>
        </>
      }>
        <Form
          // 给表单中的表单项布局
          {...layout}
          name='subject'
          // 当点击表单内的提交按钮,onFinish会触发
          onFinish={this.onFinish}
        // 提交失败的时候会触发
        // onFinishFailed={onFinishFailed}
        >
          {/* form表单中每一个表单项都需要使用Form.Item包裹 */}
          <Form.Item
            // 表示提示文字
            label='课程分类名称'
            // 表单项提交时的属性
            name='subjectname'
            // 校验规则
            rules={[
              {
                required: true,
                // 校验不通过时的提示文字
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
              dropdownRender={menu => {
                return (
                  <>
                    {menu}
                    <button type='link' onClick={this.handleloadMore}>加载数据</button>
                  </>
                )
              }}>
              <Option value={1}>{'一级菜单'}</Option>
              {this.state.subjectList.items.map(item => {
                return (<Option value={item._id} key={item._id}>{item.title}</Option>)
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            {/* htmlType表示这个按钮是表单内的提交按钮 */}
            <Button type='primary' htmlType='submit'> 添加</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default AddSubject

