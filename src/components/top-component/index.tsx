import React, { memo, useRef } from 'react'
import { TopComWrapper } from './style'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space, Avatar } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { storeUser } from '@/store/user-store'
import type { MenuProps } from 'antd'
import Cookies from 'js-cookie'

export default memo(function TopComponent() {
  const navigate = useNavigate()
  const userId = useSelector(storeUser)
  const avatarUrl = useRef(`/merchant/${userId}/avatar`)

  const loginOut = (e: any) => {
    e.preventDefault()
    Cookies.set('token', '')
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      label: <NavLink to="/personal">主页</NavLink>,
      key: '0'
    },
    {
      label: (
        <NavLink to="" onClick={(e) => loginOut(e)}>
          退出登录
        </NavLink>
      ),
      key: '1'
    }
  ]

  return (
    <TopComWrapper>
      <h2>后台管理系统</h2>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space>
          <Avatar src={avatarUrl.current} />
          <DownOutlined />
        </Space>
      </Dropdown>
    </TopComWrapper>
  )
})
