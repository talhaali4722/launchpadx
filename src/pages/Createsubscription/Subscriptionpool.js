import { joiResolver } from "@hookform/resolvers/joi";
import { fromBn } from "evm-bn";
import Joi from "joi";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { factoryMethods } from "../../web3/Methods/DutchSubFactoryMethods";
import { subscriptionFactoryMethods } from "../../web3/Methods/SubscriptionFactoryMethods";
import { useCreateSubscription, useSubscriptionPool } from "../store/useStore";

const schema = Joi.object({
  hardCap: Joi.number().required().positive().unsafe().messages({
    "number.base": "HardCap must be a positive number",
  }),

  softCap: Joi.number()
    .required()
    .positive() // .min(([Joi.ref("hardCap")] * 51) / 100)
    .max(Joi.ref("hardCap"))
    .messages({
      "number.base": "Softcap Tokens cannot be blank",
      "number.max":
        "Softcap Tokens must be less than or equal to Total Selling Tokens",
      "number.min":
        "Softcap Tokens must be less than or equal to Total Selling Tokens",
    }),
  hardCapPerUser: Joi.number()
    .positive()
    .required()
    .max(Joi.ref("hardCap"))
    .messages({
      "number.base": "HardCap must be a positive number",
      "any.ref": "For this Hardcap tokens required",
      "number.max":
        "HardCap Tokens Per User must be less than or equal Total Selling Tokens",
    }),
  subscriptionRate: Joi.number().positive().precision(4).required().messages({
    "number.base": "subscriptionRate must be a positive number",
    "number.less": "Softcap must be less than hardcap ",
    "number.precision": "Softcap must be less than hardcap ",
  }),
  listingRate: Joi.number()
    .positive()
    .max(Joi.ref("subscriptionRate"))
    .required()
    .messages({
      "number.base": "listingRate must be a positive number",
      "number.max": "Listing Rate must be less than or equal Subscription Rate",
    }),
  liquidity: Joi.number().positive().min(51).max(100).required().messages({
    "number.base": `Required Field`,
    "number.positive": `Liquidity must be a positive number`,
    "number.min": `Liquidity must be greater than or euqal to 51%`,
    "number.max": `Liquidity must be less than or euqal to 100  %`,
  }),
  startDate: Joi.date().greater(Date.now()).required().messages({
    "date.base": `Required Field`,
    "date.greater": `Date must be greater than Current Date`,
  }),
  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "date.base": `Required Field`,
    "date.greater": `End Date must be greater than Start Date`,
  }),
});

