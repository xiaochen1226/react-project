import React, { memo } from 'react'
import { LayoutWrapper } from './style'
import TopComponent from '@/components/top-component'
import LeftMenuComponent from '@/components/leftmenu-component'
import BottomComponent from '@/components/bottom-component'
import { Outlet } from 'react-router'

export default memo(function Layout() {
  return (
    <LayoutWrapper>
      <TopComponent />
      <div className="common">
        <LeftMenuComponent />
        <div className="content">
          <Outlet />
        </div>
      </div>
      <BottomComponent />
    </LayoutWrapper>
  )
})
