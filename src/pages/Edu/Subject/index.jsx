import React, { Component } from "react";
import { Button, Table, Tooltip, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'

// import reqGetSubjectList from '@api/edu/subject'
// import { reqGetSubjectList } from '../../../api/edu/subject'
import { connect } from 'react-redux'

import { getSubjectList, getSecSubjectList, updataSubject } from './redux/actions'
// import { reqDelSubjectList } from '@api/deu/subject'

import './index.less'
// const columns = [
//   { title: '分类名称', dataIndex: 'title', key: 'title' },

//   {
//     title: '操作',
//     dataIndex: '',
//     key: 'x',
//     render: () => (
//       <div>
//         <Tooltip title='更新课程分类'>
//           <Button type='primary' ><FormOutlined /></Button>
//         </Tooltip>
//         <Tooltip title='删除课程分类'>
//           <Button type='danger' className='item-btn'><DeleteOutlined /></Button>
//         </Tooltip>



//       </div>
//     ),
//     width: 200
//   },
// ];

@connect(
  state => ({ subjectList: state.subjectList }), { getSubjectList, getSecSubjectList, updataSubject }
)

class Subject extends Component {

  currentPage = 1

  state = {
    subjectId: '',
    subjectTitle: ''
  }
  componentDidMount () {
    this.props.getSubjectList(1, 5)
  }

  //获取subject数据的方法
  // getSubjectList = async (page, limit) => {
  //   const res = await reqGetSubjectList(page, limit)
  //   this.setState({
  //     subject: res
  //   })
  // }

  handleChange = (page, pageSize) => {
    // this.getSubjectList(page, pageSize)
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  ShowSizeChange = (current, pageSize) => {

    // this.getSubjectList(current, pageSize)
    this.props.getSubjectList(current, pageSize)
    this.currentPage = current
  }

  handleAdd = () => {
    this.props.history.push('/edu/subject/add')
  }

  //展示二级菜单
  handleClickExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }

  handleUpdateClick = value => {
    return () => {
      this.setState({
        subjectId: value._id,
        subjectTitle: value.title,
      })
    }
    // this.oldsubjectTitle = value.title
  }

  //修改数据 受控组件input的change回调函数
  handleTitleChange = (e) => {
    this.setState({
      subjectTitle: e.target.value
    })
  }

  handleCancle = () => {
    this.setState({
      subjectId: '',
      subjectTitle: ''
    })
  }
  //更新确认按钮
  hadnleUpdate = async () => {
    let { subjectId, subjectTitle } = this.state

    // if (subjectTitle.lenght === 0) {
    //   message.error('课程名称不能为空')
    //   return
    // }

    // if (this.oldsubjectTitle === subjectTitle) {
    //   message.error('课程名称不能相同')
    //   return
    // }

    await this.props.updataSubject(subjectTitle, subjectId)
    message.success('更改成功')
    this.handleCancle()
  }

  // handleKeyUp = e => {
  //   console.log(e)
  //   if (e.keyCode == 13) {
  //     // console.log('9999')
  //     console.log(e)
  //   }
  // }
  render () {
    const columns = [
      {
        title: '分类名称', key: 'title',
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <Input
                value={this.state.subjectTitle}
                className='subject-input'
                onChange={this.handleTitleChange}>
              </Input>
            )
          }
          return <span>{value.title}</span>
        }
      },

      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: value => {
          if (this.state.subjectId === value._id) {
            return (
              <>
                <Button type='primary' className='update-btn' onClick={this.hadnleUpdate}>确认</Button>
                <Button type='danger' onClick={this.handleCancle}>取消</Button>
              </>
            )
          }
          return (

            //编辑
            <>
              <Tooltip title='更新课程分类'>
                <Button type='primary'
                  onClick={this.handleUpdateClick(value)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除课程分类'>
                <Button type='danger' className='item-btn'><DeleteOutlined /></Button>
              </Tooltip>
            </>
          )
        },
        width: 200
      },
    ];

    return (
      <>
        //新建一级菜单
        <div className="subject">
          <Button className='subject-btn' type='primary' icon={<PlusOutlined />} onClick={this.handleAdd}>新建</Button>
          <Table
            columns={columns}
            //有展开项
            expandable={{
              //使用此属性，
              // expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
              //判断是否有展开图标
              // rowExpandable: record => record.name !== 'Not Expandable',
              onExpand: this.handleClickExpand
            }}
            dataSource={this.props.subjectList.items}
            rowKey='_id'
            pagination={{
              total: this.props.subjectList.total, //total表示数据总数
              showQuickJumper: true, //是否显示快速跳转
              showSizeChanger: true, // 是否显示修改每页显示数据数量
              pageSizeOptions: ['5', '10', '15', '20'], //设置每天显示数据数量的配置项
              defaultPageSize: 5, //每页默认显示数据条数 默认是10,
              onChange: this.handleChange, //页码改变的时候触发,
              onShowSizeChange: this.ShowSizeChange, //一页展示几条数据变化时触发 current 当前页码, size 一页几条
              current: this.currentPage
            }}
          />
        </div>

      </>
    )
  }
}

export default Subject

