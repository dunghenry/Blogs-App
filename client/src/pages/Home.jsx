import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
const Home = () => {
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
      <h1>Hi</h1>
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
export default Home