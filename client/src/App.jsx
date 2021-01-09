import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import GameRPG from './pages/depreciated/GameRPG';
import Homepage from './pages/Homepage';
import Landing from './pages/Landing';
import Login from './pages/depreciated/Login';
// import Navbar from './components/depreciated/Navbar';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Search from './pages/depreciated/Search';
import SideNav from './components/NavbarComponents/SideNav';
import Signup from './pages/depreciated/Signup';
import Slider from './components/SidebarComponents/Slider';
import SocialSpace from './pages/SocialSpace';
import UserRoom from './pages/UserRoom';
import GlobalProvider from './utils/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
// Temporary pages 
import RoomGUI from './pages/RoomGUI';
import Space from './pages/Space';

import { Container } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

    const storedUser = JSON.parse(localStorage.getItem('USER'));

    return (
        <Router>
            <GlobalProvider>
                
                {storedUser && <SideNav />}
                {/* <Navbar /> */}

                {/* Toastify container for notification */}
                <ToastContainer transition={Zoom} autoClose={3000} />

                <main style={{height: 'l00%'}}>
                    {storedUser && <Slider />}
                    <Container>
                        <Switch>
                            {!storedUser && <Route exact path='/' component={Landing} />}
                            {storedUser && <Route exact path='/' component={Homepage} />}
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
                            <Route exact path='/game' component={GameRPG} />
                            {/* Temporary RoomUser Page */}
                            <Route exact path='/room' component={RoomGUI} />
                            {/* Temporary Social Space Page  */}
                            <Route exact path='/space' component={Space} />
                        </Switch>
                    </Container>
                </main>
                {storedUser && <Footer />}


            </GlobalProvider>
        </Router>
    );
}


export default App;