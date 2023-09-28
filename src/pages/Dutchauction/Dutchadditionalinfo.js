import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDucthAdditionalInfo } from "../store/useStore";

function Dutchadditionalinfo() {
  const logoUrl = useDucthAdditionalInfo((state) => state.logoUrl);
  const setLogoUrl = useDucthAdditionalInfo((state) => state.setLogoUrl);
  const webUrl = useDucthAdditionalInfo((state) => state.webUrl);
  const setWebUrl = useDucthAdditionalInfo((state) => state.setWebUrl);
  const facebookUrl = useDucthAdditionalInfo((state) => state.facebookUrl);
  const setFacebookUrl = useDucthAdditionalInfo(
    (state) => state.setFacebookUrl
  );
  const twitterUrl = useDucthAdditionalInfo((state) => state.twitterUrl);
  const setTwitterUrl = useDucthAdditionalInfo((state) => state.setTwitterUrl);
  const instagramUrl = useDucthAdditionalInfo((state) => state.instagramUrl);
  const setInstagramUrl = useDucthAdditionalInfo(
    (state) => state.setInstagramUrl
  );
  const discordUrl = useDucthAdditionalInfo((state) => state.discordUrl);
  const setDiscordUrl = useDucthAdditionalInfo((state) => state.setDiscordUrl);
  const redditUrl = useDucthAdditionalInfo((state) => state.redditUrl);
  const setRedditUrl = useDucthAdditionalInfo((state) => state.setRedditUrl);
  const gitHubUrl = useDucthAdditionalInfo((state) => state.gitHubUrl);
  const setGithubUrl = useDucthAdditionalInfo((state) => state.setGithubUrl);
  const telegramUrl = useDucthAdditionalInfo((state) => state.telegramUrl);
  const setTelegramUrl = useDucthAdditionalInfo(
    (state) => state.setTelegramUrl
  );

  const description = useDucthAdditionalInfo((state) => state.description);
  const setDescription = useDucthAdditionalInfo(
    (state) => state.setDescription
  );
  const schema = Joi.object({
    logoUrl: Joi.string().uri().required().messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "string.empty": "Logo URL cannot not be empty",
      "any.required": `Required Field`,
    }),
    webUrl: Joi.string().uri().required().messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "string.empty": `Web URL cannot not be empty`,
      "any.required": `Required Field`,
    }),
    faceBookUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    instagramUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    githubUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    discordUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    telegramUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    redditUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    twitterUrl: Joi.string().uri().allow("").messages({
      "string.base": `Required Field`,
      "string.uri": `Invalid URL`,
      "any.required": `Required Field`,
    }),
    description: Joi.string().max(300).allow("").messages({
      "string.base": `Required Field`,
      "string.max": `Description should less than  300 chracters `,
      "any.required": `Required Field`,
    }),
  });
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
criteriaMode: "all",
    resolver: joiResolver(schema),
  });
  let regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  const navigate = useNavigate();

  // const handleLogoUrl = (e) => {
  //   setLogoUrl(e);
  // };

  // const handleWebUrl = (e) => {
  //   setWebUrl(e);
  // };

  // const handleFacebookUrl = (e) => {
  //   setFacebookUrl(e);
  // };
  // const handleTwitterUrl = (e) => {
  //   setTwitterUrl(e);
  // };
  // const handleInstagramUrl = (e) => {
  //   setInstagramUrl(e);
  // };
  // const handleDiscordUrl = (e) => {
  //   setDiscordUrl(e);
  // };
  // const handleRedditUrl = (e) => {
  //   setRedditUrl(e);
  // };
  // const handleGithubUrl = (e) => {
  //   setGithubUrl(e);
  // };
  // const handleDescription = (e) => {
  //   setDescription(e);
  // };

  // const handleTelegramUrl = (e) => {
  //   setTelegramUrl(e);
  // };
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
  // const CheckUrl = () => {
  //   if (regex.test(logoUrl) && regex.test(webUrl)) {
  //     navigate("/Dutchauction/FinishDutchlaunch");
  //   } else {
  //     toast.error("Can't juke me ", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // };
  const onSubmit = () => {
    // CheckUrl();
    navigate("/Dutchauction/FinishDutchlaunch");
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   CheckUrl();
  // };

  return (
    <>
      <div className="main">
        <div className="main-inner">
          {/* <ToastContainer
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
                  <li className="active complete">
                    <span>02</span>
                    <div className="txt-pnl">
                      <h6>Dutch Auction</h6>
                      <p>
                        Enter the Fairlaunch information that you want to raise
                        , that should be enter all details about your pool
                      </p>
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
              <div className="col-xl-12 col-lg-10 col-md-12 col-sm-12">
                <form
                  style={{ maxWidth: "1265px" }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="full-div shadow-box verification-info">
                    <div className="row">
                      <div className="space-20"></div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>LOGO URL (*)</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="LOGO-URL"
                          value={logoUrl}
                          aria-describedby="LOGO-URL"
                          placeholder="LOGO URL"
                          {...register("logoUrl", {
                            onChange: (e) => setLogoUrl(e.target.value),
                          })}
                        />
                        {errors.logoUrl && (
                          <p className="text-danger">
                            {errors.logoUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>WEBSITE (*)</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="WEBSITE"
                          aria-describedby="WEBSITE"
                          placeholder="WEBSITE"
                          value={webUrl}
                          {...register("webUrl", {
                            onChange: (e) => setWebUrl(e.target.value),
                          })}
                        />
                        {errors.webUrl && (
                          <p className="text-danger">{errors.webUrl.message}</p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>FACEBOOK</h3>
                        <input
                          type="text"
                          autoComplete="off"
                          id="FACEBOOK"
                          aria-describedby="FACEBOOK"
                          placeholder="FACEBOOK"
                          value={facebookUrl}
                          {...register("faceBookUrl", {
                            onChange: (e) => setFacebookUrl(e.target.value),
                          })}
                        />
                        {errors.faceBookUrl && (
                          <p className="text-danger">
                            {errors.faceBookUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>TWITTER</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="TWITTER"
                          aria-describedby="TWITTER"
                          value={twitterUrl}
                          placeholder="TWITTER"
                          {...register("twitterUrl", {
                            onChange: (e) => setTwitterUrl(e.target.value),
                          })}
                        />
                        {errors.twitterUrl && (
                          <p className="text-danger">
                            {errors.twitterUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>GITHUB</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="GITHUB"
                          aria-describedby="GITHUB"
                          placeholder="GITHUB"
                          value={gitHubUrl}
                          {...register("githubUrl", {
                            onChange: (e) => setGithubUrl(e.target.value),
                          })}
                        />
                        {errors.githubUrl && (
                          <p className="text-danger">
                            {errors.githubUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>TELEGRAM</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="TELEGRAM"
                          aria-describedby="TELEGRAM"
                          placeholder="TELEGRAM"
                          value={telegramUrl}
                          {...register("telegramUrl", {
                            onChange: (e) => setTelegramUrl(e.target.value),
                          })}
                        />
                        {errors.telegramUrl && (
                          <p className="text-danger">
                            {errors.telegramUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>INSTAGRAM</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="INSTAGRAM"
                          aria-describedby="INSTAGRAM"
                          placeholder="INSTAGRAM"
                          value={instagramUrl}
                          {...register("instagramUrl", {
                            onChange: (e) => setInstagramUrl(e.target.value),
                          })}
                        />
                        {errors.instagramUrl && (
                          <p className="text-danger">
                            {errors.instagramUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <h3>DISCORD</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="DISCORD"
                          value={discordUrl}
                          aria-describedby="DISCORD"
                          placeholder="DISCORD"
                          {...register("discordUrl", {
                            onChange: (e) => setDiscordUrl(e.target.value),
                          })}
                        />
                        {errors.discordUrl && (
                          <p className="text-danger">
                            {errors.discordUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>REDDIT</h3>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          id="REDDIT"
                          aria-describedby="REDDIT"
                          placeholder="REDDIT"
                          value={redditUrl}
                          {...register("redditUrl", {
                            onChange: (e) => setRedditUrl(e.target.value),
                          })}
                        />
                        {errors.redditUrl && (
                          <p className="text-danger">
                            {errors.redditUrl.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>DESCRIPTION</h3>
                        <Form.Control
                          placeholder="DESCRIPTION"
                          as="textarea"
                          value={description}
                          {...register("description", {
                            onChange: (e) => setDescription(e.target.value),
                          })}
                        />
                        {errors.description && (
                          <p className="text-danger">
                            {errors.description.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="full-div text-right">
                      <div className="btn-cntnr">
                        <Link
                          className="reg-gradient big trans"
                          to="/Dutchauction/DutchauctionInfo"
                        >
                          Back
                        </Link>
                        <Button
                          disabled={!isValid}
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
export default Dutchadditionalinfo;
