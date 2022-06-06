import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour} from "../store/reducers/tourSlice";
const initialState = {
  title: "",
  description: "",
  tags: [],
};
const AddEditTour = () => {
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { errors, loading, userTours } = useSelector((state) => ({ ...state.tour }));
  const { id } = useParams();
  const [tagErrMsg, setTagErrMsg] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const singleTour = userTours.find(tour => tour._id === id)
      setTourData({...singleTour})
    }
  }, [id])
  useEffect(() => {
    errors && toast.error(errors[0]);
  }, [errors]);
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };
  const handleAddTag = (tag) => {
    setTagErrMsg('');
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  };
  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };

  const handelClear = () => {
    setTourData({ title: "", description: "", tag: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tags.length) {
      setTagErrMsg("Please provide some tags");
    }
    if (title && description && tags) {
      const updatedData = { ...tourData, name: user?.name };
      if (!id) {
        dispatch(createTour({ updatedData, navigate, toast }));
        handelClear();
      }
      else {
        dispatch(updateTour({ id, updatedData, toast, navigate }));
      }
    }
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
        <h5>{id ? "Update Tour" : "Add Tour"}</h5>
        <MDBCardBody>
          <MDBValidation className="row g-3" noValidate onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBInput
                label="Enter title..."
                value={title}
                name="title"
                type="text"
                onChange={onInputChange}
                required
                className="form-control"
                invalid
                validation="Please provide title"
              />
            </div>
            <br />
            <div className="col-md-12">
              <MDBInput
                label="Enter description"
                type="text"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                textarea
                rows={4}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                placeholder="Enter tag"
                fullWidth
                variant="outlined"
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              
              {tagErrMsg && (<div className="tagErrMsg">{tagErrMsg}</div>)}
            </div>
            <div className="d-flex justify-content-stat">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>{id ? "Update" : "Submit"}</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handelClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AddEditTour;
