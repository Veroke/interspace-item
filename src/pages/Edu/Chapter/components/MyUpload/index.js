import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { reqGetQiniuToken } from '@api/edu/lesson'

import { nanoid } from 'nanoid'
import * as qiniu from 'qiniu-js'

export default class MyUpload extends Component {
  //MAX_VIDEO_SIZE
  constructor() {
    super()
    const str = localStorage.getItem('upload_token')
    console.log(str)
    if (str) {
      const res = JSON.parse(str)
      this.state = {
        expires: res.expires,
        uploadToken: res.uploadToken
      }
    } else {
      this.state = {
        expires: 0,
        uploadToken: ''

      }
    }
  }

  handlebeforeUpload = (file, fileList) => {

    const MAX_VIDEO_SIZE = 20 * 1024 * 1024
    return new Promise(async (resolve, reject) => {
      if (file > MAX_VIDEO_SIZE) {
        message.error('文件过大，请重新上传')
        reject('视频太大,不能超过20m')
        return
      }

      // resolve(file)
      if (Date.now() > this.state.expires) {
        const { uploadToken, expires } = await reqGetQiniuToken()
        console.log(uploadToken)
        this.saveUploadToken(uploadToken, expires)
      }
      resolve(file)
    })
  }

  //存储uploadToken和过期时间
  saveUploadToken = (uploadToken, expires) => {
    // 1、发送请求获取数据
    const targetTiem = Date.now() + expires * 1000 - 2 * 60 * 1000
    expires = targetTiem
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('update_token', upload_token)
    this.setState = ({
      uploadToken,
      expires
    })
    // 2、存储到本机缓存中
    //localStorage不能存储对象。只能传字符串
    //判断本地缓存是否有token，若有，判断是否过期
    // 3、存储到state中
  }

  //存储uploadToken和过期时间
  saveUploadToken = (uploadToken, expires) => {
    // 1、发送请求获取数据
    const targetTiem = Date.now() + expires * 1000
    expires = targetTiem
    const upload_token = JSON.stringify({ uploadToken, expires })
    localStorage.setItem('upload_token', upload_token)
    this.setState = ({
      uploadToken,
      expires

    })
    // 2、存储到本机缓存中
    //localStorage不能存储对象。只能传字符串
    //判断本地缓存是否有token，若有，判断是否过期
    // 3、存储到state中
  }

  handleCustomRequest = (value) => {
    console.log(value)
    console.log(this.state.uploadToken)
    const file = value.file
    const key = nanoid() + '-xqw'
    const token = this.state.uploadToken
    const putExtra = {
      mimeType: "video/*",
    }
    const config = { region: qiniu.region.z2 }
    const observable = qiniu.upload(file, key, token, putExtra, config)
    const observer = {
      next (res) {
        // ...
        value.onProgress(res.total)
      },
      error (err) {
        // ...
      },
      complete: (res) => {
        console.log(key)
        value.onSuccess(res)
        this.props.onChange('http://qdcdb1qpp.bkt.clouddn.com/' + res.key)
      }
    }
    this.subscription = observable.subscribe(observer) // 上传开始
  }
  componentWillUnmount () {
    this.subscription && this.subscription.unsubscribe()
  }

  render () {
    return (
      <>
        <Upload
          beforeUpload={this.handlebeforeUpload}
          customRequest={this.handleCustomRequest}
          accept='video/*'
        >
          <Button>
            <UploadOutlined /> 上传视频
              </Button>
        </Upload>
      </>
    )
  }
}