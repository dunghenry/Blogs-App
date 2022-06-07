import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours, setCurrentPage } from "../store/reducers/tourSlice";
import { toast } from "react-toastify";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { tours, loading, errors, currentPage, numberOfPages } = useSelector(
    (state) => ({ ...state.tour })
  );
  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [currentPage]);
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
        padding: "100px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tours.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
              {tours &&
                tours.map((item, index) => <CardTour key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
        />
      </MDBRow>
    </div>
  );
};
export default Home;
