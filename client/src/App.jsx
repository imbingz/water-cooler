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
import Slider from './components/Slider';
// import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Landing from './pages/Landing';

// Temporary pages 
import RoomGUI from './pages/RoomGUI';
import Space from './pages/Space';

import {Row, Col, Container} from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
                    
                        {/* Toastify container for notification */}
                        <ToastContainer transition={Zoom} autoClose={3000} />
                    
                        <main>
                            <Container>
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
                                    {/* Temporary RoomUser Page */}
                                    <Route exact path='/room' component={ RoomGUI} />
                                    {/* Temporary Social Space Page  */}
                                    <Route exact path='/space' component={ Space} />
                                </Switch>
                            </Container>
                        </main>
                        {storedUser && <Footer />}
                    </Col>
                </Row>
            </GlobalProvider>
        </Router>
    );
}


export default App;