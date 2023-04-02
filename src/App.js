import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



class App extends React.Component {
  
  render() {
    return (
      <>
        <Router>
          <Header />
          <Login/>
          <Profile />
          <Logout/>
          <Routes>
            <Route 
              exact path="/about"
              element={<About />}
            >
            </Route>
            <Route
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
