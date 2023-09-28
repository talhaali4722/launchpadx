import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
function Privatesaleinfo() {
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
                                    <li className="active">
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
                            <div className='col-xl-10 col-lg-10 col-md-12 col-sm-12'>
                                <div className='full-div shadow-box verification-info'>

                                    <div className='row'>
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <h3>WHITELIST</h3>
                                            <Form>
                                                {['radio'].map((type) => (
                                                    <div key={`inline-${type}`}>
                                                        <Form.Check
                                                            inline
                                                            checked
                                                            label="Disable"
                                                            name="group1"
                                                            type={type}
                                                            id={`inline-${type}-1`}
                                                        />
                                                        <Form.Check
                                                            inline
                                                            label="Enable"
                                                            name="group1"
                                                            type={type}
                                                            id={`inline-${type}-2`}
                                                        />
                                                    </div>
                                                ))}
                                            </Form>
                                            <p>You can enable/disable whitelist anytime</p>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>SOFTCAP TOKEN (TEST)</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>HARDCAP TOKENS (TEST)</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="Ex.100"
                                                aria-describedby="Ex.100"
                                                placeholder="Ex.100"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>MINIMUM BUY ( BNB ) </h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>MAXIMUM BUY ( BNB )</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>
                                        <div className='col-lg-12 col-md-12 col-sm-12 text-center'>
                                            <div className='space-20'></div>
                                            <h3>Select Start time & end time ( UTC )</h3>
                                            <div className='space-20'></div>
                                        </div>

                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>START TIME ( UTC )</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="Starttime"
                                                aria-describedby="Start Time"
                                                placeholder="2022-02-21 02:56 PM"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>END TIME ( UTC )</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="End Time"
                                                aria-describedby="End Time"
                                                placeholder="2022-02-21 02:56 PM"
                                            />
                                        </div>
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <h3>FIRST FUND RELEASE FOR PROJECT (%)</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>

                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>FUND VESTING PERIOD EACH CYCLE (DAYS)</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>FUND RELEASE EACH CYCLE (PERCENT)</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="EX.0"
                                                aria-describedby="EX.0"
                                                placeholder="EX.0"
                                            />
                                        </div>
                                        <div className='space-40'></div>
                                    </div>
                                    <div className='full-div text-right'>
                                        <div className='btn-cntnr'>
                                            <Link className='reg-gradient big trans' to="/Privatesale/Privatesale">Back</Link>
                                            <Link className='reg-gradient big' to="/Privatesale/Privatesaleadditionalinfo">Next</Link>
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
export default Privatesaleinfo;