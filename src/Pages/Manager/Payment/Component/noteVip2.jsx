import { ExclamationCircleFilled } from "@ant-design/icons";
import React from "react";

const NoteVip2 = () => {
  return (
    <div>
      <div className="bg-yellow-50 border border-amber-200 mt-3 p-4 rounded-lg">
        <h1 className="text-sm font-bold text-amber-900 mb-2">
          {" "}
          <ExclamationCircleFilled
            className="mr-3"
            style={{ color: "red" }}
          />{" "}
          Tin VIP 2 ⭐️⭐️ 
        </h1>

        <p className="text-sm text-black">
          <span className="text-pink-800 font-black">TIÊU ĐỀ IN HOA MÀU TÍM</span>, gắn biểu tượng 2 ngôi sao màu
          vàng ở tiêu đề tin đăng. Hiển thị sau tin VIP Nổi Bật, Tin VIP 1 và
          trên các tin khác.
        </p>
      </div>
    </div>
  );
};

export default NoteVip2;
