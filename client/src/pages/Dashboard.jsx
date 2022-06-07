import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getToursByUser } from "../store/reducers/tourSlice";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
  MDBCardText,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner';
import { deleteTour } from '../store/reducers/tourSlice';
import { toast } from 'react-toastify';
import expected from '../utils/expected'
const DashBoard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?._id;
  const { userTours, loading, errors } = useSelector((state) => ({ ...state.tour }));
  const handleDelete = (id) => {
    dispatch(deleteTour({ id, toast }));
  };
  useEffect(() => {
    errors && toast.error(errors[0])
  }, [errors])
  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  if(loading) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "140px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userTours.length === 0 && (
        <h3>No tour available with the user: {user?.name}</h3>
      )}

      {userTours.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user?.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}
      {userTours &&
        userTours.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
              <MDBRow className="g-0">
                <MDBCol md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {expected(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-60px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={() => handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default DashBoard;
