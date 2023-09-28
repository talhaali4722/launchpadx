import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
function Privatesale() {
    return (
        <>
            <div className='main'>
                <div className='main-inner'>
                    <div className='container-fluid dashboard-container'>
                        <div className='row'>
                            <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                                <ul className="verify-list">
                                    <li className="active">
                                        <span>01</span>
                                        <div className="txt-pnl">
                                            <h6>Before you start</h6>
                                            <p>Input your awesome title and choose the currency</p>
                                        </div>
                                    </li>
                                    <li>
                                        <span>02</span>
                                        <div className="txt-pnl">
                                            <h6>Private Sale</h6>
                                            <p>Enter the launchpad information  that you want to raise , that should  be enter all details about your presale</p>
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
                            <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12'>
                                <div className='full-div shadow-box verification-info'>
                                    <h3>TITLE</h3>
                                    <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        id="token-symbol"
                                        aria-describedby="Token Symbol"
                                        placeholder="Enter token address"
                                    />
                                    <p>Pool creation fee: 0.1 BNB</p>
                                    <h3>CURRENCY</h3>
                                    <Form>
                                        {['radio'].map((type) => (
                                            <div key={`${type}`} className="mb-3">
                                                <Form.Check
                                                    checked
                                                    label="BNB"
                                                    name="group2 "
                                                    type={type}
                                                    id={`inline-${type}-2`}
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                    <p>Users will pay with BNB for your token</p>
                                    <div className='full-div text-right'>
                                        <Link className='reg-gradient big' to="/Privatesale/Privatesaleinfo">Next</Link>
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
export default Privatesale;