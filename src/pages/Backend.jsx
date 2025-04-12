import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function BackendPage() {
  const location = useLocation();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.responseData) {
      setResponseData(location.state.responseData);
    }
  }, [location]);

  return (
    <div>
      {responseData ? (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      ) : (
      <p> From Backend</p>
      )}
    </div>
  );
}

export default BackendPage;
