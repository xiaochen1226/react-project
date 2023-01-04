import React, { memo, useEffect, useState } from 'react'
import { LeftMenuWrapper } from './style'
import { useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import routes from '@/router/index'

export default memo(function LeftMenuComponent() {
  const { pathname } = useLocation()
  const [items, setItems] = useState()
  const [selectKeys, setSeleceKeys] = useState([])

  const getRoute = () => {
    const a: any = routes.find((item) => item.children)

    let items: any = []
    a.children.forEach((item: any, index: any) => {
      if (item.children) {
        items.push({ ...item.meta, children: [] })
        item.children.forEach((i: any) => {
          items[index].children.push(i.meta)
        })
      } else {
        items.push(item.meta)
      }
    })
    setItems(items)
  }

  useEffect(() => {
    getRoute()
    setSeleceKeys([pathname] as any)
  }, [pathname])

  const onClick = () => {}

  return (
    <LeftMenuWrapper>
      <Menu
        onClick={onClick}
        style={{
          width: 256
        }}
        selectedKeys={selectKeys}
        defaultOpenKeys={['/product']}
        mode="inline"
        items={items}
      />
    </LeftMenuWrapper>
  )
})
