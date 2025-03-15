import "../../App.scss";
import ManagerHeader from "./Header"
import ManagerFooter from "./Footer"
import { Layout } from "antd";
import { Outlet } from "react-router";
function Manager() {
  return (
    <>
      <ManagerHeader />
      <Layout.Content className="mx-auto w-full">
        <div className="flex justify-between bodypage">
              <Outlet />
          <ManagerFooter />
          </div>
      </Layout.Content>
    </>
  )
}

export default Manager
