import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

const Context = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const getData = await axios.get(
        "https://mocki.io/v1/15bd3f61-ad45-4dbb-b0d8-3fd02fcb3327"
      );
      setdata(getData.data);
    };
    apiCall();
  }, []);

  return (
    <dataContext.Provider value={{ data, setdata }}>
      {props.children}
    </dataContext.Provider>
  );
};

export default Context;
