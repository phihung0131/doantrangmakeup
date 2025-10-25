import React from 'react';

import Divider from './Divider';

const Product = () => {
  const title = "Chuyên Cung Cấp Dịch Vụ";

  return (
    <section className={`bg-background py-8`} id="product">
      <div className={`container max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
          id="services"
        >
          {title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index > 2 ? 'text-primary font-display' : 'text-border font-display'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <Divider />
        <div className="flex flex-wrap items-center">
          {/* Ảnh - mobile hiện trước, desktop hiện bên phải */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 order-1 sm:order-2">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <img
                src="/assets/images/trang_diem_co_dau.jpeg"
                alt="Trang Điểm Cô Dâu"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Text - mobile hiện sau, desktop hiện bên trái */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 mt-6 sm:mt-20 order-2 sm:order-1">
            <h3 className="text-2xl sm:text-3xl text-gray-800 font-bold leading-tight mb-3 font-display">
              Trang Điểm Cô Dâu
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Mỗi cô dâu đều xứng đáng tỏa sáng trong ngày trọng đại nhất của cuộc đời.
              Với Đoan Trang Makeup, chúng tôi không chỉ tạo nên lớp trang điểm hoàn hảo,
              mà còn giúp bạn giữ được vẻ đẹp tự nhiên, trong trẻo và rạng rỡ suốt cả ngày dài.
              Phong cách trang điểm tinh tế, hài hòa với đường nét khuôn mặt sẽ giúp bạn thật tự tin trong từng khoảnh khắc.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          {/* Ảnh - bên trái desktop, trên mobile hiện trước */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 order-1 sm:order-1">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <img
                src="/assets/images/trang_diem_di_tiec.jpg"
                alt="Trang Điểm Đi Tiệc"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Nội dung - bên phải desktop, dưới mobile */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 mt-6 sm:mt-20 order-2 sm:order-2">
            <h3 className="text-2xl sm:text-3xl text-gray-800 font-bold leading-tight mb-3 font-display">
              Trang Điểm Đi Tiệc
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Dù là buổi tiệc sang trọng, sự kiện công ty hay buổi hẹn quan trọng,
              <strong> Đoan Trang Makeup </strong> sẽ giúp bạn thật nổi bật với phong cách trang điểm phù hợp.
              Chúng tôi mang đến vẻ đẹp rạng rỡ nhưng vẫn tinh tế, giúp bạn tự tin xuất hiện trước mọi ánh nhìn.
              Lớp nền mỏng nhẹ, bền màu và đôi mắt được nhấn nhá vừa đủ sẽ giúp bạn tỏa sáng suốt buổi tiệc.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          {/* Ảnh - mobile hiện trước, desktop hiện bên phải */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 order-1 sm:order-2">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-md">
              <img
                src="/assets/images/trang_diem_ngoai_canh.jpg"
                alt="Trang Điểm Ngoại Cảnh"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Text - mobile hiện sau, desktop hiện bên trái */}
          <div className="w-full sm:w-1/2 p-4 sm:p-6 mt-6 sm:mt-20 order-2 sm:order-1">
            <h3 className="text-2xl sm:text-3xl text-gray-800 font-bold leading-tight mb-3 font-display">
              Trang Điểm Ngoại Cảnh
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Chụp ảnh ngoại cảnh đòi hỏi lớp trang điểm vừa tự nhiên vừa bền màu dưới ánh sáng
              và thời tiết. <strong>Đoan Trang Makeup</strong> mang đến phong cách trang điểm
              trong suốt, tươi tắn và phù hợp với bối cảnh, giúp gương mặt bạn luôn rạng rỡ
              dù ở bất kỳ góc chụp nào. Lớp nền được xử lý nhẹ nhàng, mỏng mịn nhưng vẫn
              đảm bảo che phủ tốt, giúp bạn tự tin trong mọi khung hình ngoài trời.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Product;
