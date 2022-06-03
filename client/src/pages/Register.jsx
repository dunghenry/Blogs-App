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
import { register } from '../store/reducers/authSlice'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};
const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const { loading, error } = useSelector(state => ({ ...state.auth }))
  const dispatch = useDispatch();
  useEffect(() => {
    error && toast.error(error[0])
  }, [error])
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        dispatch(register({formValue, navigate, toast }))
      }
      else {
        toast.error("Password shold match!")
      }
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value })
  };
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            <div className="col-md-6">
              <MDBInput
                autoComplete="on"
                label="Enter first name..."
                type="text"
                value={firstName}
                name="firstName"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide first name"
              />
            </div>
            <div className="col-md-6">
              <MDBInput
                autoComplete="on"
                label="Enter last name..."
                type="text"
                value={lastName}
                name="lastName"
                onChange={onInputChange}
                invalid
                required
                validation="Please provide last name"
              />
            </div>
            <div className="col-md-12">
              <MDBInput
                autoComplete="on"
                label="Enter email..."
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                invalid
                required
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
            <div className="col-md-12">
              <MDBInput
                autoComplete="on"
                label="Enter confirm password..."
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={onInputChange}
                invalid
                required
                validation="Please provide your confirm password"
              />
            </div>
            <div className="md-12">
              <MDBBtn style={{ width: '100%' }} className="mt-2">
                {
                  loading && (<MDBSpinner size="sm" role="status" tag="span" className="me-2" />)
                }
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
          <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
