import React, { memo } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { LoginWrapper } from './style'
import { userLogin } from '@/services/api/login'
import { IUserLoginRes, IUserLoginData } from '@/services/api/login/type'
import { incrementByUser } from '@/store/user-store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

export default memo(function Login() {
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    userLogin(values).then((res: IUserLoginRes) => {
      const data = res.data as IUserLoginData
      message.success(res.msg)
      Cookies.set('token', data.token)
      dispatch(incrementByUser(data))
      navigate('/main')
    })
  }

  const navigate = useNavigate()
  const toRegister = () => {
    navigate('/register')
  }

  return (
    <LoginWrapper>
      <div className="login-con">
        <Form
          name="normal_login"
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
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 4,
              span: 16
            }}
          >
            <Checkbox>七天免登录</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button
              onClick={(e) => toRegister()}
              className="register-form-button"
            >
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
})
