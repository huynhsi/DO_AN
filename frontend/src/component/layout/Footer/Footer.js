import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import StripeLogo from "../../../images/stripe_secure.webp";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>VỀ SHOP GIÀY</h4>
        <p>
          Giày Sneaker nam là mẫu giày đang được yêu thích, bán chạy nhất trên
          thị trường hiện nay. Giày thể thao luôn có 1 vị thế nhất định, vừa
          phong cách nổi bật, cá tính, lịch lãm mà còn bởi sự thuận tiện trong
          cách phối đồ cũng như là sự phù hợp cho mọi lứa tuổi, mọi giới tính .
        </p>
        {/* <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" /> */}
      </div>

      <div className="midFooter">
        <h1>SHOPES_SHOSE.</h1>
        <img src={StripeLogo} />
      </div>

      <div className="rightFooter">
        <h4> FOLLOW US</h4>
        <a>
          <InstagramIcon />
        </a>
        <a>
          <YouTubeIcon />
        </a>
        <a>
          <FacebookIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
