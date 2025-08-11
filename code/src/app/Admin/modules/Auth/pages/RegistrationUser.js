import { connect, useDispatch } from "react-redux";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { registerUser, registerCompany } from "../_redux/authCrud";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import * as auth from "../_redux/authRedux";
import { useNavigate ,useLocation} from "react-router-dom";
import CustomizedButtons from "../../../../../utils/SuperAdmin/CustomizedButtons";

const initialUserValues = {
  user_email: "",
  user_password: "",
  change_password: "",
  user_status: true,
  company_id: "",
  acceptTerms: false
};

function RegistrationUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { intl } = props;
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    // if (!location?.state?.companyId) {
    //     warningToast("Please register your company first");
    //     navigate('/auth/registration');
    // }
  }, [navigate]);

  const RegistrationUserSchema = Yup.object().shape({
    user_email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD"
        })
      ),
    user_password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
        "Minimum eight characters, at least one uppercase letter, at least one special character, one lowercase letter and one number required"
      )
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD"
        })
      ),
    change_password: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD"
        })
      )
      .when("user_password", {
        is: val => !!(val && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref("user_password")],
          "Password and Confirm Password didn't match"
        )
      }),
    acceptTerms: Yup.bool().required("You must accept the terms and conditions")
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = fieldname => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  // const setTokenCookies = (token, tokenType) => {
  //     const cookies = new Cookies();
  //     cookies.set('access_token', token, {httpOnly: false,path: "/"});
  //     cookies.set('token_type', tokenType, {httpOnly: false,path: "/"});
  // }

  const formik = useFormik({
    initialValues: initialUserValues,
    validationSchema: RegistrationUserSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      //   const companyId = location?.state?.companyId;

      const companyDetails = {
        company_address: location?.state?.company_address,
        company_contact: location?.state?.company_contact,
        company_description: location?.state?.company_description,
        company_email: location?.state?.company_email,
        company_name: location?.state?.company_name,
        company_pin_code: location?.state?.company_pin_code,
        company_poc: location?.state?.company_poc,
        company_poc_contact: location?.state?.company_poc_contact,
        company_website: location?.state?.company_website,
        deployment_region: location?.state?.deployment_region
      };

      registerCompany(companyDetails)
        .then(response => {
          dispatch(props.setUser({ company: response.data }));
          let companyId = response.data?.id;
          let obj = {
            user_email: values.user_email,
            user_password: values.user_password,
            company_id: companyId,
            user_status: true
          };

          registerUser(obj)
            .then(response => {
              dispatch(props.setUser(response.data));
              let authData = new FormData();
              authData.append("username", values.user_email);
              authData.append("password", values.user_password);
              // Login user with newly created credential
             navigate("#/auth/login");
            })
            .catch(error => {
              setStatus("Something went wrong");
              if (error.detail) {
               console.log("error.detail",error.detail)
              }
            })
            .finally(() => {
              setSubmitting(false);
              disableLoading();
            });
        })
        .catch(() => {
          disableLoading();
          setSubmitting(false);
          setStatus("Something went wrong");
          navigate("/auth/registration");
        });
    }
  });

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to complete Step 2/2
        </p>
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: User Email */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="User Email"
            type="user_email"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "user_email"
            )}`}
            name="user_email"
            {...formik.getFieldProps("user_email")}
          />
          {formik.touched.user_email && formik.errors.user_email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.user_email}</div>
            </div>
          ) : null}
        </div>
        {/* end: User Email */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "user_password"
            )}`}
            name="user_password"
            {...formik.getFieldProps("user_password")}
          />
          {formik.touched.user_password && formik.errors.user_password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.user_password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Confirm Password */}
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="Confirm Password"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "change_password"
            )}`}
            name="change_password"
            {...formik.getFieldProps("change_password")}
          />
          {formik.touched.change_password && formik.errors.change_password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.change_password}
              </div>
            </div>
          ) : null}
        </div>
        {/* end: Confirm Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              className="m-1"
              {...formik.getFieldProps("acceptTerms")}
            />
            <span />
            <Link
              to="/terms"
              target="_blank"
              className="ml-1"
              rel="noopener noreferrer"
            >
              I agree the Terms & Conditions
            </Link>
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <CustomizedButtons loading={loading &&<span className="ml-3 spinner spinner-white"/>}
                             title={'Submit'}
                             flag={formik.isSubmitting ||
                                 !formik.isValid ||
                                 !formik.values.acceptTerms}
                             color={'primary'}
                             className={'font-weight-bold px-9 py-4 my-3 mx-4'}
          />

        </div>
      </form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(RegistrationUser));
