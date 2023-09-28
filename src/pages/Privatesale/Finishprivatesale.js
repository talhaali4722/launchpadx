import { Link } from "react-router-dom";
function Finishprivatesale() {
    return (
        <>
            <div className='main'>
                <div className='main-inner'>
                    <div className='container-fluid dashboard-container'>
                        <div className='row'>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <ul className="verify-list">
                                    <li className="active complete">
                                        <span>01</span>
                                        <div className="txt-pnl">
                                            <h6>Before you start</h6>
                                            <p>Input your awesome title and choose the currency</p>
                                        </div>
                                    </li>
                                    <li className="active complete">
                                        <span>02</span>
                                        <div className="txt-pnl">
                                            <h6>Private Sale</h6>
                                            <p>Enter the launchpad information  that you want to raise , that should  be enter all details about your presale</p>
                                        </div>
                                    </li>
                                    <li className="active complete">
                                        <span>03</span>
                                        <div className="txt-pnl">
                                            <h6>Add Additional Info</h6>
                                            <p>Let people know who you are</p>
                                        </div>
                                    </li>
                                    <li className='active'>
                                        <span>04</span>
                                        <div className="txt-pnl">
                                            <h6>Finish</h6>
                                            <p>Review your information</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
                                <div className='full-div shadow-box verification-info'>
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                        <ul className="flex-list">
                                            <li>
                                                <p><b>Presale Address</b></p>
                                                <p className="word-break">ncxbncbxnbcnbxncbnxbcnbxcbxnbcnxbc</p>
                                            </li>
                                            <li>
                                                <p><b>Token Name</b></p>
                                                <p>Crypto Pitch Token</p>
                                            </li>
                                            <li>
                                                <p><b>Token Symbol</b></p>
                                                <p>DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Token Decimals</b></p>
                                                <p>18</p>
                                            </li>
                                            <li>
                                                <p><b>Token Address</b></p>
                                                <p className="word-break">vystrhjxsi1212345djsds424sdsds21sds24d54</p>
                                            </li>
                                            <li>
                                                <p><b>Total Supply</b></p>
                                                <p>1020215844121002121 DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Tokens For Presale</b></p>
                                                <p>111545878745454 DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Tokens For Liquidity</b></p>
                                                <p>104545445544 DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Presale Rate</b></p>
                                                <p>1 BNB = 30254 DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Listing Rate</b></p>
                                                <p>I BNB = 1112221 DPI</p>
                                            </li>
                                            <li>
                                                <p><b>Initial Market Cap (estimate)	</b></p>
                                                <p>$30245787</p>
                                            </li>
                                            <li>
                                                <p><b>Soft Cap</b></p>
                                                <p>254 BNB</p>
                                            </li>
                                            <li>
                                                <p><b>Hard Cap</b></p>
                                                <p>370 BNB</p>
                                            </li>
                                            <li>
                                                <p><b>Unsold Tokens</b></p>
                                                <p>Burn</p>
                                            </li>
                                            <li>
                                                <p><b>Presale Start Time</b></p>
                                                <p>2023.10.06 13:00 (UTC)</p>
                                            </li>
                                            <li>
                                                <p><b>Presale End Time</b></p>
                                                <p>2023.10.06 14:00 (UTC)</p>
                                            </li>
                                            <li>
                                                <p><b>Listing On</b></p>
                                                <p>BNB</p>
                                            </li>
                                            <li>
                                                <p><b>Liquidity Percent</b></p>
                                                <p>100%</p>
                                            </li>
                                            <li>
                                                <p><b>Liquidity Lockup Time</b></p>
                                                <p>365 DAYS after pool end</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='full-div text-right'>
                                        <div className='btn-cntnr'>
                                            <Link className='reg-gradient big trans' to="/Privatesale/Privatesaleadditionalinfo">Back</Link>
                                            <Link className='reg-gradient big' to="/">Finish</Link>
                                        </div>
                                    </div>
                                    <div className='space-20'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Finishprivatesale;