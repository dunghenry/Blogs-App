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
import { useSelector, useDispatch} from 'react-redux';
import { setLogout } from '../store/reducers/authSlice';
const Header = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => ({ ...state.auth }))
  const handleLogout = () => {
    dispatch(setLogout())
  }
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
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {
              user?._id && (
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
              )
            }
            {
              user?._id ? (<><MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={handleLogout}>Logout</p>
                </MDBNavbarLink>
              </MDBNavbarItem></>) : (<MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text">Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>)
            }
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
