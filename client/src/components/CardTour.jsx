import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import expected from "../utils/expected";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../store/reducers/tourSlice";
const CardTour = ({
  imageFile,
  description,
  title,
  _id,
  tags,
  name,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user?._id || user?.googleId;
  const dispatch = useDispatch();
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
    };
    const handleLike = () => {
        dispatch(likeTour({ _id }));
      };
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
          {tags.map((tag, index) => (
            <Link key={index} to={`tours/tag/${tag}`}>
              #{tags}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={handleLike}
          >
            <Likes />
          </MDBBtn>
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
