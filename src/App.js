import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import DoctorListingPage from './doctorlistingpage';
import ProtectedRoute from './protectedRoute';
import Doctorbooking from './components/doctorbooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route 
          path="/doctorlistingpage" 
          element={
            <ProtectedRoute>
              <DoctorListingPage/>
            </ProtectedRoute>
          } 
        />
        <Route
      path="/doctorbooking/:id"
      element={
        <ProtectedRoute>path("health_check/",views.wakeup)
          <Doctorbooking/>
        </ProtectedRoute>
      }
      />
      </Routes>
      
    </Router>
  );
}

export default App;