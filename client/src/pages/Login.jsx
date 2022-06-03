import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBInput,
  MDBCardBody,
  MDBValidation,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { login, googleSignIn } from "../store/reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  React.useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  useEffect(() => {
    error && toast.error(error[0]);
  }, [error]);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const googleSuccess = (response) => {
    const email = response?.profileObj?.email;
    const name = response?.profileObj?.name;
    const token = response?.accessToken;
    const googleId = response?.googleId
    const result = { name, email, token, googleId }
    dispatch(googleSignIn({ result, navigate, toast }))
  }
  const googleFailure = (err) => {
    toast.error(err.message)
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-12">
              <MDBInput
                autoComplete="on"
                label="Enter email..."
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your email"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                autoComplete="on"
                label="Enter password..."
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                invalid
                required
                validation="Please provide your password"
              />
            </div>
            <div className="md-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={renderProps => (<MDBBtn
              style={{ width: "100%" }}
              color="danger"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <MDBIcon className="me-2" fab icon="google" /> Google Sign In
            </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