function Subscriptionpool() {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: joiResolver(schema),
  });

  const [dropdownText, setDropdownText] = useState("Refund");
  const walletData = useSelector((state) => state.wallet);

  const Symbol = useCreateSubscription((state) => state.Symbol);
  const balance = useCreateSubscription((state) => state.balance);
  const selectedFee = useCreateSubscription((state) => state.selectedFee);
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState();
  const {
    setSoftCapTokens,
    setHardCapTokens,
    setHardCapTokensPerUser,
    setSubscriptionRate,
    setListingRate,
    setLiquidity,
    setrefundType,
    setStartDate,
    setEndDate,
    setIsWhiteListed,
    setTokenStatus,
  } = useSubscriptionPool((state) => ({
    setSoftCapTokens: state.setSoftCapTokens,
    setHardCapTokens: state.setHardCapTokens,
    setHardCapTokensPerUser: state.setHardCapTokensPerUser,
    setSubscriptionRate: state.setSubscriptionRate,
    setListingRate: state.setListingRate,
    setLiquidity: state.setLiquidity,
    setrefundType: state.setrefundType,
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
    setIsWhiteListed: state.setIsWhiteListed,
    setTokenStatus: state.setTokenStatus,
  }));

  const {
    softCapTokens,
    hardCapTokens,
    hardCapTokensPerUser,
    subscriptionRate,
    listingRate,
    liquidity,
    refundType,
    startDate,
    endDate,
    isWhiteListed,
    tokensStatus,
  } = useSubscriptionPool((state) => ({
    softCapTokens: state.softCapTokens,
    hardCapTokens: state.hardCapTokens,
    hardCapTokensPerUser: state.hardCapTokensPerUser,
    subscriptionRate: state.subscriptionRate,
    listingRate: state.listingRate,
    liquidity: state.liquidity,
    refundType: state.refundType,
    startDate: state.startDate,
    endDate: state.endDate,
    isWhiteListed: state.isWhiteListed,
    tokensStatus: state.tokensStatus,
  }));

  const { decimal } = useCreateSubscription((state) => ({
    decimal: state.decimal,
  }));

  const handleMax = () => {
    setHardCapTokens(balance);
  };

  const handleRadio = (e) => {
    setIsWhiteListed(e.target.value);
  };

  const handleSelect = (e) => {
    setrefundType(e ? e : "0");
    setDropdownText(
      e === "0" ? "Refund" : e === "1" ? "Burn" : "0" === "Refund"
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Createsubscription/Createsubscription");
  };

  const fetch = async () => {
    var payload = {
      hardCap: hardCapTokens ? hardCapTokens : "0",
      subscriptionRate: subscriptionRate ? subscriptionRate : "0",
      liquidity: liquidity ? liquidity : "0",
      listingRate: listingRate ? listingRate : "0",
      feeOption: selectedFee,
      decimal: decimal ? decimal : 18,
    };

    const factory = await subscriptionFactoryMethods();

    let value = factory.getTokenRequire(payload, walletData.account);
    value
      .then((data) => {
        const x = fromBn(data.result, decimal);
        setTokenStatus(x);
      })
      .catch(() => {
        setTokenStatus("");
      });
  };

  useEffect(() => {
    const percentage = parseFloat(
      (softCapTokens / hardCapTokens) * 100
    ).toFixed(4);

    if (percentage < 51 || percentage > 100) {
      setErrorMessage(
        "Softcap Tokens must be greater than or equal 51% of Total Selling Tokens"
      );
    } else {
      setErrorMessage("");
    }
  }, [softCapTokens, hardCapTokens]);

  useEffect(() => {
    try {
      fetch();
    } catch (error) {}
  }, [hardCapTokens, subscriptionRate, liquidity, listingRate]);

  const onSubmit = () => {
    const percentage = (softCapTokens / hardCapTokens) * 100;
    if (percentage >= 51) {
      navigate("/Createsubscription/Subscriptionadditioninfo");
    }
  };

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    if (startDate && !endDate) {
      setDateError("End Date Required");
    } else if (startDate && endDate) {
      setDateError("");
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul style={{ maxWidth: "1400px" }} className="verify-list">
                  <li className="active complete">
                    <span>01</span>
                    <div className="txt-pnl">
                      <h6>Verify Token</h6>
                      <p>Enter the token address and verify</p>
                    </div>
                  </li>
                  <li className="active">
                    <span>02</span>
                    <div className="txt-pnl">
                      <h6>Subscription Pool</h6>
                      <p>
                        Enter the Subscription Pool information that you want to
                        raise , that should be enter all details about your pool
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
              <div
                style={{ maxWidth: "1495px" }}
                className="col-xl-12 col-lg-10 col-md-12 col-sm-12"
              >
                <form
                  style={{ maxWidth: "1265px" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="full-div shadow-box verification-info">
                    <h3>HARDCAP TOKENS ({Symbol})</h3>
                    <div className="flex-div input-submit-div">
                      <Form.Control
                        type="number"
                        autoComplete="off"
                        id="Ex.100"
                        aria-describedby="Ex.100"
                        placeholder="Ex.100"
                        value={hardCapTokens}
                        {...register("hardCap", {
                          onChange: (e) => setHardCapTokens(e.target.value),
                        })}
                      />
                      {<Button onClick={handleMax}>Max</Button>}
                    </div>
                    {errors.hardCap && (
                      <small style={{ color: "red" }}>
                        {errors.hardCap.message}
                      </small>
                    )}
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>SOFTCAP TOKEN ({Symbol})</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="EX.0"
                          value={softCapTokens}
                          aria-describedby="EX.0"
                          placeholder="EX.0"
                          {...register("softCap", {
                            onChange: (e) => setSoftCapTokens(e.target.value),
                          })}
                        />
                        {errors.softCap ? (
                          <small style={{ color: "red" }}>
                            {errors.softCap.message}
                          </small>
                        ) : (
                          <small style={{ color: "red" }}>{errorMessage}</small>
                        )}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>HARDCAP TOKEN PER USER ({Symbol}) </h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="EX.0"
                          value={hardCapTokensPerUser}
                          aria-describedby="EX.0"
                          placeholder="EX.0"
                          {...register("hardCapPerUser", {
                            onChange: (e) =>
                              setHardCapTokensPerUser(e.target.value),
                          })}
                        />
                        {errors.hardCapPerUser && (
                          <small style={{ color: "red" }}>
                            {errors.hardCapPerUser.message}
                          </small>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>SUBSCRIPTION RATE</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="EX.0"
                          aria-describedby="EX.0"
                          placeholder="EX.0"
                          value={subscriptionRate}
                          {...register("subscriptionRate", {
                            onChange: (e) =>
                              setSubscriptionRate(e.target.value),
                          })}
                        />
                        {errors.subscriptionRate && (
                          <small style={{ color: "red" }}>
                            {errors.subscriptionRate.message}
                          </small>
                        )}
                        <p>If I spend 1 BNBhow many tokens will I receive?</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>LISTING RATE</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="EX.0"
                          aria-describedby="EX.0"
                          placeholder="EX.0"
                          value={listingRate}
                          {...register("listingRate", {
                            onChange: (e) => setListingRate(e.target.value),
                          })}
                        />
                        {errors.listingRate && (
                          <small style={{ color: "red" }}>
                            {errors.listingRate.message}
                          </small>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>WHITELIST</h3>
                        {["radio"].map((type) => (
                          <div key={`inline-${type}`}>
                            <Form.Check
                              inline
                              label="Disable"
                              name="group1"
                              type={type}
                              id={`inline-${type}-1`}
                              value="0"
                              checked={isWhiteListed === "0"}
                              onChange={handleRadio}
                            />
                            {
                              <Form.Check
                                inline
                                label="Enable"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                value="1"
                                checked={isWhiteListed === "1"}
                                onChange={handleRadio}
                              />
                            }
                          </div>
                        ))}
                        <p>You can enable/disable whitelist anytime</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>REFUND</h3>

                        <DropdownButton
                          title={dropdownText}
                          id="dropdown-menu-align-right"
                          onSelect={handleSelect}
                        >
                          <Dropdown.Item eventKey="0">REFUND</Dropdown.Item>
                          <Dropdown.Item eventKey="1">BURN</Dropdown.Item>
                        </DropdownButton>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>ROUTER</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="ROUTER"
                          aria-describedby="ROUTER"
                          placeholder="PancakeSwap"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>LIQUIDITY PERCENT (%)</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="LIQUIDITY"
                          aria-describedby="LIQUIDITY"
                          placeholder="LIQUIDITY"
                          value={liquidity}
                          {...register("liquidity", {
                            onChange: (e) => setLiquidity(e.target.value),
                          })}
                          maxLength={3}
                        />
                        {errors.liquidity && (
                          <small style={{ color: "red" }}>
                            {errors.liquidity.message}
                          </small>
                        )}
                        <p>
                          Enter the percentage of raised funds that should be
                          allocated to Liquidity on (Min 51%, Max 100%)
                        </p>
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>START TIME ( UTC )</h3>
                        <input
                          type="datetime-local"
                          id="time"
                          value={startDate}
                          aria-describedby="time"
                          placeholder="2022-02-21"
                          {...register("startDate", {
                            onChange: (e) => setStartDate(e.target.value),
                          })}
                        />

                        {errors.startDate && (
                          <p className="text-danger">
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>END TIME ( UTC )</h3>
                        <input
                          type="datetime-local"
                          id="ENDTIME"
                          value={endDate}
                          aria-describedby="ENDTIME"
                          placeholder="2022-02-21"
                          {...register("endDate", {
                            onChange: (e) => setEndDate(e.target.value),
                          })}
                        />
                        {errors.endDate ? (
                          <p className="text-danger">
                            {errors.endDate.message}
                          </p>
                        ) : (
                          <p className="text-danger">{dateError}</p>
                        )}
                      </div>
                    </div>
                    <div className="tokensRequire-div container">
                      <p className="tokensRequire-text">
                        Need{" "}
                        {tokensStatus ? parseFloat(tokensStatus).toFixed(2) : 0}{" "}
                        {Symbol} to create subscription pool
                      </p>
                    </div>
                    <div className="reload-warning-div container">
                      <p className="reload-warning-text">
                        Data will not be saved on reload
                      </p>
                    </div>
                    <div className="full-div text-right">
                      <div className="btn-cntnr">
                        <Link
                          className="reg-gradient big trans"
                          to="/Createsubscription/Createsubscription"
                          state={{ prevPath: location.pathname }}
                        >
                          Back
                        </Link>
                        <Button
                          className="reg-gradient big"
                          type="submit"
                          disabled={!isValid}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                    <div className="space-20"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Subscriptionpool;
