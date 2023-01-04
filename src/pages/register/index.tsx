import React, { memo, useState } from 'react'
import { PlusOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Upload } from 'antd'
import { RegisterWrapper } from './style'
import {
  userRegister,
  userLogin,
  userRegisterAvatar
} from '@/services/api/login'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { incrementByUser } from '@/store/user-store'
import { IUserLoginRes } from '@/services/api/login/type'

export default memo(function Register() {
  let [fileList, setFileList] = useState([] as any)
  let [disabledRegister, setDisabledRegister] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values: any) => {
    if (!fileList.length) {
      message.error('请上传头像')
      return false
    }
    const { name, nickname, password } = values
    setDisabledRegister(true)
    try {
      const registerres = await userRegister({ name, nickname, password })
      if (registerres.status !== 200) {
        message.error('请检查信息是否填写正确')
        return false
      }
      const loginres: IUserLoginRes = await userLogin({ name, password })
      await Cookies.set('token', loginres.data!.token)
      dispatch(incrementByUser(loginres.data!))
      let file = fileList[0]
      file.filename = fileList[0].name
      file.mimetype = fileList[0].type
      const param = new FormData()
      param.append('avatar', file)
      const avatarres = await userRegisterAvatar(param)
      if (avatarres.status === 200) {
        message.success('注册成功，登录中。。。')
        navigate('/main')
      }
    } catch (error) {
      setDisabledRegister(false)
    }
  }

  const handleChange = (item: any) => {
    if (item.file.status === 'removed') {
      setFileList([])
    } else {
      setFileList([item.file])
    }
  }

  return (
    <RegisterWrapper>
      <div className="register-con">
        <Form
          name="normal_register"
          labelCol={{
            span: 4
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="账号"
            rules={[
              {
                required: true,
                message: '请输入账号'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item name="nickname" label="昵称">
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入昵称"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码'
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item name="avatar" label="头像">
            <Upload
              name="file"
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              className="avatar-uploader"
              onChange={handleChange}
              beforeUpload={() => {
                return false
              }}
            >
              {fileList.length === 0 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              ) : null}
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={disabledRegister}
            >
              注册并登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </RegisterWrapper>
  )
})
