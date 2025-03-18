import { ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'

const NoteRegular = () => {
  return (
    <div>
      <div className="bg-yellow-50 border border-amber-200 mt-3 p-4 rounded-lg">
        <h1 className="text-sm font-bold text-amber-900 mb-2">
          {" "}
          <ExclamationCircleFilled
            className="mr-3"
            style={{ color: "red" }}
          />{" "}
          Tin thường 
        </h1>

        <p className="text-sm text-black">
          <span className="text-blue-500">Tin thường</span>
          , tiêu đề màu mặc định, viết thường. Hiển thị sau các tin VIP.
        </p>
      </div>
    </div>
  )
}

export default NoteRegular
