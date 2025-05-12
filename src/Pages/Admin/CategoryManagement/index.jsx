import { useEffect, useState } from 'react';
import { Input, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { categoryService } from '../../../Utils/api';

const CategoryManagementPage = () => {
  const [searchText, setSearchText] = useState('');

  // Dữ liệu mẫu danh sách danh mục
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách danh mục:', error);
    }
  };
  fetchCategories();
}, []);
  const handleSearch = (value) => {
    setSearchText(value);
  };
  // Cột cho bảng danh mục
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số lượng tin đăng',
      dataIndex: 'postCount',
      key: 'postCount',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createAt',
      key: 'createAt',
    },
  ];

  // Lọc dữ liệu theo tìm kiếm và trạng thái
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch ;
  });

  return (
    <div style={{ padding: '24px' }}>
      {/* Thanh tìm kiếm và lọc */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <Input
          placeholder="Tìm kiếm theo tên danh mục"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
      </div>

      {/* Bảng danh sách danh mục */}
      <Table
        dataSource={filteredCategories}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};

export default CategoryManagementPage;