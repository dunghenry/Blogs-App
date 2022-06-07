import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBCardGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../store/reducers/tourSlice";
import { toast } from "react-toastify";
import expected from '../utils/expected'
const TagTours = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tagTours, loading, errors } = useSelector((state) => ({
    ...state.tour,
  }));
  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag]);
  useEffect(() => {
    errors && toast.error(errors[0]);
  }, [errors]);
  if (loading) {
    return <Spinner />;
    }
    
  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      <h3 className="text-center">Tours with by tag : {tag}</h3>
      <hr style={{ maxWidth: "570px" }} />
      {tagTours.map((item) => (
        <MDBCardGroup key={item._id}>
          <MDBCard className="mt-2" style={{ maxWidth: "600px" }}>
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  src={item.imageFile}
                  className="rounded"
                  alt={item.title}
                  fluid
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                              <MDBCardText className="text-start">{expected(item.description)}</MDBCardText>
                              <div style={{ float: "left", marginTop: "-10px" }}>
                                  <MDBBtn size='sm' rounded color="info" onClick={() => navigate(`/tours/${item._id}`)}>
                                    Read More
                                  </MDBBtn>
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

export default TagTours;
