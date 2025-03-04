import { Layout } from 'antd'
import { Outlet } from 'react-router'
import DefaultHeader from '../../Components/Layout/Header'
import DefaultFooter from '../../Components/Layout/Footer'
import NewPost from '../../Components/NewPost'
import Contact from '../../Components/Contact'

const DefaultLayout = () => {
  return (
    <Layout>
        <DefaultHeader />
        <Layout.Content className='container mx-auto'>
            <div className='flex justify-between mx-28 mt-3'>
              <div className='w-8/12 p-4'>
                <Outlet />
              </div>
              <div className='w-4/12 p-4'>
                <NewPost />
              </div>
            </div>
            <div className='mx-28 mt-3 p-4 pb-24'>
              <Contact/>
            </div>
        </Layout.Content>
        <DefaultFooter />
    </Layout>
  )
}

export default DefaultLayout
