import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { info } from "sass";
import {
  useCreateFairLaunchInfoStore,
  useCreateFairLaunchStore,
} from "../store/useStore";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { factoryMethods } from "../../web3/Methods/FactoryMethods";
import { fromBn } from "evm-bn";

const schema = Joi.object({
  sellingAmount: Joi.number().positive().required().messages({
    "number.base": `Required Field`,
    "number.required": `Required Field`,
    "number.positive": `"Selling Amount must be a positive number`,
  }),
  softCap: Joi.number().positive().required().messages({
    "number.base": `Required Field`,
    "number.required": `Required Field`,
    "number.positive": `"Soft Cap must be a positive number`,
  }),
  liquidity: Joi.number().positive().min(51).max(100).required().messages({
    "number.base": `Required Field`,
    "number.positive": `Liquidity must be a positive number`,
    "number.min": `Liquidity must be greater than or euqal to 51%`,
    "number.max": `Liquidity must be less than or euqal to 100%`,
  }),
  startDate: Joi.date().greater(Date.now()).required().messages({
    "date.base": `Required Field`,
    "date.greater": `Date must be greater than Current Date`,
  }),
  endDate: Joi.date()
    .greater(Joi.ref("startDate"))
    .max(Date.now(Joi.ref("startDate")) + 168 * 60 * 60 * 1000)
    .required()
    .messages({
      "date.base": `Required Field`,
      "date.greater": `End Date must be greater than Start Date`,
      "date.max": `End Date should be less than 7 days `,
    }),
  max: Joi.number().min(0).allow("").positive().messages({
    "number.positive": `Max contribution must be a positive number`,
  }),
});

