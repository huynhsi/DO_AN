import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name} 's Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={`../images/${user.avatar && user.avatar.url}`}
                alt={user.name}
              />
              <Link to="/me/update">Sửa Thông Tin Người Dùng</Link>
            </div>
            <div>
              <div>
                <h4>Tên Người Dùng</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Ngày sinh</h4>
                <p>{String(user.birthday).substr(0, 10)}</p>
              </div>
              <div>
                <h4>Số điện thoại</h4>
                <p>{user.phone}</p>
              </div>
              <div>
                <h4>Ngày Tạo</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div>
                <Link to="/orders">Lịch sử đặt hàng</Link>
                <Link to="/password/update">Đổi mật khẩu</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
