// Unauthorized.jsx
import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="unauthorized">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2>Unauthorized Access</h2>
              <p>You are not authorized to access this page.</p>
              <p>Please contact your administrator for further assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
