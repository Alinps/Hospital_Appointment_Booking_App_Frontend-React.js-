import { createBrowserRouter } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import DoctorListingPage from "./components/doctorlistingpage";
import Doctordetails from "./components/doctordetails";
import Doctorbooking from "./components/doctorbooking";
import Myappointments from "./components/myappointments";
import Changepassword from "./components/changepassword";
import Landingpage from "./components/landingpage";
const router = createBrowserRouter([
    { path: '/', element: <Landingpage/> },
    {path:'/login',element:<Login/>},
    { path:'/signup',element:<Signup/>},
    { path:'/doctorlistingpage',element:<DoctorListingPage/>},
    { path:'/doctordetails',element:<Doctordetails/>},
    { path:'/doctorbooking/:id',element:<Doctorbooking/>},
    { path:'/myappointments',element:<Myappointments/>},
    { path:'/changepassword',element:<Changepassword/>},
    
]);

export default router;