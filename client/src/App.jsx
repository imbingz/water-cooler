import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Rooms from './pages/Rooms';
import SocialSpace from './pages/SocialSpace';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
        <Navbar />

        <div className="App">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/search' component={Search} />
            {/* will be profile:id */}
            <Route exact path='/profile' component={Profile} />
            {/* will be room:id */}
            <Route exact path='/rooms' component={Rooms} />
            {/* will be socialspace:id */}
            <Route exact path='/socialspace' component={SocialSpace} />
          </Switch>
        </div>
    </Router>
  );
}


export default App;