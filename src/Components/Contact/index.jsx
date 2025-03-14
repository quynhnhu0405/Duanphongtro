import { CustomerServiceOutlined, MessageOutlined, WhatsAppOutlined } from "@ant-design/icons"
import { Button, Card } from "antd"

const Contact = () => {
  return (
    <Card >
      <div className="lg:flex items-center">
        <img src="./src/assets/contact.jpg" className="w-1/2"></img>
        <div className="text-center leading-10 w-1/2">
        <CustomerServiceOutlined style={{ fontSize: "40px" }}/>
        <h3 className="text-3xl font-semibold mt-2 mb-2">Hỗ trợ chủ nhà đăng tin</h3>
        <p>Nếu bạn cần hỗ trợ đăng tin, vui lòng liên hệ số điện thoại bên dưới:</p>
        <Button color="danger" variant="solid " className="w-52 p-4">
          <a  target="_blank" rel="nofollow" href="tel:0785604557" className="font-bold text-base"><WhatsAppOutlined /> &nbsp; &nbsp; ĐT: 0785604557 </a>
        </Button>
        <br></br>
        <Button color="primary" variant="solid" className="w-52">
          <a target="_blank" rel="nofollow" href="https://zalo.me/0909316890" className="font-bold text-base"><MessageOutlined/> &nbsp; &nbsp; Zalo: 0785604557 </a>
        </Button>
        </div>
      </div>
    </Card>
  )
}

export default Contact
