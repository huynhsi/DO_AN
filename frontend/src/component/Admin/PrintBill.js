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
          <div>
            <h1>Invoice</h1>
            <address contenteditable>
              <p>Jonathan Neal</p>
              <p>
                101 E. Chapman Ave
                <br />
                Orange, CA 92866
              </p>
              <p>(800) 555-1234</p>
            </address>

            <article>
              <h1>Recipient</h1>
              <address contenteditable>
                <p>
                  Some Company
                  <br />
                  c/o Some Guy
                </p>
              </address>
              <table class="meta">
                <tr>
                  <th>
                    <span contenteditable>Invoice #</span>
                  </th>
                  <td>
                    <span contenteditable>101138</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span contenteditable>Date</span>
                  </th>
                  <td>
                    <span contenteditable>January 1, 2012</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span contenteditable>Amount Due</span>
                  </th>
                  <td>
                    <span id="prefix" contenteditable>
                      $
                    </span>
                    <span>600.00</span>
                  </td>
                </tr>
              </table>
              <table class="inventory">
                <thead>
                  <tr>
                    <th>
                      <span contenteditable>Item</span>
                    </th>
                    <th>
                      <span contenteditable>Description</span>
                    </th>
                    <th>
                      <span contenteditable>Rate</span>
                    </th>
                    <th>
                      <span contenteditable>Quantity</span>
                    </th>
                    <th>
                      <span contenteditable>Price</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <a class="cut">-</a>
                      <span contenteditable>Front End Consultation</span>
                    </td>
                    <td>
                      <span contenteditable>Experience Review</span>
                    </td>
                    <td>
                      <span data-prefix>$</span>
                      <span contenteditable>150.00</span>
                    </td>
                    <td>
                      <span contenteditable>4</span>
                    </td>
                    <td>
                      <span data-prefix>$</span>
                      <span>600.00</span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="balance">
                <tr>
                  <th>
                    <span contenteditable>Total</span>
                  </th>
                  <td>
                    <span data-prefix>$</span>
                    <span>600.00</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span contenteditable>Amount Paid</span>
                  </th>
                  <td>
                    <span data-prefix>$</span>
                    <span contenteditable>0.00</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span contenteditable>Balance Due</span>
                  </th>
                  <td>
                    <span data-prefix>$</span>
                    <span>600.00</span>
                  </td>
                </tr>
              </table>
            </article>
            <aside>
              <h1>
                <span contenteditable>Additional Notes</span>
              </h1>
              <div contenteditable>
                <p>
                  A finance charge of 1.5% will be made on unpaid balances after
                  30 days.
                </p>
              </div>
            </aside>
          </div>
          <button onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </Fragment>
  );
};

export default PrintBill;
