import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Home, Login } from "./pages";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { useUserContext } from "./contexts/userContext";
import ListYourCar from "./pages/ListYourCar";
import ListNewCar from "./pages/ListNewCar";
import EditCar from "./pages/EditCar";
import Cars from "./pages/Cars";
import BookCar from "./pages/BookCar";
import Bookings from "./pages/Bookings";
import BookingStats from "./pages/BookingStats";

const Layout = () => {
  const { user } = useUserContext();
  // const user = null;
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className=" ">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/listyourcar" element={<ListYourCar />} />
            <Route path="/listNewCar" element={<ListNewCar />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/editCar/:carId" element={<EditCar />} />
            <Route path="/bookingStats" element={<BookingStats />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/bookCar/:carId" element={<BookCar />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
