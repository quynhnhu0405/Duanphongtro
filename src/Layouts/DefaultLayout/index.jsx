import { Layout } from 'antd'
import React from 'react'
import DefaultHeader from './Header'
import DefaultFooter from './Footer'
import { Outlet } from 'react-router'

const DefaultLayout = () => {
  return (
    <Layout>
        <DefaultHeader />
        <Layout.Content>
            <Outlet />
        </Layout.Content>
        <DefaultFooter />
    </Layout>
  )
}

export default DefaultLayout
