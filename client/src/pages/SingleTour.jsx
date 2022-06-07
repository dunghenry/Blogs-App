import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link} from "react-router-dom";
import moment from "moment";
import { getTour, getRelatedTours } from "../store/reducers/tourSlice";
import RelatedTours from '../components/RelatedTours'
const SingleTour = () => {
  const dispatch = useDispatch();
  const { tour, relatedTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const tags = tour?.tags
  useEffect(() => {
    tags && dispatch(getRelatedTours(tags))
  }, [tags])
  
  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id]);
  return (
    <div style={{
        marginTop: "120px",
      }}>
      <MDBContainer>
        <MDBCard className="mb-3 mt-2">
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={tour.imageFile}
            alt={tour.title}
          />
          <MDBCardBody>
            <h3>{tour.title}</h3>
            <span>
              <p className="text-start tourName">Created by : {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {tour && tour.tags && tour.tags.map((item, index) => (
                  <Link key={index} to={`/tours/tag/${item}`}>#{item}</Link>
                ))}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedTours relatedTours={relatedTours} tourId={id} />
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default SingleTour;
