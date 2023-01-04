import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { PieChartOutlined, BarsOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router'
import { RouteObject } from './type'

const Login = React.lazy(() => import('@/pages/login'))
const Register = React.lazy(() => import('@/pages/register'))
const Layout = React.lazy(() => import('@/pages/Layout'))
const Recommend = React.lazy(() => import('@/pages/recommend'))
const Product = React.lazy(() => import('@/pages/product'))
const NotFound = React.lazy(() => import('@/pages/notfound'))
const Personal = React.lazy(() => import('@/pages/personal'))
const Main = React.lazy(() => import('@/pages/main'))
const Amend = React.lazy(() => import('@/pages/amend'))

const routes: RouteObject[] = [
  {
    path: '/',
    auth: true,
    element: <Navigate to="/main" />
  },
  {
    path: '/',
    element: <Layout />,
    auth: true,
    children: [
      {
        path: '/main',
        auth: true,
        element: <Main />,
        meta: {
          icon: <PieChartOutlined />,
          key: '/main',
          label: <NavLink to="/main">首页</NavLink>
        }
      },
      {
        path: '/product',
        auth: true,
        meta: {
          label: <NavLink to="/product/list">商品列表</NavLink>,
          key: '/product',
          icon: <BarsOutlined />
        },
        element: <Outlet />,
        children: [
          {
            path: '/product/list',
            element: <Product />,
            auth: true,
            meta: {
              key: '/product/list',
              label: <NavLink to="/product/list">商品列表</NavLink>
            }
          },
          {
            path: '/product/recommend',
            element: <Recommend />,
            auth: true,
            meta: {
              key: '/product/recommend',
              label: <NavLink to="/product/recommend">新增商品</NavLink>
            }
          },
          {
            path: '/product/amend',
            element: <Amend />,
            auth: true,
            meta: {
              key: '/product/amend',
              label: <NavLink to="/product/amend">修改商品</NavLink>
            }
          }
        ]
      },
      {
        path: '/personal',
        auth: true,
        element: <Personal />,
        meta: {
          icon: <PieChartOutlined />,
          key: '/personal',
          label: <NavLink to="/personal">个人中心</NavLink>
        }
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/404',
    element: <NotFound />
  }
]

export default routes
