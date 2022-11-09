import React, { Fragment, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, login, register } from "../../actions/userAction";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ava from "../../images/Profile.png";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [birthday, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState([]);

  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("birthday", birthday);
    myForm.set("phone", phone);
    myForm.set("password", password);
    Object.values(avatar).forEach((image) => {
      myForm.append("file", image);
    });
    dispatch(register(myForm));
  };

  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setAvatarPreview(reader.result);
  //         setAvatar(reader.result);
  //       }
  //     };

  //     reader.readAsDataURL(e.target.files[0]);
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };

  const change = (e) => {
    if (e.target.name === "file") {
      const files = Array.from(e.target.files);

      setAvatar([]);
      setAvatarPreview([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview((old) => [...old, reader.result]);
            setAvatar((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    setAvatar(e.target.files);
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>ĐĂNG NHẬP</p>
                  <p onClick={(e) => switchTabs(e, "register")}>ĐĂNG KÝ</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Quên mật khẩu ?</Link>
                <input type="submit" value="Đăng nhập" className="loginBtn" />
              </form>

              <form
                action="/register"
                method="POST"
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Tên người dùng"
                    required
                    name="name"
                    value={name}
                    onChange={change}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={change}
                  />
                </div>
                <div className="signUpName">
                  <DateRangeIcon />
                  <input
                    type="date"
                    required
                    name="name"
                    value={birthday}
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                </div>
                <div className="signUpName">
                  <ContactPhoneOutlinedIcon />
                  <input
                    type="number"
                    placeholder="Số điện thoại"
                    required
                    name="name"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    required
                    name="password"
                    value={password}
                    onChange={change}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="" />
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={change}
                  />
                </div>
                <input type="submit" value="Đăng ký" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
