import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBCardTitle,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import expected from "../utils/expected";
const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <>
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedTours.length > 1 &&
              relatedTours
                .filter((tour) => tour._id !== tourId)
                .splice(0, 3)
                .map((item) => (
                  <MDBCol key={item._id}>
                    <MDBCard>
                      <Link to={`/tours/${item._id}`}>
                        <MDBCardImage
                          src={item.imageFile}
                          alt={item.title}
                          position="top"
                          style={{ height: "250px" }}
                        />
                      </Link>
                      <span className="text-start tag-card">
                        {item.tags.map((tag, index) => (
                          <Link key={index} to={`/tours/tag/${tag}`}>
                            #{tag}
                          </Link>
                        ))}
                      </span>
                      <MDBCardBody>
                        <MDBCardTitle className="text-start">
                          {item.title}
                        </MDBCardTitle>
                        <MDBCardText className="text-start">
                          {expected(item.description)}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
          </MDBRow>
        </>
      )}
    </>
  );
};

export default RelatedTours;
