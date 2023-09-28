import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import {
  useCreateLaunchPadStore,
  useDefiLaunchPadStore,
} from "../store/useStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { factoryMethods } from "../../web3/Methods/FactoryMethods";

import { useForm } from "react-hook-form";

import { joiResolver } from "@hookform/resolvers/joi";

import Joi from "joi";
import { DropdownButton } from "react-bootstrap";
import { useEffect } from "react";
import Web3 from "web3";
import { Formik } from "formik";
import { fromBn } from "evm-bn";
import DateTimePicker from "react-datetime-picker";

const schema = Joi.object({
  preSale: Joi.number()
    .positive()
    .min(0)

    .precision(2)
    .required()
    .unsafe()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Presale must be a positive number`,
    }),
  softCap: Joi.number()
    .positive()

    .required()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Softcap must be a positive number`,
      "number.max": `Softcap must be less  than or equal to Hardcap`,
      "number.min": `Softcap must be greater than 51% of Hardcap`,
      "number.less": `Softcap must be less than or equal to  Hardcap`,
      "any.ref": "",
    }),
  hardCap: Joi.number().positive().min(Joi.ref("softCap")).required().messages({
    "number.base": `Required Field`,
    "number.positive": `Hardcap must be a positive number`,
    "number.min": `HardCap must be greater than or equal to softcap`,
  }),
  minimumBuy: Joi.number()
    .positive()
    .less(Joi.ref("hardCap"))
    .required()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Minimum Buy must be a positive number`,
      "number.less": `Minimum Buy must be less than hardcap`,
    }),
  maximumBuy: Joi.number()
    .positive()
    .min(Joi.ref("minimumBuy"))
    .max(Joi.ref("hardCap"))
    .required()
    .messages({
      "number.base": `Required Field`,
      "number.positive": `Maximum Buy must be a positive number`,

      "number.min": `Maximum Buy must be greater or equal to Minimum buy  `,
      "number.max": `Maximum Buy must be less or equal to Hard Cap `,
      "any.ref": "  ",
    }),
  liquidity: Joi.number().positive().min(51).max(100).required().messages({
    "number.base": `Required Field`,
    "number.positive": `Liquidity must be a positive number`,
    "number.min": `Liquidity must be greater than or euqal to 51%`,
    "number.max": `Liquidity must be less than or euqal to 100  %`,
  }),
  listing: Joi.number().positive().required().messages({
    "number.base": `Required Field`,
    "number.positive": `Listing Rate must be a positive number`,
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
function DefilaunchpadInfo() {
  const [errorMessage, setErrorMessage] = useState("");
  const softCap = useDefiLaunchPadStore((state) => state.softCap);
  const setSoftCap = useDefiLaunchPadStore((state) => state.setSoftCap);
  const hardCap = useDefiLaunchPadStore((state) => state.hardCap);
  const setHardCap = useDefiLaunchPadStore((state) => state.setHardCap);
  const minimumBuy = useDefiLaunchPadStore((state) => state.minimumBuy);
  const setMinimumBuy = useDefiLaunchPadStore((state) => state.setMinimumBuy);
  const maximumBuy = useDefiLaunchPadStore((state) => state.maximumBuy);
  const setmaximumBuy = useDefiLaunchPadStore((state) => state.setmaximumBuy);
  const refundType = useDefiLaunchPadStore((state) => state.refundType);
  const setrefundType = useDefiLaunchPadStore((state) => state.setrefundType);
  const liquidity = useDefiLaunchPadStore((state) => state.liquidity);
  const setLiquidity = useDefiLaunchPadStore((state) => state.setLiquidity);
  const listingRate = useDefiLaunchPadStore((state) => state.listingRate);
  const setListingRate = useDefiLaunchPadStore((state) => state.setListingRate);
  const startDate = useDefiLaunchPadStore((state) => state.startDate);
  const setStartDate = useDefiLaunchPadStore((state) => state.setStartDate);
  const endDate = useDefiLaunchPadStore((state) => state.endDate);
  const setEndDate = useDefiLaunchPadStore((state) => state.setEndDate);
  const tokenAddress = useDefiLaunchPadStore((state) => state.tokenAddress);
  const selectedFee = useCreateLaunchPadStore((state) => state.selectedFee);
  const symbol = useCreateLaunchPadStore((state) => state.symbol);
  const setTokenStatus = useDefiLaunchPadStore((state) => state.setTokenStatus);
  const tokensStatus = useDefiLaunchPadStore((state) => state.tokensStatus);
  const allowanceOfToken = useDefiLaunchPadStore(
    (state) => state.allowanceOfToken
  );

  const [dropdownText, setDropdownText] = useState("Refund");
  const [percentage, setPercentage] = useState("");
  const [status, setStatus] = useState(0);
  const setTokenAddress = useDefiLaunchPadStore(
    (state) => state.setTokenAddress
  );
  const preSale = useDefiLaunchPadStore((state) => state.preSale);
  const setPreSale = useDefiLaunchPadStore((state) => state.setPreSale);
  // const [radio, setRadio] = useState("0");
  const isWhiteListed = useDefiLaunchPadStore((state) => state.isWhiteListed);
  const setIsWhiteListed = useDefiLaunchPadStore(
    (state) => state.setIsWhiteListed
  );
  const decimal = useCreateLaunchPadStore((state) => state.decimal);

  const navigate = useNavigate();
  var today = new Date();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: joiResolver(schema),
  });

  const handleSelect = (e) => {
    setrefundType(e ? e : "0");
    setDropdownText(e === "0" ? "Refund" : e === "1" ? "Burn" : "0");
  };

  try {
    const fetch = async () => {
      var payload = {
        hardCap: hardCap ? hardCap : 0,
        preSale: preSale ? preSale : 0,
        liquidity: liquidity ? liquidity : 0,
        listingRate: listingRate ? listingRate : 0,
        feeOption: selectedFee,
        decimal: decimal,
      };

      const factory = await factoryMethods();

      let value = factory.getTokenRequire(
        payload,
        window.ethereum.selectedAddress
      );
      value
        .then((data) => {
          const x = fromBn(data.result, decimal);
          setTokenStatus(x);
        })
        .catch(() => {
          setStatus("");
        });
    };

    fetch();
  } catch (error) {
    setTokenStatus("");
  }

  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Createlaunchpad/Createlaunchpad");
  };

  const onSubmit = (e) => {
    const percentage = (softCap / hardCap) * 100;
    if (parseFloat(percentage) >= parseFloat(50)) {
      navigate("/Createlaunchpad/Addaditionalinfo");
    } else {
      setErrorMessage("Softcap must be greater than or equal 50% of Hardcap");
    }
  };

  const handleRadio = (e) => {
    setIsWhiteListed(e.target.value);
  };

  let location = useLocation();

  const handleHardCap = (e) => {
    const percentage = (softCap / e.target.value) * 100;
    const value = e.target.value;
    if (parseFloat(percentage) > parseFloat(50)) {
      setErrorMessage("Softcap must be greater than or equal 50% of Hardcap");
    } else {
      setErrorMessage("");
    }
    setHardCap(value);
  };

  useEffect(() => {
    const percentage = parseFloat((softCap / hardCap) * 100).toFixed(4);
    console.log("Percentage ", percentage);
    if (percentage < parseFloat(50) || percentage > parseFloat(100)) {
      setErrorMessage("Softcap must be greater than or equal 50% of Hardcap");
    } else {
      setErrorMessage("");
    }
  }, [softCap, hardCap]);

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
                      <h6>DeFi Launchpad Info</h6>
                      <p>
                        Enter the Standard Launchpad information that you want
                        to raise , that should be enter all details about your
                        pool
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
                    <p>(*) is required field</p>
                    <h3>Pre Sale Rate</h3>

                    <input
                      type="number"
                      autoComplete="off"
                      id="token-symbol"
                      value={preSale}
                      placeholder="Enter PreSale Rate"
                      {...register("preSale", {
                        onChange: (e) => setPreSale(e.target.value),
                      })}
                    />
                    {errors.preSale && (
                      <small className="text-danger">
                        {errors.preSale.message}
                      </small>
                    )}

                    <p>If i spend 1 BNB how many tokens will i receive ?</p>
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
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>SOFTCAP ( BNB )</h3>
                        <input
                          type="number"
                          autoComplete="off"
                          id="SOFTCAP"
                          value={softCap}
                          placeholder="SOFTCAP ( BNB )"
                          step="any"
                          {...register("softCap", {
                            onChange: (e) => setSoftCap(e.target.value),
                          })}
                        />
                        <p>Softcap must be >= 50% of HardCap!</p>

                        {errors.softCap ? (
                          <p className="text-danger">
                            {errors.softCap.message}
                          </p>
                        ) : (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>HARDCAP ( BNB )</h3>
                        <input
                          type="number"
                          autoComplete="off"
                          id="HARDCAP"
                          value={hardCap}
                          placeholder="HARDCAP ( BNB )"
                          step="any"
                          {...register("hardCap", {
                            onChange: (e) => setHardCap(e.target.value),
                          })}
                        />
                        {errors.hardCap && (
                          <p className="text-danger">
                            {errors.hardCap.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>MINIMUM BUY ( BNB )</h3>
                        <input
                          type="number"
                          autoComplete="off"
                          id="MINIMUMBUY"
                          aria-describedby="MINIMUMBUY"
                          value={minimumBuy}
                          max={hardCap}
                          placeholder="MINIMUM BUY ( BNB )"
                          {...register("minimumBuy", {
                            onChange: (e) => setMinimumBuy(e.target.value),
                          })}
                        />
                        {errors.minimumBuy && (
                          <p className="text-danger">
                            {errors.minimumBuy.message}{" "}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>MAXIMUM BUY ( BNB )</h3>
                        <input
                          type="number"
                          autoComplete="off"
                          id="MAXIMUMBUY"
                          value={maximumBuy}
                          aria-describedby="MAXIMUMBUY"
                          placeholder="MAXIMUM BUY ( BNB ) "
                          step="any"
                          {...register("maximumBuy", {
                            onChange: (e) => setmaximumBuy(e.target.value),
                          })}
                        />
                        {errors.maximumBuy && (
                          <p className="text-danger">
                            {errors.maximumBuy.message}{" "}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>REFUND</h3>

                        <DropdownButton
                          title={dropdownText}
                          id="dropdown-menu-align-right"
                          onSelect={handleSelect}
                          className="mb-3 btneee-width"
                        >
                          <Dropdown.Item eventKey="0">REFUND</Dropdown.Item>
                          <Dropdown.Item eventKey="1">BURN</Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>ROUTER (*)</h3>
                        <input
                          type="text"
                          autoComplete="off"
                          id="ROUTER"
                          aria-describedby="ROUTER"
                          placeholder="ROUTER"
                          value="Pancake Swap"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>PancakeSwap LIQUIDITY ( % )</h3>
                        <input
                          type="number"
                          id="LIQUIDITY"
                          value={liquidity}
                          placeholder="PancakeSwap LIQUIDITY"
                          {...register("liquidity", {
                            onChange: (e) => setLiquidity(e.target.value),
                          })}
                        />
                        {errors.liquidity && (
                          <p className="text-danger">
                            {errors.liquidity.message}
                          </p>
                        )}
                        {
                          <>
                            <p>
                              If liquidity is greater than or equals to 100%.You
                              will get nothing. All raised funds will be added
                              when listing on DEX
                            </p>
                            <p>
                              If I spend 1 BNB on how haow many tokens will I
                              recieve? Usually this amount is lower than presale
                              rate to allow for a higher listing price.
                            </p>
                          </>
                        }
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>PancakeSwap LISTING RATE</h3>
                        <input
                          type="number"
                          autoComplete="off"
                          id="LISTING"
                          value={listingRate}
                          aria-describedby="LISTING"
                          placeholder="PancakeSwap LISTING RATE"
                          {...register("listing", {
                            onChange: (e) => setListingRate(e.target.value),
                          })}
                        />
                        {errors.listing && (
                          <p className="text-danger">
                            {errors.listing.message}
                          </p>
                        )}
                        <p>
                          1 BNB= {1 * listingRate}
                          {""} {symbol}
                        </p>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 text-start">
                        <div className="space-20"></div>
                        <h3>Select Start time & end time ( UTC )</h3>
                        <div className="space-20"></div>
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
                        {errors.endDate && (
                          <p className="text-danger">
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>
                      <p className="tokens-require"></p>
                      <div className="tokensRequire-div container">
                        <p className="tokensRequire-text ">
                          Need {tokensStatus} {""} {symbol} to create launchpad
                        </p>
                      </div>
                      <div className="reload-warning-div container">
                        <p className="reload-warning-text">
                          Data will not be saved on reload
                        </p>
                      </div>
                    </div>
                    <div className="full-div text-right">
                      <div className="btn-cntnr">
                        <Link
                          to={"/Createlaunchpad/Createlaunchpad"}
                          state={{ prevPath: location.pathname }}
                          className="reg-gradient big trans"
                        >
                          Back
                        </Link>
                        <Button
                          disabled={!isValid}
                          type="submit"
                          className="reg-gradient big"
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
export default DefilaunchpadInfo;
