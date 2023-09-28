import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { launchpadMethods } from "../web3/Methods/LaunchpadMethods";
import img from "../utils/image.png";
import Loader from "../components/loader";
import { UPDATE_STATUS } from "./Graphql/Mutations";
import { useMutation } from "@apollo/client";
import { dutchLaunchpadMethods } from "../web3/Methods/DutchSubMethods";
import { subscriptionLaunchpadMethods } from "../web3/Methods/SubscriptionLaunchpadMethos";

function LanchpadCard({ item, index }) {
  const [everySecond, setEverySecond] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [amount, setAmount] = useState();
  const [cardStatus, setCardStatus] = useState("Upcoming");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const [updateStatus, { loading, data, error }] = useMutation(UPDATE_STATUS);

  const getPoolStatus = async () => {
    const address = await launchpadMethods(item.presaleAddress);
    const status = await address.getPoolStatus(item.presaleAddress);
    setCardStatus(status?.[3]);
    if (status?.[3] !== item.status) {
      updateStatus({
        variables: {
          id: item.presaleAddress,
          status: status?.[3],
        },
      });
    }
  };
  const [standardAndFairGathered, setStandardAndFairGathered] = useState("");
  const [dutchGathered, setDutchGathered] = useState("");
  const [subscriptionGathered, setSubscriptionGatherd] = useState("");

  const StandardAndFairGetheredCurrency = async () => {
    const address = await launchpadMethods(item.presaleAddress);
    const gathered = await address.getheredCurrency();
    setStandardAndFairGathered(parseFloat(gathered));
  };

  const dutchGatheredCurrency = async () => {
    const address = await dutchLaunchpadMethods(item.presaleAddress);
    const gathered = await address.getheredCurrency();
    setDutchGathered(parseFloat(gathered));
  };

  const subscriptionGatheredCurrency = async () => {
    const address = await subscriptionLaunchpadMethods(item.presaleAddress);
    const gathered = await address.getheredCurrency();
    setSubscriptionGatherd(parseFloat(gathered));
  };

  const navigate = useNavigate();

  const handleView = (item) => {
    if (item.type == "0") {
      navigate(`/StandardPitchToken/${item.presaleAddress}`);
    } else if (item.type == "1") {
      navigate(`/FairLaunchPitchtoken/${item.presaleAddress}`);
    } else if (item.type == "2") {
      navigate(`/DutchAuctionPitchToken/${item.presaleAddress}`);
    } else if (item.type == "3") {
      navigate(`/SubscriptionPitchToken/${item.presaleAddress}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPoolStatus();
    if (item.type === "0" || item.type === "1") {
      StandardAndFairGetheredCurrency();
    }
    if (item.type === "2") {
      dutchGatheredCurrency();
    }
    if (item.type === "3") {
      subscriptionGatheredCurrency();
    }

    setTimeout(() => {
      everySecond === false ? setEverySecond(true) : setEverySecond(false);
    }, 1000);

    if (moment().unix() > item.startTime) {
      if (item.endTime) {
        const currentTime = moment().unix();
        const diffTime = item.endTime - currentTime;
        let duration = moment.duration(diffTime * 1000, "milliseconds");
        const interval = 1000;
        if (duration._milliseconds <= 0) {
          // setCardStatus("Expired");
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
        } else {
          // setCardStatus("InProgress");
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
        }
      }
    } else {
      if (item.startTime) {
        const currentTime = moment().unix();

        const diffTime = item.startTime - currentTime;
        let duration = moment.duration(diffTime * 1000, "milliseconds");
        const interval = 1000;

        if (duration._milliseconds <= 0) {
          // setCardStatus("InComing");
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
        }
      }
    }
  }, [everySecond]);

  const shhowProgressBar = () => {
    if (item.type === "0") {
      return (
        <ProgressBar now={(standardAndFairGathered / item.hardCap) * 100} />
      );
    }
    if (item.type === "1") {
      return (
        <ProgressBar now={(standardAndFairGathered / item.hardCap) * 100} />
      );
    }
    if (item.type === "2") {
      <ProgressBar now={(dutchGathered / item.hardCap) * 100} />;
    }
    if (item.type === "3") {
      <ProgressBar now={(subscriptionGathered / item.hardCap) * 100} />;
    }
  };

  const onImageError = (e) => {
    e.target.src = img;
  };

  const formatNumber = (number) => {
    const str = number.toString();
    if (str.length <= 8) {
      return str;
    } else {
      return str.substr(0, 3) + "..." + str.substr(-3);
    }
  };

  return (
    <div className="col-lg-6 col-xl-4 col-md-6 col-sm-12">
      {item.presaleAddress && (
        <div className="token-post shadow-box">
          <div className="flex-div">
            <>
              {/* <img
                className="circle-span"
                src={item.metadata?.logoUrl ? item.metadata?.logoUrl : img}
                alt="Not available"
                onError={onImageError}
              /> */}
            </>
            <div>
              <Button
                type="button"
                /* className={`sale-btn ${
                  cardStatus === "InComing"
                    ? "yellow"
                    : cardStatus === "InProgress"
                    ? "green"
                    : cardStatus === "Filled"
                    ? "green"
                    : cardStatus === "Ended"
                    ? "red"
                    : cardStatus === "Cancelled"
                    ? "red"
                    : cardStatus === "Expired"
                    ? "red"
                    : ""
                }`} */
                className={`sale-btn ${
                  cardStatus == "0"
                    ? "yellow"
                    : cardStatus == "1"
                    ? "green"
                    : cardStatus == "2"
                    ? "green"
                    : cardStatus == "3"
                    ? "red"
                    : cardStatus == "4"
                    ? "gray"
                    : cardStatus == "5"
                    ? "red"
                    : ""
                }`}
              >
                <span></span>
                {cardStatus == "0"
                  ? "Upcoming"
                  : cardStatus == "1"
                  ? "Sale Live"
                  : cardStatus == "2"
                  ? "Filled"
                  : cardStatus == "3"
                  ? "Sale Ended"
                  : cardStatus == "4"
                  ? "Cancelled"
                  : cardStatus == "5"
                  ? "Expired"
                  : ""}{" "}
              </Button>
            </div>
          </div>
          <div className="space-20"></div>
          <div className="full-div txt-pnl">
            <h2>{item.tokenName}</h2>
            <h3>
              {item.type == "0"
                ? "Standard Launchpad"
                : item.type == "1"
                ? "Fair Launch"
                : item.type == "2"
                ? "Dutch Auction"
                : item.type == "3"
                ? "Subscription"
                : ""}
            </h3>
            {console.log(
              "Listing Rate",
              item.tokenName,
              item.listingRate,
              item.softCap,
              typeof item.listingRate
            )}
            <h3>1 BNB = {formatNumber(item.listingRate)}</h3>

            {item.type === "0" ? <h4>Soft/Hard</h4> : <h4>Soft</h4>}

            <h5>
              {item.softCap % 1 == 0
                ? formatNumber(item.softCap)
                : formatNumber(item.softCap)}{" "}
              BNB -{" "}
              {item.hardCap % 1 == 0
                ? formatNumber(item.hardCap)
                : formatNumber(item.hardCap)}{" "}
              BNB
            </h5>
            {/* <span className="grey-border"></span> */}
          </div>
          {item.type == "0" ? (
            <ProgressBar now={(standardAndFairGathered / item.hardCap) * 100} />
          ) : item.type == "1" ? (
            <ProgressBar now={(standardAndFairGathered / item.hardCap) * 100} />
          ) : item.type == "2" ? (
            <ProgressBar now={(dutchGathered / item.hardCap) * 100} />
          ) : item.type == "3" ? (
            <ProgressBar now={(standardAndFairGathered / item.hardCap) * 100} />
          ) : (
            ""
          )}

          <div className="liquidity-text-pnl">
            <div className="flex-div">
              <span>
                {item.type == "0"
                  ? parseFloat(standardAndFairGathered).toFixed(3)
                  : item.type === "1"
                  ? parseFloat(standardAndFairGathered).toFixed(3)
                  : item.type === "2"
                  ? parseFloat(dutchGathered).toFixed(3)
                  : item.type === "3"
                  ? parseFloat(subscriptionGathered).toFixed(3)
                  : ""}{" "}
                BNB
              </span>
              <span>{item.hardCap} BNB</span>
            </div>
            <div className="flex-div">
              <p>
                <b>Liquidity %:</b>
              </p>
              <span>{item.liquidityPercentage}%</span>
            </div>
            {/* <div className='flex-div'>
                                    <p><b>Lockup Time:</b></p>
                                    <span>365 Days</span>
                                </div> */}
          </div>
          <div className="flex-div view-pnl">
            <div className="sale-div">
              {cardStatus === "0" ? (
                days !== undefined ? (
                  <p>
                    <span>{"Sale Starts In:"}</span>
                    <ListGroup horizontal className="sale-list">
                      <ListGroup.Item className={"sale-list-item"}>
                        {days?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {hours?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {minutes?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {seconds?.toString().padStart(2, "0")}
                      </ListGroup.Item>
                    </ListGroup>
                  </p>
                ) : (
                  <Loader />
                )
              ) : cardStatus === "1" ? (
                days !== undefined ? (
                  <p>
                    <span className="text-white">Sale Ends In:</span>
                    <ListGroup horizontal className="sale-list">
                      <ListGroup.Item className={"sale-list-item"}>
                        {days?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {hours?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {minutes?.toString().padStart(2, "0")}:
                      </ListGroup.Item>
                      <ListGroup.Item className={"sale-list-item"}>
                        {seconds?.toString().padStart(2, "0")}
                      </ListGroup.Item>
                    </ListGroup>
                  </p>
                ) : (
                  <Loader />
                )
              ) : cardStatus === "2" ? (
                <span>Sale Filled</span>
              ) : cardStatus === "3" ? (
                <span>Ended</span>
              ) : cardStatus === "4" ? (
                <span>Cancelled</span>
              ) : cardStatus === "5" ? (
                <span>Expired</span>
              ) : (
                "Nothing"
              )}
            </div>
            <div></div>
            <div>
              <ul className="alert-list">
                <li>
                  <Link to="/">
                    <i className="fa fa-bell-o"></i>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <i className="fa fa-heart-o"></i>
                  </Link>
                </li>
              </ul>
              <Button
                className="reg-btn dark-red small"
                onClick={() => handleView(item)}
              >
                View
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanchpadCard;
