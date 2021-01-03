import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from './utils/GlobalContext';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Rooms from './pages/Rooms';
import UserRoom from './pages/UserRoom';
import SocialSpace from './pages/SocialSpace';
import GameRPG from './pages/GameRPG';
import Footer from './components/Footer';
import './App.css';
// import Navbar from './components/Navbar';
import SideNav from './components/SideNav';

function App() {
    return (
        <Router>
            <GlobalProvider>

                <SideNav />

                {/* <Navbar /> */}

                <main className="App">
                    <Switch>
                        <Route exact path='/' component={Homepage} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/search' component={Search} />
                        {/* will be profile:id */}
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/rooms' component={Rooms} />
                        <Route exact path='/rooms/:id' component={UserRoom} />
                        {/* will be socialspace:id */}
                        <Route exact path='/rooms/:id/:id' component={SocialSpace} />
                        {/* Temporary Game Page  */}
                        <Route exact path='/game' component={ GameRPG} />
                    </Switch>
                </main>

                <Footer />
            </GlobalProvider>
        </Router>
    );
}


export default App;