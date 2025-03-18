import { Card, Col, Row } from "antd";

const Category = ({ onValidate }) => {

  const handleValidation = () => {
    const selectElement = document.getElementById("category");
    if (!selectElement || !selectElement.value) {
      onValidate(false);
      return false;
    }
    onValidate(true);
    return true;
  };
  return (
    <div className="!mb-6 ">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-3">Loại chuyên mục</div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-2">
              <label
                className="form-label mb-1 d-block text-base"
                htmlFor="loai_chuyen_muc"
              >
                Loại chuyên mục <span className="text-red-500">(*)</span>
              </label>
              <br />
              <Row>
                <Col lg={12} md={12} sm={24} xs={24} className="pr-2">
                  <select
                    className="p-3 mt-3 w-full border border-gray-300 rounded-2xl focus:border-black focus:border-1"
                    id="category"
                    name="loai_chuyen_muc"
                    required=""
                    data-msg-required="Chưa chọn loại chuyên mục"
                    onChange={handleValidation} 
                  >
                    <option value="" selected="">
                      -- Chọn loại chuyên mục --
                    </option>
                    <option value="1">Phòng trọ, nhà trọ</option>
                    <option value="3">Cho thuê căn hộ</option>
                    <option value="4">Tìm người ở ghép</option>
                  </select>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Category;
