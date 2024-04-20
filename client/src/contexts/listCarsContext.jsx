import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { apiRequest } from "../utils";
import { useUserContext } from "./userContext";

const listCarsContext = createContext();

// reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CARS":
      return {
        ...state,
        listedCars: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  listedCars: [],
};

const ListCarsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [listedCars, setCars] = useState([]);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      if (user.token == undefined) {
        return;
      }

      const res = await apiRequest({
        url: `/car/fetchListedCars?userId=${user._id}`,
        method: "GET",
        token: user?.token,
      });

      setCars(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <listCarsContext.Provider
      value={{
        ...state,
        fetchCars,
        listedCars,
        loading,
      }}
    >
      {children}
    </listCarsContext.Provider>
  );
};

const useListCarsContext = () => {
  return useContext(listCarsContext);
};

export { ListCarsContextProvider, useListCarsContext };
