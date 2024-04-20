import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { apiRequest } from "../utils";

const carContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "SAVE_DATA":
      return {
        ...state,
        cars: action.payload.cars,
        totalPages: action.payload.totalPages,
      };

    case "QUERY":
      return {
        ...state,
        currentPage: 1,
        query: action.payload,
      };

    case "PREV_PAGE":
      let page = state.currentPage;
      if (page > 0) {
        page = 1;
      } else {
        page = page - 1;
      }
      return {
        ...state,
        currentPage: page,
      };

    case "NEXT_PAGE":
      let pages = state.currentPage;
      if (pages >= state.totalPages) {
        pages = 1;
      } else {
        pages = pages + 1;
      }
      return {
        ...state,
        currentPage: pages,
      };
    default:
      return state;
  }
};

const initialState = {
  currentPage: 1,
  query: "",
  nbPages: 0,
  page: 0,
  limit: 12,
  cars: [],
  totalPages: 0,
};

const CarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const saveCars = (data) => {
    dispatch({ type: "SAVE_DATA", payload: data });
  };

  const setSearchedText = (text) => {
    dispatch({ type: "QUERY", payload: text });
  };

  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const [loading, setLoading] = useState(false);

  const getCars = async () => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: `/car/getAllCars?page=${state.currentPage}&search=${state.query}&limit=${state.limit}`,
        method: "GET",
      });

      saveCars(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [state.query, state.currentPage]);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <carContext.Provider
      value={{ ...state, setSearchedText, getPrevPage, getNextPage, loading }}
    >
      {children}
    </carContext.Provider>
  );
};

const useCarContext = () => {
  return useContext(carContext);
};

export { useCarContext, CarProvider };
