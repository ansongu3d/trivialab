import React from "react";
import {
  CDBFooter,
  CDBBox,
} from "cdbreact";

export const Footer = () => {
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: "100%" }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-6 copyright">© Copyright 2022 Trivia Lab</div>
            <div className="col-6 social-icons">
              <i className="social-icon fab fa-facebook-f"></i>
              <i className="social-icon fab fa-twitter"></i>
              <i className="social-icon fab fa-instagram"></i>
              <i className="social-icon fas fa-envelope"></i>
            </div>
          </div>
        </div>
      </CDBBox>
    </CDBFooter>
  );
};