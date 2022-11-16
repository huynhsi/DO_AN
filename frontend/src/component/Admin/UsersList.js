import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import {
  getAllUsers,
  clearErrors,
  deleteUser,
  deleteUserCheck,
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const [selectionModel, setSelectionModel] = useState([]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 0.7 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "lastLogin",
      headerName: "Đã đăng nhập",
      minWidth: 100,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Tên",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Trạng thái",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.5,
      headerName: "Sửa",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        lastLogin: String(item.createdAt).substr(0, 10),
        name: item.name,
      });
    });

  // const onRowsSelectionHandler = (ids) => {
  //   const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
  //   console.log(selectedRowsData);
  //   return selectedRowsData;
  // };

  const deleteUserChecked = () => {
    const ids = [];
    selectionModel.forEach((d) => {
      ids.push(d);
    });
    dispatch(deleteUserCheck(ids));
  };

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">TẤT CẢ NGƯỜI DÙNG</h1>
          <Button
            id="createProductBtn"
            type="submit"
            onClick={() => deleteUserChecked()}
          >
            Xóa
          </Button>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            checkboxSelection
            onSelectionModelChange={setSelectionModel}
            selectionModel={selectionModel}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
