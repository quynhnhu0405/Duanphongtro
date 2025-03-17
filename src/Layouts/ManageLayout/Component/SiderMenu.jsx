import { FormOutlined, LogoutOutlined, ProfileOutlined, TagsOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider';

const item = [{
  label: "Đăng tin mới",
  key: '1',
  icon: <FormOutlined />,
  path: "/quan-ly/dang-tin-moi",
},
{
  label: "Danh sách tin đăng",
  key: '2',
  icon: <ProfileOutlined />,
  path: "/quan-ly/danh-sach-tin-dang",
},
{
  label: "Lịch sử thanh toán",
  key: '3',
  icon: <WalletOutlined />,
  path: "/quan-ly/lich-su-thanh-toan",
},
{
  label: "Bảng giá dịch vụ",
  key: '4',
  icon: <TagsOutlined />,
  path: "/bang-gia",
},
{
  label: "Quản lý tài khoản",
  key: '5',
  icon: <UserOutlined />,
  path: "/quan-ly/quan-ly-tai-khoan",
},
]

const SiderMenu = () => {
  return (
    <div className="fixed shadow-[1px_0_5px_rgba(0,0,0,0.3)] bg-white z-40" style={{ minHeight: "calc(100vh - 60px)" }}>
      <Sider className="manager-sider h-full">
        <div className="border-b border-b-gray-300 p-4 flex items-center">
          <div className="p-1 border border-gray-400 rounded-full">
            <Avatar src="https://random.imagecdn.app/500/150" className="!w-[60px] !h-[60px] "></Avatar>
          </div>
                  <div className="leading-5 ml-4">
            <p>Phucs</p>
            <p>0963767987</p>
            <p>Mã tài khoản: 123</p>
          </div>
        </div>
        <Menu mode="vertical" defaultSelectedKeys={["1"]}>
          {item.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <a href={item.path}>{item.label}</a>
            </Menu.Item>
          ))}
          <Menu.Item key="6" icon={<LogoutOutlined />} danger>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  )
}

export default SiderMenu;
