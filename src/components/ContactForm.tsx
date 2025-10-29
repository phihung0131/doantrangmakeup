import React from 'react';

import { Form, Input, Select, Button, message } from 'antd';

const { Option } = Select;

const ContactForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await res.json();

      if (result.success) {
        message.success('💖 Gửi thông tin thành công! Chúng tôi sẽ liên hệ sớm nhất.');
        form.resetFields();
      } else {
        message.error('⚠️ Gửi thất bại, vui lòng thử lại sau.');
      }
    } catch (error) {
      message.error('❌ Kết nối Telegram thất bại, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-4">
      <h2
        className="w-full my-2 text-5xl font-bold leading-tight text-center font-display"
        id="contact"
      >
        Liên hệ Đoan Trang Makeup
      </h2>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-center">
        Đặt lịch trang điểm hoặc tư vấn phong cách phù hợp với bạn. Chúng tôi luôn sẵn sàng hỗ trợ!
      </p>
      <div className="flex justify-center p-4 sm:p-6 lg:p-10 rounded-2xl">
        <div className="w-full max-w-3xl">
          <Form form={form} onFinish={handleSubmit} className="w-full" layout="vertical">
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              className="mb-5"
            >
              <Input
                placeholder="Họ và tên"
                className="px-2 py-3 bg-white w-full text-border text-base border-0 border-b border-tertiary focus:border-primary outline-none transition hover:border-tertiary focus:shadow-none"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
              className="mb-5"
            >
              <Input
                placeholder="Số điện thoại"
                className="px-2 py-3 bg-white w-full text-border text-base border-0 border-b border-tertiary focus:border-primary outline-none transition hover:border-tertiary focus:shadow-none"
                style={{ borderRadius: 0 }}
              />
            </Form.Item>

            <Form.Item
              name="service"
              rules={[{ required: true, message: 'Vui lòng chọn gói dịch vụ' }]}
              className="mb-5"
            >
              <Select
                placeholder="Chọn gói dịch vụ"
                className="custom-select"
                style={{ width: '100%' }}
                dropdownStyle={{ fontFamily: 'inherit' }}
              >
                <Option value="co-dau">Trang Điểm Cô Dâu</Option>
                <Option value="di-tiec">Trang Điểm Đi Tiệc</Option>
                <Option value="ngoai-canh">Trang Điểm Ngoại Cảnh</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center justify-center w-full px-5 py-3 bg-primary hover:bg-secondary text-white font-medium text-base rounded-md transition-all duration-200 border-0 h-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  fill="#fff"
                  className="mr-2"
                  viewBox="0 0 548.244 548.244"
                >
                  <path
                    d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                    clipRule="evenodd"
                    data-original="#000000"
                  />
                </svg>
                Gửi liên hệ
              </Button>
            </Form.Item>
          </Form>

          <ul className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6">
            <li className="flex items-center text-primary justify-center sm:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                viewBox="0 0 479.058 479.058"
                className="flex-shrink-0"
              >
                <path d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z" />
              </svg>
              <a
                href="mailto:honguyendoantrang01@gmail.com"
                className="text-sm ml-3 font-medium break-all"
              >
                honguyendoantrang01@gmail.com
              </a>
            </li>
            <li className="flex items-center text-primary justify-center sm:justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="currentColor"
                viewBox="0 0 482.6 482.6"
                className="flex-shrink-0"
              >
                <path d="M98.339 320.8c47.6 56.9 104.9 101.7 170.3 133.4 24.9 11.8 58.2 25.8 95.3 28.2 2.3.1 4.5.2 6.8.2 24.9 0 44.9-8.6 61.2-26.3.1-.1.3-.3.4-.5 5.8-7 12.4-13.3 19.3-20 4.7-4.5 9.5-9.2 14.1-14 21.3-22.2 21.3-50.4-.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2-12.8 0-25.1 5.6-35.6 16.1l-35.8 35.8c-3.3-1.9-6.7-3.6-9.9-5.2-4-2-7.7-3.9-11-6-32.6-20.7-62.2-47.7-90.5-82.4-14.3-18.1-23.9-33.3-30.6-48.8 9.4-8.5 18.2-17.4 26.7-26.1 3-3.1 6.1-6.2 9.2-9.3 10.8-10.8 16.6-23.3 16.6-36s-5.7-25.2-16.6-36l-29.8-29.8c-3.5-3.5-6.8-6.9-10.2-10.4-6.6-6.8-13.5-13.8-20.3-20.1-10.3-10.1-22.4-15.4-35.2-15.4-12.7 0-24.9 5.3-35.6 15.5l-37.4 37.4c-13.6 13.6-21.3 30.1-22.9 49.2-1.9 23.9 2.5 49.3 13.9 80 17.5 47.5 43.9 91.6 83.1 138.7z" />
              </svg>
              <a href="tel:0966102259" className="text-sm ml-3 font-medium">
                0966 102 259
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="z-10 relative h-64 sm:h-80 lg:h-full lg:min-h-[400px] rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.02708812024!2d108.39820127508263!3d11.76314264021917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317140ecff3e5d07%3A0x4273d99cc1159584!2zxJDhuqFpIEzDvSBU4buVbmcgSOG7o3AgTOG7hyBQaMaw4budbmc!5e0!3m2!1svi!2s!4v1761388514497!5m2!1svi!2s"
            className="left-0 top-0 h-full w-full"
            frameBorder="0"
            allowFullScreen
            title="Bản đồ địa chỉ"
          ></iframe>
        </div> */}
      </div>

      {/* <style jsx>{`
        .custom-select :global(.ant-select-selector) {
          padding: 12px 8px !important;
          background: white !important;
          border: none !important;
          border-bottom: 1px solid var(--color-tertiary) !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          font-size: 1rem !important;
          color: var(--color-border) !important;
        }

        .custom-select :global(.ant-select-selector:hover),
        .custom-select :global(.ant-select-focused .ant-select-selector) {
          border-bottom-color: var(--color-primary) !important;
          box-shadow: none !important;
        }

        .custom-select :global(.ant-select-selection-placeholder) {
          color: var(--color-tertiary) !important;
        }
      `}</style> */}
    </div>
  );
};

export default ContactForm;
