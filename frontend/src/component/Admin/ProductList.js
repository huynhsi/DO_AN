import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
  deleteProductCheck,
} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  let navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const [selectionModel, setSelectionModel] = useState([]);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const deleteProductChecked = () => {
    dispatch(deleteProductCheck(selectionModel));
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
      alert.success("Xóa sản phẩm thành công");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 150, flex: 0.5 },

    {
      field: "name",
      headerName: "Tên",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "discount",
      headerName: "Khuyến mãi",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Kho",
      type: "number",
      minWidth: 50,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Giá",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Sửa",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        discount: item.discount,
        stock: item.Stock,
        price: item.price.toFixed(3),
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Tất cả sản phẩm</h1>
          <Button
            id="createDeleteUserBtn"
            type="submit"
            onClick={() => deleteProductChecked()}
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

export default ProductList;