function Fairlaunchinfo() {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: joiResolver(schema),
  });

  const sellingAmount = useCreateFairLaunchInfoStore(
    (state) => state.sellingAmount
  );
  const setSellingAmount = useCreateFairLaunchInfoStore(
    (state) => state.setSellingAmount
  );

  const softCap = useCreateFairLaunchInfoStore((state) => state.softCap);
  const setSoftCap = useCreateFairLaunchInfoStore((state) => state.setSoftCap);
  const liquidity = useCreateFairLaunchInfoStore((state) => state.liquidity);
  const startDate = useCreateFairLaunchInfoStore((state) => state.startDate);
  const endDate = useCreateFairLaunchInfoStore((state) => state.endDate);
  const maxContribution = useCreateFairLaunchInfoStore(
    (state) => state.maxContribution
  );
  const setMaxContribution = useCreateFairLaunchInfoStore(
    (state) => state.setMaxContribution
  );
  const setLiquidity = useCreateFairLaunchInfoStore(
    (state) => state.setLiquidity
  );
  const setStartDate = useCreateFairLaunchInfoStore(
    (state) => state.setStartDate
  );
  const setEndDate = useCreateFairLaunchInfoStore((state) => state.setEndDate);
  const selectedFee = useCreateFairLaunchStore((state) => state.selectedFee);
  const setSelectedFee = useCreateFairLaunchStore(
    (state) => state.setSelectedFee
  );
  const [isChecked, setIsChecked] = useState(false);
  // const [status, setStatus] = useState(0);
  const status = useCreateFairLaunchInfoStore((state) => state.status);
  const setStatus = useCreateFairLaunchInfoStore((state) => state.setStatus);
  const decimal = useCreateFairLaunchStore((state) => state.decimal);

  const navigate = useNavigate();
  const location = useLocation();

  const hardCap = "1";

  const onSubmit = (e) => {
    navigate("/Createfairlaunch/Fairlaunchadditionalinfo");
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        var payload = {
          hardCap: hardCap ? hardCap : 0,
          preSale: sellingAmount ? sellingAmount : 0,
          // eslint-disable-next-line no-dupe-keys
          listingRate: sellingAmount ? sellingAmount : 0,
          liquidity: liquidity ? liquidity : 0,
          feeOption: selectedFee ? selectedFee : 0,
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
            setStatus(x);
          })
          .catch(() => {
            setStatus("");
          });
      };

      fetch();
    } catch (error) {
      setStatus("");
    }
  }, [hardCap, sellingAmount, liquidity]);

  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Createfairlaunch/Createfairlaunch");
  };

  const handleMaxContribution = (e) => {
    const x = e.target.value;
    if (x >= 0) {
      setMaxContribution(x);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "-") {
      e.preventDefault();
    }
  };

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
              <div className="col-xl-12 col-lg-10 col-md-12 col-sm-12">
                <form
                  style={{ maxWidth: "1265px" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="full-div shadow-box verification-info">
                    <h3>TOTAL SELLING AMOUNT</h3>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="EX.100"
                      value={sellingAmount}
                      step="any"
                      {...register("sellingAmount", {
                        onChange: (e) => setSellingAmount(e.target.value),
                      })}
                    />
                    {errors.sellingAmount && (
                      <p style={{ color: "red " }}>
                        {errors.sellingAmount.message}
                      </p>
                    )}

                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>SOFTCAP ( BNB )</h3>
                        <input
                          type="number"
                          id="EX.0"
                          step="any"
                          value={softCap}
                          className="form-control"
                          placeholder="EX.0"
                          {...register("softCap", {
                            onChange: (e) => setSoftCap(e.target.value),
                          })}
                        />
                        {errors.softCap && (
                          <p style={{ color: "red " }}>
                            {errors.softCap.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        {/* <Form className="messedUp-Form"> */}

                        <Form.Check
                          type="checkbox"
                          id="abc"
                          label="Set Max Contribution"
                          value={isChecked}
                          onChange={(e) => setIsChecked(!isChecked)}
                        />

                        {isChecked && (
                          <input
                            type="number"
                            className="form-control"
                            value={maxContribution}
                            step="any"
                            onKeyPress={handleKeyPress}
                            placeholder="Enter Max Contribution"
                            {...register("max", {
                              onChange: (e) => handleMaxContribution(e),
                            })}
                            // {...register("maxContribution", {
                            //   onChange: (e) => setMaxContribution(e.target.value),
                            // })}
                          />
                        )}
                        {errors.max && isChecked ? (
                          <p style={{ color: "red " }}>{errors.max.message}</p>
                        ) : (
                          ""
                        )}
                        {/* </Form> */}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>ROUTER</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="SelectRouterExchange"
                          value="PancakeSwap"
                          readOnly
                        />
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Liquidity (%)</h3>
                        <Form.Control
                          type="number"
                          autoComplete="off"
                          id="Liquidity"
                          value={liquidity}
                          aria-describedby="Liquidity"
                          placeholder="EX.0"
                          {...register("liquidity", {
                            onChange: (e) => setLiquidity(e.target.value),
                          })}
                        />
                        {errors.liquidity && (
                          <p style={{ color: "red " }}>
                            {errors.liquidity.message}
                          </p>
                        )}
                        {
                          <p>
                            If liquidity is greater than or equals to 100%.You
                            will get nothing. All raised funds will be added
                            when listing on DEX
                          </p>
                        }
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 text-left">
                        <div className="space-20 "></div>
                        <h3>Select Start time & end time ( UTC )</h3>
                        <div className="space-20"></div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>START TIME ( UTC )</h3>
                        <Form.Control
                          type="datetime-local"
                          autoComplete="off"
                          id="time"
                          aria-describedby="time"
                          value={startDate}
                          placeholder="2022-02-21 02:56 PM"
                          {...register("startDate", {
                            onChange: (e) => setStartDate(e.target.value),
                          })}
                        />
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
                          id="ENDTIME"
                          value={endDate}
                          aria-describedby="ENDTIME"
                          placeholder="2022-02-21 02:56 PM"
                          {...register("endDate", {
                            onChange: (e) => setEndDate(e.target.value),
                          })}
                        />
                        {errors.endDate && (
                          <p style={{ color: "red " }}>
                            {errors.endDate.message}
                          </p>
                        )}
                      </div>
                      <div className="tokensRequire-div container">
                        <p className="tokensRequire-text ">
                          Need {status} to create launchpad
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
                          className="reg-gradient big trans"
                          state={{ prevPath: location.pathname }}
                          to="/Createfairlaunch/Createfairlaunch"
                        >
                          Back
                        </Link>
                        <Button className="reg-gradient big" type="submit">
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
export default Fairlaunchinfo;
