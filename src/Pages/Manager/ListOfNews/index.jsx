import { Button, Input, Pagination, Table, Spin, Tag, message } from "antd";
import ModalDetail from "./Component/ModalDetail";
import { useEffect, useState, useMemo } from "react";
import { postService } from "../../../Utils/api";
import { useAuth } from "../../../Utils/AuthContext";
import emptyImage from "public/empty.jpeg";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const ListPosts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const pageSize = 10;
  const navigate = useNavigate();

  const navigateToRenewPage = (post) => {
    navigate("/quan-ly/dang-bai-moi/thanh-toan", {
      state: {
        postData: {
          _id: post._id,
          title: post.title,
          price: post.price,
          area: post.area,
          location: post.location,
          description: post.description,
          images: post.images,
          category: post.category,
          packageDetails: post.packageDetails,
          status: post.status,
          createdAt: post.createdAt,
          expiryDate: post.expiryDate,
          utilityDetails: post.utilityDetails,
        },
      },
    });
  };
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getMyPosts();
      // Ensure we have the data array
      setList(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  //Xóa bài đăng
  const handleDelete = async (id) => {
    try {
      const response = await postService.hiddenPost(id);
      if (response.status === 200) {
        message.success("Tin đăng đã được ẩn.");
        await fetchPosts();
      } else {
        message.error("Không thể ẩn tin đăng.");
      }
    } catch (error) {
      console.error("Lỗi khi ẩn tin đăng:", error);
      message.error("Có lỗi xảy ra khi ẩn tin đăng.");
    }
  };
  const showModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const filteredList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    return list.filter((item) =>
      item?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [list, searchText]);

  const paginatedList = useMemo(() => {
    return filteredList.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredList, currentPage]);

  const getPostType = (pkgDetails) => {
    return pkgDetails?.[0]?.name || "Không xác định";
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },

    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 180,
      ellipsis: true
    },    
    {
      title: "Địa chỉ",
      key: "address",
      width: 180,
      ellipsis: true,
      render: (_, record) =>
        `${record.location?.street || ""}, ${record.location?.ward || ""}, ${
          record.location?.district || ""
        }`,
    },
    {
      title: "Loại tin",
      key: "category",
      render: (_, record) => record.category?.name || "Không xác định",
    },
    {
      title: "Gói đăng ký",
      key: "package",
      render: (_, record) => getPostType(record.packageDetails),
    },
    {
      title: "Tình trạng",
      key: "status",
      width: 150,
      render: (_, record) =>{
        switch (record.status) {
          case "available":
            return <Tag color='green'>Còn hạn</Tag>;
          case "expired":
            return (
              <span>
            <Tag color='red'>Hết hạn</Tag>
            <Button
              type="link"
              onClick={() => navigateToRenewPage(record)}
              className="text-blue-500 underline !p-0"
            >
              (Gia hạn)
            </Button>
          </span>
            );
          case "unpaid":
              return <Tag color='blue'>Chưa thanh toán</Tag>;
          default:
            return <Tag color='gray'>Chờ xác nhận</Tag>;
          }
      }
        
    },
    {
      title: "Ngày đăng",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiryDate",
      key: "expiryDate",
      width: 120,
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Chi tiết",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          Xem chi tiết
        </Button>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleDelete(record._id)}>
          Xóa
        </Button>
      ),
    }
  ];

  return (
    <div className="container mx-auto">
      <div className="sticky top-[60px] z-30 bg-white shadow-md py-5 px-15">
        <h1 className="text-2xl font-bold">Danh sách tin đăng</h1>
        <div className="mt-2.5">
          <Input.Search
            placeholder="Tìm kiếm theo tên"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </div>
      </div>

      <div className="w-[90%] mx-auto bg-white p-5 rounded-2xl shadow-sm mt-12">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={paginatedList}
              rowKey="_id"
              scroll={{ x: 1200 }}
              pagination={false}
              locale={{
                emptyText: (
                  <div className="py-10">
                    <img
                      src={emptyImage}
                      alt="No data"
                      className="w-1/5 mx-auto"
                    />
                    <p className="text-base mt-4">Không có bài đăng nào</p>
                  </div>
                ),
              }}
            />

            <div className="mt-5 flex justify-end">
              <Pagination
                current={currentPage}
                total={filteredList.length}
                pageSize={pageSize}
                onChange={setCurrentPage}
                showSizeChanger={false}
              />
            </div>
          </>
        )}

        <ModalDetail
          isModalOpen={isModalOpen}
          handleOk={handleCloseModal}
          selectedPost={selectedPost}
          handleCancel={handleCloseModal}
          handleDelete={handleDelete}
          fetchPosts={fetchPosts}
        />
      </div>
    </div>
  );
};

export default ListPosts;
