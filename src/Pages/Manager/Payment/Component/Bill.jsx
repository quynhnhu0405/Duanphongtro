import { Card } from "antd";

const Bill = ({ selectedPackage, packageType, totalDays, pricePerDay }) => {
  // Map loại tin đăng
  const packageMap = {
    "1": "Tin Nổi Bật",
    "2": "Tin VIP 1",
    "3": "Tin VIP 2",
    "4": "Tin VIP 3",
    "5": "Tin Thường"
  };

  // Map gói thời gian
  const timePackageMap = {
    "day": "Đăng theo ngày",
    "week": "Đăng theo tuần",
    "month": "Đăng theo tháng"
  };

  const totalPrice = totalDays * pricePerDay;

  return (
    <div className="mr-1 mb-6">
      <Card className="!bg-[#e9f6e9] w-full rounded-2xl mt-20 shadow-md !border-2 !border-green-900">
        <div className="text-xl font-black mb-3">Thanh toán</div>
        <table className="">
          <tbody>
            <tr>
              <td>Loại tin:</td>
              <td>{packageMap[selectedPackage]}</td>
            </tr>
            <tr>
              <td>Gói thời gian:</td>
              <td>{timePackageMap[packageType]}</td>
            </tr>
            <tr>
              <td>Đơn giá:</td>
              <td>{pricePerDay.toLocaleString()}₫/ngày</td>
            </tr>
            <tr>
              <td>Số ngày đăng:</td>
              <td>{totalDays} ngày</td>
            </tr>
            <tr>
              <td>Thành tiền:</td>
              <td className="fw-bold">{totalPrice.toLocaleString()}₫</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Bill;
