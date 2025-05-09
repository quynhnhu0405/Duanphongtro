import { useEffect, useState, useMemo } from "react";
import { Table, Spin, Tag, Input, Pagination } from "antd";
import { paymentService } from "../../../Utils/api";
import dayjs from "dayjs";
const HistoryPayment = () => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const pageSize = 10;

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getUserPayments();
      setList(response?.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setList([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(list);

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredList = useMemo(() => {
    if (!Array.isArray(list)) return [];
    return list.filter((item) =>
      item?.PostId?.title?.toLowerCase().includes(searchText.toLowerCase())
    );    
  }, [list, searchText]);

  const paginatedList = useMemo(() => {
    return filteredList.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filteredList, currentPage]);

  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã thanh toán",
      dataIndex: "_id",
      key: "_id",
      ellipsis: true,
    },
    {
      title: "Bài đăng",
      key: "PostId.title",
      ellipsis: true,
      render: (_, record) => record.PostId?.title || "Không xác định",
    },    
    {
      title: "Tổng tiền",
      render: (_, record) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.total),
    },
    {
      title: "Tình trạng",
      key: "status",
      render: (_, record) => {
        switch (record.status) {
          case "completed":
            return <Tag color="green">Đã thanh toán</Tag>;
          case "unpaid":
            return <Tag color="red">Chưa thanh toán</Tag>;
          default:
            return <Tag color="gray">Chờ xác nhận</Tag>;
        }
      },
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="sticky top-[60px] z-30 bg-white shadow-md py-5 px-15">
        <h1 className="text-2xl font-bold">Lịch sử thanh toán</h1>
        <div className="mt-2.5">
          <Input.Search
            placeholder="Tìm kiếm theo tên bài đăng"
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
              scroll={{ x: 1000 }}
              pagination={false}
              locale={{
                emptyText: (
                  <div className="py-10">
                    <img
                      src="empty.jpeg"
                      alt="No data"
                      className="w-1/5 mx-auto"
                    />
                    <p className="text-base mt-4">Không có thanh toán nào</p>
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
      </div>
    </div>
  );
};

export default HistoryPayment;
