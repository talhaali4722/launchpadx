import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
function Privatesaleadditionalinfo() {
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
                                    <li className="active">
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
                                        <div className='space-20'></div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>LOGO URL</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="LOGO-URL"
                                                aria-describedby="LOGO-URL"
                                                placeholder="LOGO URL"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>WEBSITE</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="WEBSITE"
                                                aria-describedby="WEBSITE"
                                                placeholder="WEBSITE"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>FACEBOOK</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="FACEBOOK"
                                                aria-describedby="FACEBOOK"
                                                placeholder="FACEBOOK"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>TWITTER</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="TWITTER"
                                                aria-describedby="TWITTER"
                                                placeholder="TWITTER"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>GITHUB</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="GITHUB"
                                                aria-describedby="GITHUB"
                                                placeholder="GITHUB"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>TELEGRAM</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="TELEGRAM"
                                                aria-describedby="TELEGRAM"
                                                placeholder="TELEGRAM"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>INSTAGRAM</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="INSTAGRAM"
                                                aria-describedby="INSTAGRAM"
                                                placeholder="INSTAGRAM"
                                            />
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <h3>DISCORD</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="DISCORD"
                                                aria-describedby="DISCORD"
                                                placeholder="DISCORD"
                                            />
                                        </div>
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <h3>REDDIT</h3>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                id="REDDIT"
                                                aria-describedby="REDDIT"
                                                placeholder="REDDIT"
                                            />
                                        </div>
                                        <div className='col-lg-12 col-md-12 col-sm-12'>
                                            <h3>DESCRIPTION</h3>
                                            <Form.Control placeholder="DESCRIPTION" as="textarea" rows={3} />
                                        </div>
                                    </div>
                                    <div className='full-div text-right'>
                                        <div className='btn-cntnr'>
                                            <Link className='reg-gradient big trans' to="/Privatesale/Privatesaleinfo">Back</Link>
                                            <Link className='reg-gradient big' to="/Privatesale/Finishprivatesale">Next</Link>
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
export default Privatesaleadditionalinfo;