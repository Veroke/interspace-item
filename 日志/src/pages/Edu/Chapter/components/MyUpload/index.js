import React, { Component } from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
export default class MyUpload extends Component {
  render () {
    return (
      <>
        <Upload>
          <Button>
            <UploadOutlined /> 上传视频
              </Button>
        </Upload>
      </>
    )
  }
}
