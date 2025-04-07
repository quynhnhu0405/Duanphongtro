import { CheckCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { packageService } from "../../../Utils/api";


const PriceList = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    packageService.getAll()
      .then(response => {
        const sortedPackages = response.data.sort((a, b) => a.level - b.level);
        setPackages(sortedPackages);
      })
      .catch(error => {
        console.error("Lỗi khi gọi API:", error);
      });
  }, []);

  return (
    <div>
      <table className="border-collapse w-[100%] border border-gray-300 price-list mt-10">
        <thead>
          <tr>
            <th className=""></th>
            <th className="p-3 bg-orange-600">
              Tin VIP Nổi Bật <br />
              ⭐️⭐️⭐️⭐️
            </th>
            <th className="p-3 bg-blue-800">
              Tin VIP 1 <br />
              ⭐️⭐️⭐️
            </th>
            <th className="p-3 bg-pink-800">
              Tin VIP 2 <br />
              ⭐️⭐️
            </th>
            <th className="p-3 bg-blue-400 ">Tin thường</th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td className="!font-normal !text-left">Giá ngày</td>
            {packages.map((pkg) => (
              <td key={pkg._id} className="p-25 px-3">
                <span className="fs-5-5 fw-medium">{pkg.priceday.toLocaleString()}₫</span>
                <br />
                <span className="font-thin">
                  (Tối thiểu {pkg.level === "4" ? "5" : "3"} ngày)
                </span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="!font-normal !text-left">Giá tuần</td>
            {packages.map((pkg) => (
              <td key={pkg._id} className="p-25 px-3">
                <span className="fs-5-5 fw-medium">{pkg.priceweek.toLocaleString()}₫</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="!font-normal !text-left">Giá tháng</td>
            {packages.map((pkg) => (
              <td key={pkg._id} className="p-25 px-3">
                <span className="fs-5-5 fw-medium">{pkg.pricemonth.toLocaleString()}₫</span>
              </td>
            ))}
          </tr>
          <tr>
            <td className="!font-normal !text-left">Màu sắc tiêu đề</td>
            <td className="text-orange-600">
              <span>MÀU CAM, IN HOA</span>
            </td>
            <td className="text-blue-600">
              <span>MÀU XANH, IN HOA</span>
            </td>
            <td className="text-pink-800">
              <span>MÀU TÍM, IN HOA</span>
            </td>
            <td className="text-blue-400 !font-normal">
              <span>Màu mặc định, viết thường</span>
            </td>
          </tr>
          <tr>
            <td className="!font-normal !text-left">Kích thước tin</td>
            <td className="!font-normal">Lớn</td>
            <td className="!font-normal">Lớn</td>
            <td className="!font-normal">Trung bình</td>
            <td className="!font-normal">Nhỏ</td>
          </tr>
          <tr>
            <td className="!font-normal !text-left">Hiển thị nút gọi điện</td>
            <td className="p-25 px-3">
              <CheckCircleFilled style={{ color: "green", fontSize: "20px" }} />
            </td>
            <td className="p-25 px-3">
              <CheckCircleFilled style={{ color: "green", fontSize: "20px" }} />{" "}
            </td>
            <td className="p-25 px-3">
              <CheckCircleFilled
                style={{ color: "#dadada", fontSize: "20px" }}
              />{" "}
            </td>
            <td className="p-25 px-3">
              <CheckCircleFilled
                style={{ color: "#dadada", fontSize: "20px" }}
              />{" "}
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="p-3">
              <Button
                className=""
                onClick={() =>
                  document
                    .getElementById("vip")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Xem demo
              </Button>
            </td>
            <td className="p-3">
            <Button
                className=""
                onClick={() =>
                  document
                    .getElementById("vip1")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Xem demo
              </Button>
            </td>
            <td className="p-3">
            <Button
                className=""
                onClick={() =>
                  document
                    .getElementById("vip2")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Xem demo
              </Button>
            </td>
            <td className="p-3">
            <Button
                className=""
                onClick={() =>
                  document
                    .getElementById("regular")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Xem demo
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PriceList;
