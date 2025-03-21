import { Button, Modal, Input, Pagination } from "antd";
import ModalDetail from "./Component/ModalDetail";
import { useState } from "react";

const list = [
  {
    id: 1,
    title: "Nhà Trọ 416/23 Dương Quảng Hàm",
    price: "4.5 triệu/tháng",
    acreage: "20",
    location: {
      id: 1,
      city: "TP Hồ Chí Minh",
      ward: "Gò Vấp",
      street: "416/23 Dương Quảng Hàm",
    },
    type: "Nhà trọ, phòng trọ",
    createAt: "12/2/2025",
    expdate: "12/3/2025",
    status: 1,
    payment: 1,
    package: 1,
    description: "Phúc ăn cứt",
    images: Array(4).fill({ id: 1, url: "../../src/assets/1.jpg" }),
  },
  // Thêm các bài đăng khác vào đây để kiểm tra phân trang
  ...Array.from({ length: 25 }, (_, i) => ({
    id: i + 2,
    title: `Nhà Trọ ${i + 2}`,
    price: `${3 + i}.5 triệu/tháng`,
    acreage: `${15 + i}`,
    location: {
      id: i + 2,
      city: "TP Hồ Chí Minh",
      ward: `Quận ${i + 1}`,
      street: `123 Nguyễn Văn Linh`,
    },
    type: "Nhà trọ, phòng trọ",
    createAt: "10/2/2025",
    expdate: "10/3/2025",
    status: 1,
    payment: 1,
    package: (i % 3) + 1,
    description: "Nhà trọ mới xây, thoáng mát",
    images: Array(3).fill({ id: i + 2, url: "../../src/assets/2.jpg" }),
  })),
];

const ListPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // State để lưu từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // State để lưu trang hiện tại
  const pageSize = 10; // Số lượng bài đăng hiển thị trên mỗi trang

  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getPostType = (item) => {
    return item === 1
      ? "Tin VIP nổi bật"
      : item === 2
      ? "Tin VIP 1"
      : item === 3
      ? "Tin VIP 2"
      : "Tin thường";
  };

  // Lọc danh sách dựa trên từ khóa tìm kiếm
  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Tính toán danh sách hiển thị trên trang hiện tại
  const paginatedList = filteredList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="fixed w-full z-30 bg-white shadow-[0_1px_5px_rgba(0,0,0,0.3)] top-[60px] pt-5 pb-5 pl-15">
        <h1 className="text-2xl font-bold">Danh sách tin đăng</h1>
        <div style={{ marginTop: "10px" }}>
          <Input
            placeholder="Tìm kiếm theo tên"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>
      </div>
      <div className="w-9/10 m-auto bg-white p-5 table-list-post mt-35 rounded-2xl">
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã tin</th>
              <th>Tiêu đề</th>
              <th>Địa chỉ</th>
              <th>Loại tin</th>
              <th>Gói đăng kí</th>
              <th>Tình trạng</th>
              <th>Ngày đăng bài</th>
              <th>Ngày hết hạn</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.length > 0 ? (
              paginatedList.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    {item.location.street}, {item.location.ward},{" "}
                    {item.location.city}
                  </td>
                  <td>{item.type}</td>
                  <td>{getPostType(item.package)}</td>
                  <td>
                    {item.status === 1 ? (
                      "Còn hạn"
                    ) : (
                      <span>
                        Hết hạn (
                        <a
                          href="/quan-ly/dang-bai-moi/thanh-toan"
                          className="text-blue-500 underline"
                        >
                          Gia hạn
                        </a>
                        )
                      </span>
                    )}
                  </td>
                  <td>{item.createAt}</td>
                  <td>{item.expdate}</td>
                  <td>
                    <button
                      className="text-blue-600 px-4 py-2"
                      onClick={() => showModal(item)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  
                  <img src="../../src/assets/empty.jpeg" alt="" className="w-1/5 m-auto"/>
                  <p className="text-base">Không có bài đăng nào </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Pagination
            current={currentPage}
            total={filteredList.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
        <div>
          <ModalDetail
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            selectedPost={selectedPost}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPosts;