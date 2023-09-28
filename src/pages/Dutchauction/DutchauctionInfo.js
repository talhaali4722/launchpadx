import { joiResolver } from "@hookform/resolvers/joi";
import Joi, { ref } from "joi";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm, useWatch } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { info } from "sass";
import { factoryMethods } from "../../web3/Methods/DutchSubFactoryMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import { useCreateDutchAuction, useDutchAuctionInfo } from "../store/useStore";
import { toBn, fromBn } from "evm-bn";
// import Datetime from "react-datetime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
// import "react-datetime/css/react-datetime.css"

const schema = Joi.object({
  sellingAmount: Joi.number().positive().required().messages({
    "number.base": `Required Field`,
    "number.positive": `Selling Amount must be a positive number`,
  }),
  startPrice: Joi.number().positive().required().allow("").messages({
    "number.base": `Required Field`,
    "number.positive": `Start Price must be a positive number`,
    "number.greater": `Start Price must be greater than End Price`,
  }),
  endPrice: Joi.number()
    .allow("")
    .positive()
    .required()
    .less(Joi.ref("startPrice"))
    .messages({
      "number.base": `Required Field`,
      "number.positive": `End Price must be a positive number`,
      "number.less": `End Price must be less than Start Price`,
      "any.ref": ``,
    }),
  softCap: Joi.number().positive().allow("").required().messages({
    "number.base": `Required Field`,
    "number.less": `Softcap must be less than or equal to Hardcap`,
  }),
  hardCap: Joi.number().positive().allow("").required().messages({
    "number.base": `Required Field`,
    "number.positive": `Hardcap must be a positive number`,
    "number.min": `HardCap must be greater than or equal to softcap`,
  }),
  decreasePriceCycle: Joi.number().positive().integer().required().messages({
    "number.base": `Required Field`,
    "number.positive": `Decrease Price per Cycle must be a positive number`,
    "number.integer": `Decrease Price per Cycle must be a integer number`,
  }),
  minContribution: Joi.number()
    .positive()
    // .max(Joi.ref("hardCap"))

    .required()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Minimum Buy must be a positive number`,
      "number.max": `Minimum Buy must be less or equal to Hard Cap`,
      "any.ref": ``,
    }),
  maxContribution: Joi.number()
    .positive()
    // .min(Joi.ref("minContribution"))
    // .max(Joi.ref("hardCap"))
    .required()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Maximum Buy must be a positive number`,
      "number.min": `Maximum Buy must be greater than or equal to minimum contribution `,
      "number.max": `Maximum Buy must be less than or equal to Hard Cap  `,

      "any.ref": `reference`,
    }),

  liquidity: Joi.number().positive().min(51).max(100).required().messages({
    "number.base": `Required Field`,
    "number.positive": `Liquidity must be a positive number`,
    "number.max": `Liquidity must be less than or euqal to  100%`,
    "number.min": `Liquidity must be greater than or equal to  51% `,
  }),

  startDate: Joi.date().greater(Date.now()).required().messages({
    "date.base": `Required Field`,
    "date.greater": "Start Time needs to be after now",
  }),
  endDate: Joi.date()

    .greater(Joi.ref("startDate"))
    .required()
    .messages({
      "date.base": `Required Field`,
      "date.greater": `End Time needs to be after Start Time`,
      "any.ref": `Start Time required before End Time`,
    }),
});

