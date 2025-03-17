import { Card, Col, Row } from "antd";

const OutstandingFeatures = () => {
  return (
    <div className="!mt-6 ">
      <Card className="bg-white w-full rounded-2xl mt-20 shadow-[0_1px_5px_rgba(0,0,0,0.3)] !p-4">
        <div className="text-xl font-black mb-4">Đặc điểm nổi bật</div>
        <div>
          <Row>
            <Col lg={8} className="items-center">
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="full_noi_that"
                  type="checkbox"
                  id="dac-diem-day-du-noi-that"
                />
                <label
                  className="form-check-label"
                  forHtml="dac-diem-day-du-noi-that"
                >
                  Đầy đủ nội thất
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="gac"
                  type="checkbox"
                  id="dac-diem-co-gac"
                />
                <label className="form-check-label" forHtml="dac-diem-co-gac">
                  Có gác
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="ke_bep"
                  type="checkbox"
                  id="dac-diem-ke-bep"
                />
                <label className="form-check-label" forHtml="dac-diem-ke-bep">
                  Có kệ bếp
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="may_lanh"
                  type="checkbox"
                  id="dac-diem-may-lanh"
                />
                <label className="form-check-label" forHtml="dac-diem-may-lanh">
                  Có máy lạnh
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="may_giat"
                  type="checkbox"
                  id="dac-diem-may-giat"
                />
                <label className="form-check-label" forHtml="dac-diem-may-giat">
                  Có máy giặt
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="tu_lanh"
                  type="checkbox"
                  id="dac-diem-tu-lanh"
                />
                <label className="form-check-label" forHtml="dac-diem-tu-lanh">
                  Có tủ lạnh
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="thang_may"
                  type="checkbox"
                  id="dac-diem-thang-may"
                />
                <label
                  className="form-check-label"
                  forHtml="dac-diem-thang-may"
                >
                  Có thang máy
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="khong_chung_chu"
                  type="checkbox"
                  id="dac-diem-khong-chung-chu"
                />
                <label
                  className="form-check-label"
                  for="dac-diem-khong-chung-chu"
                >
                  Không chung chủ
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="tu_do"
                  type="checkbox"
                  id="dac-diem-gio-giac-tu-do"
                />
                <label
                  className="form-check-label"
                  forHtml="dac-diem-gio-giac-tu-do"
                >
                  Giờ giấc tự do
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="bao_ve"
                  type="checkbox"
                  id="dac-diem-co-bao-ve"
                />
                <label
                  className="form-check-label"
                  forHtml="dac-diem-co-bao-ve"
                >
                  Có bảo vệ 24/24
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="ham_de_xe"
                  type="checkbox"
                  id="dac-diem-ham-de-xe"
                />
                <label
                  className="form-check-label"
                  forHtml="dac-diem-ham-de-xe"
                >
                  Có hầm để xe
                </label>
              </div>
            </Col>
            <Col lg={8}>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  name="features[]"
                  value="ban_cong"
                  type="checkbox"
                  id="dac-diem-ban-cong"
                />
                <label className="form-check-label" forHtml="dac-diem-ban-cong">
                  Có ban công
                </label>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default OutstandingFeatures;
