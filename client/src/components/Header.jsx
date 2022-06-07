import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setLogout } from "../store/reducers/authSlice";
import { searchTours } from '../store/reducers/tourSlice'
import decoded from 'jwt-decode'
const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = user?.accessToken

  if (accessToken) {
    const decodedAccessToken = decoded(accessToken)
    if (decodedAccessToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const handleLogout = () => {
    dispatch(setLogout());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`)
      setSearch("")
    }
    else {
      navigate("/")
    }

  };
  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#f0e6ec" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "black", fontWeight: "600", fontSize: "22px" }}
        >
          My Tours
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?._id && (
              <h5 style={{ marginRight: "30px", marginTop: "27px" }}>
                Logged in as: {user?.name}
              </h5>
            )}
            {user?._id && (
              <MDBNavbarItem>
                <MDBNavbarLink href="/">
                  <p className="header-text">Home</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
            {user?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addTour">
                    <p className="header-text">Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?._id ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/login">
                    <p className="header-text" onClick={handleLogout}>
                      Logout
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              className="form-control"
              placeholder="Search tour..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: '5px', marginLeft: '5px' }}>
              <MDBIcon fas icon="search"/>
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
