import React, { useEffect, useState } from "react";
function NFTs() {
  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <h1>Current Presales</h1>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    All Status
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="javascript:void(0);">
                      Action
                    </a>
                    <a class="dropdown-item" href="javascript:void(0);">
                      Another action
                    </a>
                    <a class="dropdown-item" href="javascript:void(0);">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul className="verify-list">
                  <li className="active">
                    <span>01</span>
                    <div className="txt-pnl">
                      <h6>Verify Token</h6>
                      <p>Enter the token address and verify</p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div className="txt-pnl">
                      <h6>DeFi Fairlaunch Info</h6>
                      <p>
                        Enter the Fairlaunch information that you want to raise
                        , that should be enter all details about your pool
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div className="txt-pnl">
                      <h6>Add Additional Info</h6>
                      <p>Let people know who you are</p>
                    </div>
                  </li>
                  <li>
                    <span>04</span>
                    <div className="txt-pnl">
                      <h6>Finish</h6>
                      <p>Review your information</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <form>
                  <input
                    className="form-control"
                    autoComplete="off"
                    type="text"
                    placeholder="Name is Here"
                  />
                  <select className="form-control">
                    <option>1</option>
                    <option>1</option>
                    <option>1</option>
                  </select>
                  <textarea
                    autoComplete="off"
                    className="form-control"
                    placeholder="shery"
                  ></textarea>
                  <input
                    className="form-control submit-btn"
                    autoComplete="off"
                    type="submit"
                    placeholder="Cancel Pool"
                  />
                  <a className="submit-btn" href="javascript:void(0);">
                    Submit
                  </a>
                  <a className="submit-btn" href="javascript:void(0);">
                    Cancel Pool
                  </a>
                </form>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul className="flex-list">
                  <li>
                    <p>
                      <b>Presale Address</b>
                    </p>
                    <p className="word-break">ncxbncbxnbcnbxncbnxbcnbxcbxnbcnxbc</p>
                  </li>
                  <li>
                    <p>
                      <b>Token Name</b>
                    </p>
                    <p>Crypto Pitch Token</p>
                  </li>
                  <li>
                    <p>
                      <b>Token Symbol</b>
                    </p>
                    <p>DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Token Decimals</b>
                    </p>
                    <p>18</p>
                  </li>
                  <li>
                    <p>
                      <b>Token Address</b>
                    </p>
                    <p className="word-break">vystrhjxsi1212345djsds424sdsds21sds24d54</p>
                  </li>
                  <li>
                    <p>
                      <b>Total Supply</b>
                    </p>
                    <p>1020215844121002121 DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Tokens For Presale</b>
                    </p>
                    <p>111545878745454 DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Tokens For Liquidity</b>
                    </p>
                    <p>104545445544 DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Presale Rate</b>
                    </p>
                    <p>1 BNB = 30254 DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Listing Rate</b>
                    </p>
                    <p>I BNB = 1112221 DPI</p>
                  </li>
                  <li>
                    <p>
                      <b>Initial Market Cap (estimate) </b>
                    </p>
                    <p>$30245787</p>
                  </li>
                  <li>
                    <p>
                      <b>Soft Cap</b>
                    </p>
                    <p>254 BNB</p>
                  </li>
                  <li>
                    <p>
                      <b>Hard Cap</b>
                    </p>
                    <p>370 BNB</p>
                  </li>
                  <li>
                    <p>
                      <b>Unsold Tokens</b>
                    </p>
                    <p>Burn</p>
                  </li>
                  <li>
                    <p>
                      <b>Presale Start Time</b>
                    </p>
                    <p>2023.10.06 13:00 (UTC)</p>
                  </li>
                  <li>
                    <p>
                      <b>Presale End Time</b>
                    </p>
                    <p>2023.10.06 14:00 (UTC)</p>
                  </li>
                  <li>
                    <p>
                      <b>Listing On</b>
                    </p>
                    <p>BNB</p>
                  </li>
                  <li>
                    <p>
                      <b>Liquidity Percent</b>
                    </p>
                    <p>100%</p>
                  </li>
                  <li>
                    <p>
                      <b>Liquidity Lockup Time</b>
                    </p>
                    <p>365 DAYS after pool end</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NFTs;
