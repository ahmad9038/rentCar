import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const userContext = createContext();

// reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };

    case "USER_LOGOUT":
      state.user = null;
      localStorage?.removeItem("user");

    case "UPDATE_PROFILE":
      state.edit = action.payload;

    default:
      return state;
  }
};

const initialState = {
  user: JSON.parse(window?.localStorage.getItem("user")) ?? {},
  edit: false,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [edit, setEdit] = useState(false);

  state.edit = edit;

  const UserLogin = (user) => {
    dispatch({ type: "USER_LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  const updateProfile = (val) => {
    dispatch({ type: "UPDATE_PROFILE", payload: val });
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        setEdit,
        UserLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(userContext);
};

export { UserProvider, useUserContext };
