import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const dataContext = createContext();

const Context = (props) => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const getData = await axios.get(
        "https://mocki.io/v1/2983e1e0-0c29-4467-98a0-618a9f1f3176"
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
