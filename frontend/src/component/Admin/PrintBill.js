import React, { Fragment } from "react";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import "./printBill.css";
const PrintBill = () => {
  // function PrintBill = (e) => {
  //     window.print()
  // }

  // var content = document.getElementById("divcontents");
  // var pri = document.getElementById("ifmcontentstoprint").contentWindow;
  // pri.document.open();
  // pri.document.write(content.innerHTML);
  // pri.document.close();
  // pri.focus();
  // pri.print();

  return (
    <Fragment>
      <MetaData title={`In hóa đơn - Admin`} />
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <div className="wrapper">
            <section className="invoice">
              <div className="row">
                <div className="col-12">
                  <h2 className="page-header">
                    <i className="fas fa-globe"></i> SHOPE_SHOSES.
                    <small className="float-right">_.2022</small>
                  </h2>
                </div>
              </div>

              <div className="row invoice-info">
                <div className="col-sm-4 invoice-col">
                  <address>
                    <strong>SHOPE_SHOSES.</strong>
                    <br />
                    đường 3/2, phường Xuân Khánh
                    <br />
                    quận Ninh Kiều, tp. Cần Thơ
                    <br />
                    Phone: (804) 123-5432
                    <br />
                    Email: huynhsi@gmail.com
                  </address>
                </div>
                <hr />
                <div className="col-sm-4 invoice-col">
                  <address>
                    <strong>Người mua địa chỉ</strong>
                    <br />
                    795 Folsom Ave, Suite 600
                    <br />
                    San Francisco, CA 94107
                    <br />
                    Phone: (555) 539-1037
                    <br />
                    Email: john.doe@example.com
                  </address>
                </div>

                <div className="col-sm-4 invoice-col">
                  <b>Invoice #007612</b>
                  <br />
                  <br />
                  <b>Order ID:</b> 4F3S8J
                  <br />
                  <b>Payment Due:</b> 2/22/2014
                  <br />
                  <b>Account:</b> 968-34567
                </div>
              </div>

              <div className="row">
                <div className="col-12 table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Qty</th>
                        <th>Product</th>
                        <th>Serial #</th>
                        <th>Description</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Call of Duty</td>
                        <td>455-981-221</td>
                        <td>
                          El snort testosterone trophy driving gloves handsome
                        </td>
                        <td>$64.50</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Need for Speed IV</td>
                        <td>247-925-726</td>
                        <td>Wes Anderson umami biodiesel</td>
                        <td>$50.00</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Monsters DVD</td>
                        <td>735-845-642</td>
                        <td>
                          Terry Richardson helvetica tousled street art master
                        </td>
                        <td>$10.70</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Grown Ups Blue Ray</td>
                        <td>422-568-642</td>
                        <td>Tousled lomo letterpress</td>
                        <td>$25.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <p className="lead">Payment Methods:</p>
                  <img src="" alt="Visa" />
                  <img src="" alt="Mastercard" />
                  <img src="" alt="American Express" />
                  <img src="" alt="Paypal" />

                  <p className="text-muted well well-sm shadow-none">
                    Etsy doostang zoodles disqus groupon greplin oooj voxy
                    zoodles, weebly ning heekya handango imeem plugg dopplr
                    jibjab, movity jajah plickers sifteo edmodo ifttt zimbra.
                  </p>
                </div>

                <div className="col-6">
                  <p className="lead">Amount Due 2/22/2014</p>

                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th>Subtotal:</th>
                          <td>$250.30</td>
                        </tr>
                        <tr>
                          <th>Tax (9.3%)</th>
                          <td>$10.34</td>
                        </tr>
                        <tr>
                          <th>Shipping:</th>
                          <td>$5.80</td>
                        </tr>
                        <tr>
                          <th>Total:</th>
                          <td>$265.24</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <button onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </Fragment>
  );
};

export default PrintBill;
