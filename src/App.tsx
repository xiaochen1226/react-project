import React, { memo, Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { persistor } from '@/store'
import cn from 'antd/es/locale/zh_CN'
import store from '@/store'
import { RouterGurad } from '@/router/gurad'
import routes from '@/router'

function RouteElement() {
  const element = RouterGurad(routes)

  return element
}

export default memo(function App() {
  return (
    <ConfigProvider locale={cn}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter>
            <Suspense
              fallback={
                <div
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.75)', //修改Spin原来的背景颜色
                    minHeight: '100vh', //使其为整个页面高度
                    position: 'fixed',
                    width: '100%'
                  }}
                >
                  <Spin tip="Loading..." />
                </div>
              }
            >
              <RouteElement />
            </Suspense>
          </HashRouter>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  )
})
