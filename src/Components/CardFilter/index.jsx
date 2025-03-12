import { RightOutlined } from "@ant-design/icons";
import { Card } from "antd";

const FilterCard = () => {
  return (
    <div className="filter-card">
      <Card title="Xem theo khoảng giá">
        <ul
          className="leading-7 text-sm"
          style={{
            columnCount: 2,
            columnGap: "20px",
            listStyle: "none",
          }}
        >
          <li className="col-6">
            <a className="text-black" href="/gia_den=1000000">
              <RightOutlined className="icon" />
              Dưới 1 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=1000000&amp;gia_den=2000000"
            >
              <RightOutlined className="icon" />
              Từ 1 - 2 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=2000000&amp;gia_den=3000000"
            >
              <RightOutlined className="icon" />
              Từ 2 - 3 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=3000000&amp;gia_den=5000000"
            >
              <RightOutlined className="icon" />
              Từ 3 - 5 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=5000000&amp;gia_den=7000000"
            >
              <RightOutlined className="icon" />
              Từ 5 - 7 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=7000000&amp;gia_den=10000000"
            >
              <RightOutlined className="icon" />
              Từ 7 - 10 triệu
            </a>
          </li>
          <li className="col-6">
            <a
              className="text-black"
              href="/gia_tu=10000000&amp;gia_den=15000000"
            >
              <RightOutlined className="icon" />
              Từ 10 - 15 triệu
            </a>
          </li>
          <li className="col-6">
            <a className="text-black" href="/gia_tu=15000000">
              <RightOutlined className="icon" />
              Trên 15 triệu
            </a>
          </li>
        </ul>
      </Card>
      <div className="mt-3 mb-3">
        <Card title="Xem theo diện tích">
          <ul
            className="leading-7 text-sm"
            style={{
              columnCount: 2,
              columnGap: "20px",
              listStyle: "none",
            }}
          >
            <li className="col-6">
              <a className="text-black" href="/dien_tich_den=20">
                <RightOutlined className="icon" />
                Dưới 20 m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                href="/dien_tich_tu=20&amp;dien_tich_den=30"
              >
                <RightOutlined className="icon" />
                Từ 20 - 30m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                href="/dien_tich_tu=30&amp;dien_tich_den=50"
              >
                <RightOutlined className="icon" />
                Từ 30 - 50m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                href="/dien_tich_tu=50&amp;dien_tich_den=70"
              >
                <RightOutlined className="icon" />
                Từ 50 - 70m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a
                className="text-black"
                href="/dien_tich_tu=70&amp;dien_tich_den=90"
              >
                <RightOutlined className="icon" />
                Từ 70 - 90m<sup>2</sup>
              </a>
            </li>
            <li className="col-6">
              <a className="text-black" href="/dien_tich_tu=90">
                <RightOutlined className="icon" />
                Trên 90m<sup>2</sup>
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default FilterCard;
