import React from "react";
import "./aboutPage.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";

const AboutPage = () => {
  return (
    <div className="about--page">
      <div className="about--info">
        <h1>LIÊN HỆ</h1>
        <h4>Tên cửa hàng: SHOE-SHOP</h4>
        <p>
          SHOE_SHOP chuyên cung cấp giày thể thao các loại, bao gồm các thương
          hiệu nổi tiếng, hiện đại và phù hợp với nhiều đối tượng khách
          hàng:,...
        </p>
        <p>
          Địa chỉ: KTX khu B - Trường Đại học Cần Thơ. Xuân Khách, Ninh Kiều,
          Cần Thơ
        </p>
        <span>
          {" "}
          <LocalPhoneIcon /> Điện thoại di động: 0981826065
        </span>{" "}
        <br />
        <span>
          {" "}
          <LocalPhoneIcon /> Điện thoại tư vấn: 098182605
        </span>{" "}
        <br />
        <span>
          {" "}
          <EmailIcon /> Email:huynhsi@gmail.com
        </span>{" "}
        <br />
        <span>
          {" "}
          <FacebookIcon /> Facebook: http://www.facebook/shoeshop/
        </span>
      </div>

      <div className="about--map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15715.621750883794!2d105.76017056899519!3d10.024661885346998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1666606635534!5m2!1svi!2s"
          width="800"
          height="600"
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutPage;
