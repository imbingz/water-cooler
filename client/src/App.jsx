import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalProvider from './utils/GlobalContext';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/depreciated/Login';
import Profile from './pages/Profile';
import GameRPG from './pages/depreciated/GameRPG';
import Rooms from './pages/Rooms';
import Search from './pages/Search';
import SocialSpace from './pages/SocialSpace';
import UserRoom from './pages/UserRoom';
import Footer from './components/Footer';
import Landing from './pages/Landing';
// import Navbar from './components/depreciated/Navbar';
import Slider from './components/SidebarComponents/Slider';
import SideNav from './components/NavbarComponents/SideNav';

import {Row, Col} from 'react-bootstrap';
import './App.css';

function App() {

    const storedUser = JSON.parse(localStorage.getItem('USER'));

    return (
        <Router>
            <GlobalProvider>
                <Row >

                    {storedUser && <Slider /> }

                    <Col md className='mx-0 px-0 main-col'>

                        {storedUser && <SideNav />} 

                        {/* <Navbar /> */}

                        <main>
                            <Switch>
                                { !storedUser && <Route exact path='/' component={Landing} /> }
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
                                <Route exact path='/game' component={ GameRPG} />
                            </Switch>
                        </main>
                        {storedUser && <Footer />}
                    </Col>
                </Row>
            </GlobalProvider>
        </Router>
    );
}


export default App;