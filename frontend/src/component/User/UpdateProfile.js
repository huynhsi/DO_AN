import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState([]);

  function takeDate(date) {
    const datevalue = new Date(date);
    let day = datevalue.getDate();
    let month = datevalue.getMonth() + 1;
    let year = datevalue.getFullYear();

    if (month < 10 && day >= 10) {
      return day + "-0" + month + "-" + year;
    } else if (month < 10 && day >= 10) {
      return "0" + day + "-0" + month + "-" + year;
    } else if (month >= 10 && day < 10) {
      return "0" + day + "-" + month + "-" + year;
    } else if (month >= 10 && day >= 10) {
      return day + "-" + month + "-" + year;
    }
  }

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("birthday", birthday);
    myForm.set("phone", phone);
    Object.values(avatar).forEach((image) => {
      myForm.append("file", image);
    });
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
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
    setAvatar(e.target.files);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBirthDay(user.birthday);
      setPhone(user.phone);
      setAvatar(user.avatar);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Cập Nhật Thông Tin</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
                  <DateRangeIcon />
                  <input
                    type="date"
                    placeholder="Ngày sinh"
                    name="name"
                    value={String(birthday).substr(0, 10)}
                    onChange={(e) => setBirthDay(e.target.value)}
                  />
                </div>
                <div className="updateProfileName">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="" />
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
