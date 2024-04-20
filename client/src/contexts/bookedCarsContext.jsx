import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUserContext } from "./userContext";
import { apiRequest } from "../utils";

const bookedCarsContext = createContext();

const BookedCarsContextProvider = ({ children }) => {
  const [BookedCars, setBookedCars] = useState([]);
  const [bookingStats, setBookingStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  // for clients
  const fetchBookings = async () => {
    setLoading(true);
    try {
      if (user.token == undefined) {
        return;
      }
      const res = await apiRequest({
        url: `/bookings/getBookedCars/${user._id}`,
        method: "GET",
        token: user?.token,
      });

      setBookedCars(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // for sellers
  const fetchBookingStats = async () => {
    setLoading(true);
    try {
      if (user.token == undefined) {
        return;
      }
      const res = await apiRequest({
        url: `/bookings/getBookingStats/${user._id}`,
        method: "GET",
        token: user?.token,
      });

      setBookingStats(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchBookingStats();
  }, []);

  return (
    <bookedCarsContext.Provider
      value={{
        BookedCars,
        loading,
        bookingStats,
        fetchBookingStats,
        fetchBookings,
      }}
    >
      {children}
    </bookedCarsContext.Provider>
  );
};

const useBookedCarsContext = () => {
  return useContext(bookedCarsContext);
};

export { BookedCarsContextProvider, useBookedCarsContext };
