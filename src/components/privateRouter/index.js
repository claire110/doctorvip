// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// // token
// import { getToken } from "../../utils/session";


// const PrivateRouter =({component: Component, ...rest}) => {
//     return (
//         <Route
//           {...rest}
//           render={routeProps => (
//           getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
//           //getToken() === 200 ? <Component {...routeProps} /> : <Redirect to="/" />
//           )}
//         />
//       );
// }

// export default PrivateRouter;
import React, {useState, useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
//baseurl
import { baseUrl } from '../../service.json'

const PrivateRouter = ({component: Component, ...rest}) => {

  const [ isAuthenticated, setIsAuthenticated ] = useState(null)

  useEffect(() => {
    
    // function getToken(){
    axios.get(
      `${baseUrl}/api/api.php?action=admin_loggedin`,

      // samesite
      // (req, res) => {const cookie = "user=hussein; SameSite=none; secure";
      // res.setHeader("set-cookie", [cookie]);
      // res.send("ok");
      // },
      

      {withCredentials: true},

    ) 
    .then(() => setIsAuthenticated(true))
    .catch(() => setIsAuthenticated(false))
  }, [])

  return (
    <Route
      {...rest}
      render={routeProps => (
        isAuthenticated === null
          ? null
          : isAuthenticated === false
            ? <Redirect to="/" />
            : <Component {...routeProps} />
      )}
    />
  );
}

export default PrivateRouter;