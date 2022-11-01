import React from "react";
import "./documentPage.css";
import chonsize1 from "../../images/chonsize1.jpg";
import chonsize2 from "../../images/chonsize11.jpg";
import chonsize3 from "../../images/chonsize2.jpg";
import chonsize4 from "../../images/chonsize3.jpg";
import chonsize5 from "../../images/chonsize4.jpg";
import chonsize6 from "../../images/chonsize5.jpg";
import chonsize7 from "../../images/chonsize6.jpg";
import chonsize8 from "../../images/chonsize7.jpg";
import chonsize9 from "../../images/chonsize8.jpg";
import chonsize10 from "../../images/chonsize9.jpg";
import chonsize11 from "../../images/chonsize10.jpg";

const DocumentPage = () => {
  return (
    <div className="document--page">
      <h3>Hướng dẫn chọn size giày chuẩn phù hợp với mọi đôi chân</h3>
      <p>
        Chọn giày sao cho vừa và thoải mái bàn chân khi đi đứng là vấn đề của
        không chỉ riêng ai. Sau đây hãy cùng tham khảo cách chọn size giày phù
        hợp với đôi chân của mình nhé!
      </p>
      <h4>Bước 1: Cố định kích thước chân trên giấy</h4>
      <img src={chonsize1} />

      <h4>Bước 2: Đo chiều dài chân</h4>
      <img src={chonsize3} />
      <p>
        Sau khi vẽ được khung tổng thể của bàn chân, bạn dùng bút chấm hai điểm
        ở đầu ngón chân và hai điểm ở cuối gót chân. Dùng thước đo lại chiều dài
        của hai điểm này.
      </p>

      <h4>Bước 3: Đo chiều rộng chân</h4>
      <img src={chonsize4} />
      <p>
        {" "}
        Tương tự, bạn dùng thước hoặc một sợi dây để đo chiều rộng bàn chân. Bạn
        có thể linh hoạt chọn phần nào rộng nhất của bàn chân để đo kích thước
        chiều rộng. Lưu ý khi đo nên để chân đặt ở nền bằng phẳng, tốt nhất nên
        ở tư thế ngồi thẳng.
      </p>

      <h4>Bước 4: Tính kết quả</h4>
      <p>
        {" "}
        Sau khi có kết quả của chiều dài và chiều rộng bàn chân, bạn lấy chỉ lấy
        chiều dài + 1,5cm, cụ thể: Cỡ giày = N = L (Chiều dài / chiều rộng bàn
        chân) +1.5cm Cuối cùng, đối chiếu kết quả với bảng quy đổi size giày
        dưới đây. Vậy là sau một vài bước làm đơn giản, bạn đã có thể tự tin
        chọn size giày phù hợp nhất với đôi chân của mình rồi đấy!{" "}
      </p>

      <p>
        Vd: Nếu bạn đo chiều dài của mình là 22.5cm thì giày của bạn cần cộng
        thêm 1.5 cm sẽ là 24cm. Sau đó bạn so sánh cột cm (ở bảng quy đổi giày
        mục 3) để tìm ra được cỡ giày bạn là 38- 39 (size Việt Nam), size UK là
        7 và size US là 8.
      </p>

      <h3>Những lưu ý khi đo chân chọn size giày</h3>
      <p>
        Đo kích thước chân trong trạng thái cân bằng nhất, có thể ở tư thế ngồi
        thẳng hoặc cân bằng, không xiêu vẹo hay di chuyển quá nhiều trong lúc
        đo.
      </p>
      <p>
        Đo kích thước ở cả hai bàn chân, vì hai chân không bằng nhau do đó nên
        đo cả hai bên để nhận thấy bên nào kích thước lớn hơn thì dùng bên đó
        làm kết quả đo.
      </p>
      <img src={chonsize2} />

      <h3>Bảng Quy đổi giày cho nam nữ</h3>
      <p>Bảng quy đổi size giày đối với nam</p>
      <img src={chonsize5} />

      <p>Bảng quy đổi giày đối với nữ</p>
      <img src={chonsize6} />

      <p>
        Trên đây là các bước đo size giày và những bảng quy đổi size giày mà bạn
        nên biết. Hy vọng với những gợi ý trên, việc mua giày online mà không
        cần thử sẽ khiến các bạn an tâm và ưng ý hơn.
      </p>
    </div>
  );
};

export default DocumentPage;
