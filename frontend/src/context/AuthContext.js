import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { position } from "@chakra-ui/system";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [userExist, setUserExist] = useState(false);
  const [userUserName, setUserUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMunicipality, setUserMunicipality] = useState("");
  const [userBarangay, setUserBarangay] = useState("");
  const [userPosition, setUserPosition] = useState("");
  const [userContactNum, setUserContactNum] = useState("");
  const [userImage, setUserImage] = useState(null);

  const history = useHistory();

  const loginUser = (
    formData,
    password,
    username,
    first_name,
    last_name,
    email,
    municipality,
    barangay,
    position,
    contact_number,
    image
  ) => {
    if (formData.username === username && formData.password === password) {
      setUserExist(true);
      setUserUserName(username);
      setUserName(`${first_name} ${last_name}`);
      setUserEmail(email);
      setUserMunicipality(municipality);
      setUserBarangay(barangay);
      setUserPosition(position);
      setUserContactNum(contact_number);
      setUserImage(image);
      localStorage.setItem("userExist", true);
      history.push("/admin");
    }
  };

  const logoutUser = () => {
    // setAuthTokens(null);
    setUserExist(false);
    setUserUserName("");
    setUserName("");
    setUserEmail("");
    setUserMunicipality("");
    setUserBarangay("");
    setUserPosition("");
    setUserContactNum("");
    setUserImage(null);
    localStorage.removeItem("userExist", false);
    // localStorage.removeItem("userUserName");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("userEmail");
    // localStorage.removeItem("userMunicipality");
    // localStorage.removeItem("userBarangay");
    // localStorage.removeItem("userPosition");
    // localStorage.removeItem("userContactNum");
    // localStorage.removeItem("userImage");

    history.push("/auth/signin");
  };

  useEffect(() => {
    const userExists = JSON.parse(localStorage.getItem("userExist"));
    if (userExists) {
      setUserExist(true);
    }
  }, []);

  let contextData = {
    userExist,
    userUserName,
    userName,
    userEmail,
    userMunicipality,
    userBarangay,
    userPosition,
    userContactNum,
    userImage,
    loginUser,
    logoutUser,
    setUserImage,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

// export const AuthProvider = ({ children }) => {
//   let [authTokens, setAuthTokens] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? JSON.parse(localStorage.getItem("authTokens"))
//       : null
//   );
//   let [user, setUser] = useState(() =>
//     localStorage.getItem("authTokens")
//       ? jwt_decode(localStorage.getItem("authTokens"))
//       : null
//   );
//   let [loading, setLoading] = useState(true);

//   const history = useHistory();

//   let loginUser = async (e) => {
//     e.preventDefault();
//     let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: e.target.username.value,
//         password: e.target.password.value,
//       }),
//     });
//     let data = await response.json();

//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));
//       localStorage.setItem("authTokens", JSON.stringify(data));
//       history.push("/admin");
//     } else {
//       alert("Something went wrong!");
//     }
//   };

//   let logoutUser = () => {
//     setAuthTokens(null);
//     setUser(null);
//     localStorage.removeItem("authTokens");
//     history.push("/auth/signin");
//   };

//   let updateToken = async () => {
//     let response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refresh: authTokens?.refresh }),
//     });

//     let data = await response.json();

//     if (response.status === 200) {
//       setAuthTokens(data);
//       setUser(jwt_decode(data.access));
//       localStorage.setItem("authTokens", JSON.stringify(data));
//     } else {
//       logoutUser();
//     }

//     if (loading) {
//       setLoading(false);
//     }
//   };

//   let contextData = {
//     user: user,
//     authTokens: authTokens,
//     loginUser: loginUser,
//     logoutUser: logoutUser,
//   };

//   useEffect(() => {
//     if (loading) {
//       updateToken();
//     }

//     let fourMinutes = 1000 * 60 * 4;

//     let interval = setInterval(() => {
//       if (authTokens) {
//         updateToken();
//       }
//     }, fourMinutes);
//     return () => clearInterval(interval);
//   }, [authTokens, loading]);

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };
