import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
const CardTour = ({ imageFile, description, title, _id, tags, name }) => {
    const expected = (str) => {
        if (str.length > 45) {
            str = str.substr(0, 45) + " ...";
        }
        return str
    }
    return (
        <MDBCardGroup>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <div className="top-left">{name}</div>
                <span className="text-start tag-card">
                    {tags.map((item) => `#${item}`)}
                </span>
                <MDBCardBody>
                    <MDBCardTitle>{title}</MDBCardTitle>
                    <MDBCardText>{expected(description)}</MDBCardText>
                    <Link to={`tours/${_id}`}>Read More</Link>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};

export default CardTour;