function DutchauctionInfo({ control }) {
  const sellingAmount = useDutchAuctionInfo((state) => state.sellingAmount);
  const setSellingAmount = useDutchAuctionInfo(
    (state) => state.setSellingAmount
  );
  const startPrice = useDutchAuctionInfo((state) => state.startPrice);
  const setStartPrice = useDutchAuctionInfo((state) => state.setStartPrice);
  const endPrice = useDutchAuctionInfo((state) => state.endPrice);
  const setEndPrice = useDutchAuctionInfo((state) => state.setEndPrice);
  const startDate = useDutchAuctionInfo((state) => state.startDate);
  const setStartDate = useDutchAuctionInfo((state) => state.setStartDate);
  // const [startDate, setStartDate] = useState(null);
  const endDate = useDutchAuctionInfo((state) => state.endDate);
  const setEndDate = useDutchAuctionInfo((state) => state.setEndDate);
  const refundType = useDutchAuctionInfo((state) => state.refundType);
  const setRefundType = useDutchAuctionInfo((state) => state.setRefundType);
  const minContribution = useDutchAuctionInfo((state) => state.minContribution);
  const setTokenStatus = useDutchAuctionInfo((state) => state.setTokenStatus);
  const setMinContribution = useDutchAuctionInfo(
    (state) => state.setMinContribution
  );
  const maxContribution = useDutchAuctionInfo((state) => state.maxContribution);
  const setMaxContribution = useDutchAuctionInfo(
    (state) => state.setMaxContribution
  );
  const softCap = useDutchAuctionInfo((state) => state.softCap);
  const setSoftCap = useDutchAuctionInfo((state) => state.setSoftCap);
  const hardCap = useDutchAuctionInfo((state) => state.hardCap);
  const setHardCap = useDutchAuctionInfo((state) => state.setHardCap);
  const liquidity = useDutchAuctionInfo((state) => state.liquidity);
  const setLiquidity = useDutchAuctionInfo((state) => state.setLiquidity);
  const selectedFee = useCreateDutchAuction((state) => state.selectedFee);
  const decimals = useCreateDutchAuction((state) => state.decimals);
  const tokenAddress = useCreateDutchAuction((state) => state.tokenAddress);
  const balance = useCreateDutchAuction((state) => state.balance);
  const isWhiteListed = useDutchAuctionInfo((state) => state.isWhiteListed);
  const setIsWhiteListed = useDutchAuctionInfo(
    (state) => state.setIsWhiteListed
  );

  const symbol = useCreateDutchAuction((state) => state.symbol);
  const tokensStatus = useDutchAuctionInfo((state) => state.tokensStatus);
  const decreasePriceCycle = useDutchAuctionInfo(
    (state) => state.decreasePriceCycle
  );
  const setDecreasePriceCycle = useDutchAuctionInfo(
    (state) => state.setDecreasePriceCycle
  );
  const [dropdownText, setDropdownText] = useState("Refund");
  const [errorMessage, setErrorMessage] = useState("");
  const [timeDiffError, setTimeDiffError] = useState("");
  const [payLoadEndPrice, setPayLoadEndPrice] = useState(1);
  const [softCapError, setSoftCapError] = useState("");
  const [maxError, setMaxError] = useState("");
  const [minError, setMinError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [status, setStatus] = useState(0);
  const [sellingError, setSellingError] = useState("");
  const [nextStatus, setNextStatus] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",

    resolver: joiResolver(schema),
  });

  //
  //
  const handleStartPrice = (e) => {
    let value = e.target.value;
    setStartPrice(value);
    // setHardCap(value * sellingAmount);
  };
  const handleHardCap = (e) => {
    let value = e.target.value;
    setHardCap(value);
    // setStartPrice(value / sellingAmount);
  };

  const handleEndPrice = (e) => {
    let value = e.target.value;
    setEndPrice(value);

    if (parseFloat(value) > 0) {
      setPayLoadEndPrice(1 / value);
    }

    // setSoftCap(value * sellingAmount);
  };

  const handleSoftCap = (e) => {
    let value = e.target.value;
    setSoftCap(value);
    // setEndPrice(value / sellingAmount);
  };

  useEffect(() => {
    if (sellingAmount) {
      setSellingError("");
      setEndPrice(softCap / sellingAmount);
    }
  }, [softCap]);

  useEffect(() => {
    if (sellingAmount) {
      setSellingError("");
      setStartPrice(hardCap / sellingAmount);
    }
  }, [hardCap]);

  useEffect(() => {
    if (sellingAmount && endPrice) {
      setSellingError("");
      setSoftCap(endPrice * sellingAmount);
    }
  }, [endPrice]);

  useEffect(() => {
    if (softCap) {
      setEndPrice(softCap / sellingAmount);
    }
    if (hardCap) {
      setStartPrice(hardCap / sellingAmount);
    }
  }, [sellingAmount]);

  useEffect(() => {
    if (!sellingAmount) {
      setSellingError("");
    } else if (sellingAmount && startPrice) {
      setSellingError("");
      let value = startPrice * sellingAmount;
      setHardCap(value);
    }
  }, [startPrice]);

  const navigate = useNavigate();

  const onSubmit = () => {
    setErrorMessage("");
    clearErrors();
    navigate("/Dutchauction/Dutchadditionalinfo");
  };

  const handleSelect = (e) => {
    setRefundType(e ? e : "0");
    setDropdownText(
      e === "0" ? "Refund" : e === "1" ? "Burn" : "0" === "Refund"
    );
  };
  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Dutchauction/Dutchauction");
  };
  const location = useLocation();

  const handleRadio = (e) => {
    setIsWhiteListed(e.target.value);
  };

  useEffect(() => {
    try {
      const fetch = async () => {
        var payload = {
          hardCap: hardCap ? hardCap : 1,
          endPrice: payLoadEndPrice,
          preSaleRate: sellingAmount ? sellingAmount : 1,
          liquidity: liquidity ? liquidity : 51,

          feeOption: selectedFee,
          decimal: decimals,
        };
        const factory = await factoryMethods();

        const tokenDetail = await tokenMethods(tokenAddress);

        // const decimals = await tokenDetail.decimalsOfToken();

        let value = factory.getTokenRequire(
          payload,
          window.ethereum.selectedAddress
        );
        value
          .then((data) => {
            const x = fromBn(data.result, decimals);
            setTokenStatus(x);
          })
          .catch((e) => {
            setTokenStatus("");
          });
      };

      fetch();
    } catch (error) {
      setTokenStatus("");
    }
  }, [sellingAmount, startPrice, endPrice, softCap, hardCap]);

  const handleEndDate = async (e) => {
    const value = e.target.value;
    setEndDate(value);
  };
  useEffect(() => {
    const timeDiff = moment(endDate).unix() - moment(startDate).unix();
    const a = decreasePriceCycle * 60;
    if (a > timeDiff) {
      setTimeDiffError("Cycle must be less than (End time - Start time)");
    } else {
      setTimeDiffError("");
    }
  }, [decreasePriceCycle, startDate, endDate]);

  useEffect(() => {
    if (softCap && hardCap) {
      const percentage = (softCap / hardCap) * 100;
      if (parseFloat(percentage) < parseFloat(20)) {
        setErrorMessage("Softcap must be greater than or equal 20% of Hardcap");
        setNextStatus(true);
      } else {
        setNextStatus(false);

        setErrorMessage("");
      }
    }

    if (parseFloat(softCap) > parseFloat(hardCap)) {
      setSoftCapError("SoftCap should be less than or equal to hardcap");
      setNextStatus(true);
    } else {
      setSoftCapError("");

      setNextStatus(false);
    }
  }, [softCap, hardCap, endPrice]);

  useEffect(() => {
    if (parseFloat(maxContribution) > parseFloat(hardCap)) {
      setMaxError("Max contribution must be less than or equal to hard cap ");
      setNextStatus(true);
    } else if (parseFloat(maxContribution) < parseFloat(minContribution)) {
      setMaxError(
        "Max contribution must be less than or equal to Minimum Contribution"
      );
      setNextStatus(true);
    } else {
      setNextStatus(false);
      setMaxError("");
    }
  }, [maxContribution]);

  useEffect(() => {
    if (parseFloat(startPrice) < parseFloat(endPrice)) {
      setPriceError("Start price must be greater than end price");
      setNextStatus(true);
    } else {
      setPriceError("");
      setNextStatus(false);
    }
  }, [startPrice, endPrice]);

  useEffect(() => {
    if (parseFloat(minContribution) > parseFloat(hardCap)) {
      setMinError("Min contribution must be less than or equal to  hard cap ");
      setNextStatus(true);
    } else {
      setNextStatus(false);
      setMinError("");
    }
    if (parseFloat(maxContribution) > 0) {
      if (parseFloat(minContribution) > parseFloat(maxContribution)) {
        setMinError(
          "Min contribution must be less than or equal to  max contribution "
        );
        setNextStatus(true);
      } else {
        setNextStatus(false);

        setMinError("");
      }
    }
  }, [minContribution]);

  // useEffect(() => {
  //     "Decrease Price Per Cycle",
  //     sellingAmount,
  //     startPrice,
  //     endPrice,
  //     softCap,
  //     hardCap,
  //     minContribution,
  //     maxContribution,
  //     liquidity,
  //     startDate,
  //     endDate,
  //     decreasePriceCycle
  //   );
  //   if (
  //     sellingAmount &&
  //     startPrice &&
  //     endPrice &&
  //     softCap &&
  //     hardCap &&
  //     minContribution &&
  //     maxContribution &&
  //     liquidity &&
  //     startDate &&
  //     endDate &&
  //     decreasePriceCycle
  //   ) {

  //       setNextStatus(true);

  //       setNextStatus(false);

  //   }
  // }, [
  //   sellingAmount,
  //   startPrice,
  //   endPrice,
  //   softCap,
  //   hardCap,
  //   minContribution,
  //   maxContribution,
  //   liquidity,
  //   startDate,
  //   endDate,
  //   decreasePriceCycle,
  // ]);

  const handleMax = () => {
    setSellingAmount(balance);
  };

  var yesterday = moment().subtract(1, "day");

  const valid = (current) => {
    return current.isAfter(yesterday);
  };

  const handleStartDate = (e) => {
    setStartDate(e);
  };

  return (
    <>
      <div className="main">
        <div className="main-inner">
          {/*   <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          /> */}
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
                      <h6>Dutch Auction</h6>
                      <p>
                        Enter the Ducth Auction information that you want to
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
              <div className="col-xl-12 col-lg-10 col-md-12 col-sm-12">
                <form
                  style={{ maxWidth: "1265px" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="full-div shadow-box verification-info">
                    <h3>TOTAL SELLING AMOUNT</h3>
                    <div className="flex-div input-submit-div">
                      <Form.Control
                        type="number"
                        autoComplete="off"
                        id="token-symbol"
                        aria-describedby="Token Symbol"
                        placeholder="Ex.10000"
                        value={sellingAmount}
                        {...register("sellingAmount", {
                          onChange: (e) => setSellingAmount(e.target.value),
                        })}
                      />
                      {<Button onClick={handleMax}>Max</Button>}
                    </div>
                    {errors.sellingAmount ? (
                      <p style={{ color: "red " }}>
                        {errors.sellingAmount.message}
                      </p>
                    ) : (
                      <p style={{ color: "red " }}>{sellingError}</p>
                    )}

                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>START PRICE ( BNB )</h3>
                        <Form.Control
                          type="number"
                          step="any"
                          autoComplete="off"
                          id="START-PRICE"
                          placeholder="START PRICE ( BNB )"
                          aria-describedby="START-PRICE"
                          min="0"
                          value={startPrice === 0 ? "" : startPrice}
                          {...register("startPrice", {
                            onChange: (e) => setStartPrice(e.target.value),
                          })}
                          // onChange={(e) => handleStartPrice(e)}
                        />
                        {errors.startPrice ? (
                          <p style={{ color: "red " }}>
                            {errors.startPrice.message}
                          </p>
                        ) : (
                          <p style={{ color: "red " }}>{priceError}</p>
                        )}
                        {startPrice > 0 ? (
                          <>
                            <p>
                              1 {symbol} = {1 * startPrice} BNB
                            </p>
                            <p>
                              1 BNB= {1 / startPrice} {symbol}
                            </p>
                          </>
                        ) : (
                          // <p style={{ color: "red " }}>
                          //   End Price cannot be blank
                          // </p>
                          ""
                        )}

                        <p>
                          The price when the auction will start. This value must
                          be higher than the end price
                        </p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>END PRICE ( BNB )</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="END-PRICE"
                          step="any"
                          aria-describedby="END-PRICE"
                          placeholder="END PRICE ( BNB )"
                          value={endPrice === 0 ? "" : endPrice}
                          {...register("endPrice", {
                            onChange: (e) => handleEndPrice(e),
                          })}
                          // onChange={(e) => handleEndPrice(e)}
                        />
                        {errors.endPrice && (
                          <p style={{ color: "red " }}>
                            {errors.endPrice.message}
                          </p>
                        )}
                        {endPrice > 0 ? (
                          <>
                            <p>
                              1 {symbol} = {1 * endPrice} BNB
                            </p>
                            <p>
                              1 BNB= {1 / endPrice} {symbol}
                            </p>
                          </>
                        ) : (
                          ""
                        )}
                        <p>The price when the auction will meet its end date</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>SOFTCAP ( BNB )</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="SOFTCAP"
                          aria-describedby="SOFTCAP"
                          value={softCap === 0 ? "" : softCap}
                          // min={(20 * hardCap) / 100}
                          placeholder="SOFTCAP ( BNB )"
                          {...register("softCap", {
                            onChange: (e) => setSoftCap(e.target.value),
                          })}
                          // onChange={(e) => handleSoftCap(e)}
                          // required
                        />
                        {errors.softCap ? (
                          <p style={{ color: "red " }}>
                            {errors.softCap.message}
                          </p>
                        ) : (
                          <small style={{ color: "red" }}>{errorMessage}</small>
                        )}
                        <small style={{ color: "red" }}>{softCapError}</small>

                        <p>Softcap must be >= 20% of Hardcap!</p>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>HARDCAP ( BNB )</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="HARDCAP"
                          aria-describedby="HARDCAP"
                          placeholder="HARDCAP ( BNB )"
                          {...register("hardCap", {
                            onChange: (e) => setHardCap(e.target.value),
                          })}
                          value={hardCap}
                        />
                        {errors.hardCap && (
                          <p style={{ color: "red " }}>
                            {errors.hardCap.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
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
                        <h3>MIN CONTRIBUTION ( BNB )</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="MIN-CONTRIBUTION"
                          aria-describedby="MIN-CONTRIBUTION"
                          placeholder="MIN  CONTRIBUTION ( BNB )"
                          value={minContribution}
                          {...register("minContribution", {
                            onChange: (e) => setMinContribution(e.target.value),
                          })}
                        />
                        {errors.minContribution ? (
                          <p style={{ color: "red " }}>
                            {errors.minContribution.message}
                          </p>
                        ) : (
                          minError && (
                            <small style={{ color: "red" }}>{minError}</small>
                          )
                        )}
                        {/* {minError && (
                          <small style={{ color: "red" }}>{minError}</small>
                        )} */}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>MAX CONTRIBUTION ( BNB )</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="MAX-CONTRIBUTION"
                          aria-describedby="MAX-CONTRIBUTION"
                          placeholder="MAX CONTRIBUTION ( BNB )"
                          // onChange={(e) => setMaxContribution(e.target.value)}
                          value={maxContribution}
                          {...register("maxContribution", {
                            onChange: (e) => setMaxContribution(e.target.value),
                          })}
                        />
                        {errors.maxContribution && (
                          <p style={{ color: "red " }}>
                            {errors.maxContribution.message}
                          </p>
                        )}
                        {maxError && (
                          <p style={{ color: "red " }}>{maxError}</p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>DECREASE PRICE CYCLE (MINUTES)</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="DECREASE-PRICE-CYCLE"
                          aria-describedby="DECREASE-PRICE-CYCLE"
                          placeholder="DECREASE PRICE CYCLE (MINUTES)"
                          // onChange={(e) =>
                          //   setDecreasePriceCycle(e.target.value)
                          // }
                          // required
                          value={decreasePriceCycle}
                          {...register("decreasePriceCycle", {
                            onChange: (e) =>
                              setDecreasePriceCycle(e.target.value),
                          })}
                        />
                        {errors.decreasePriceCycle && (
                          <p style={{ color: "red " }}>
                            {errors.decreasePriceCycle.message}
                          </p>
                        )}
                        {timeDiffError && (
                          <p style={{ color: "red " }}>{timeDiffError}</p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>LIQUIDITY PERCENT (%)</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="LIQUIDITY-PERCENT"
                          aria-describedby="LIQUIDITY-PERCENT"
                          placeholder="LIQUIDITY PERCENT (%)"
                          value={liquidity}
                          {...register("liquidity", {
                            onChange: (e) => setLiquidity(e.target.value),
                          })}
                        />
                        {errors.liquidity && (
                          <p style={{ color: "red " }}>
                            {errors.liquidity.message}
                          </p>
                        )}
                        <p>
                          Enter the percentage of raised funds that should be
                          allocated to Liquidity on (Min 51%, Max 100%)
                        </p>
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
                          value="PancakeSwap"
                          readOnly
                        />
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>START TIME ( UTC )</h3>
                        <Form.Control
                          type="datetime-local"
                          autoComplete="off"
                          id="Starttime"
                          aria-describedby="Start Time"
                          placeholder="2022-02-21 02:56 PM"
                          value={startDate}
                          {...register("startDate", {
                            onChange: (e) => setStartDate(e.target.value),
                          })}
                        />
                        {/* <DatePicker
                          // selected={startDate}
                          // onChange={(date) => setStartDate(date)}
                          showIcon
                          selected={startDate}
                          onChange={(e) => handleStartDate(e)}
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          title="Select Start Date"
                          isClearable
                          timeCaption="AAAAAAAAAAa"
                          timeFormat="HH:mm"
                          showTimeInput
                          dropdownMode="scroll"
                          {...register("startDate")}
                        /> */}
                        {/* <DateTimePicker
                          // {...register("startDate", {
                          //   onChange: (e) => setStartDate(e.target.value),
                          // })}
                          value={new Date()}
                          // isValidDate={valid}
                          monthPlaceholder="mm"
                          secondPlaceholder="ss"
                          amPmAriaLabel="Select AM/PM"
                        /> */}

                        {errors.startDate && (
                          <p style={{ color: "red " }}>
                            {errors.startDate.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>END TIME ( UTC )</h3>
                        <Form.Control
                          type="datetime-local"
                          autoComplete="off"
                          id="End Time"
                          aria-describedby="End Time"
                          placeholder="2022-02-21 02:56 PM"
                          value={endDate}
                          {...register("endDate", {
                            onChange: (e) => handleEndDate(e),
                          })}
                        />
                        {errors.endDate && (
                          <p style={{ color: "red " }}>
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="full-div text-right">
                      <div className="tokensRequire-div container">
                        {/* <p className="tokensRequire-text ">
                          Need {tokensStatus ? tokensStatus : 0} {""} {symbol}{" "}
                          to create launchpad
                        </p> */}
                      </div>
                      <div className="reload-warning-div container">
                        <p className="reload-warning-text">
                          Data will not be saved on reload
                        </p>
                      </div>
                      <div className="btn-cntnr">
                        <Link
                          className="reg-gradient big trans"
                          state={{ prevPath: location.pathname }}
                          onClick={(e) => {}}
                          to="/Dutchauction/Dutchauction"
                        >
                          Back
                        </Link>

                        <Button
                          disabled={nextStatus}
                          className="reg-gradient big"
                          type="submit"
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
export default DutchauctionInfo;
