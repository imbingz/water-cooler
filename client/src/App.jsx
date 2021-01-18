import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import RoomGUI from './pages/RoomGUI';
import SocialSpace from './pages/SocialSpace';
import Space from './pages/Space';
import Footer from './components/Footer';
import Loading from './components/Loading';
import LoginModal from './components/Modals/LoginModal';
import SideNav from './components/NavbarComponents/SideNav';
import Slider from './components/SidebarComponents/Slider';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import { GUIProvider } from './utils/GUIProvider';
import { ChatProvider } from './utils/ChatProvider';
import { SocketProvider } from './utils/SocketProvider';
import { useGlobalContext } from './utils/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

    const [{ USER },] = useGlobalContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    if (!USER) {

        if (loading) {
            return <Loading />;
        }
        return (
            <Router>
                <main>
                    <Route exact path="/">
                        <Landing />
                        <LoginModal />
                        <ToastContainer transition={Zoom} autoClose={2000} />
                    </Route>
                    <Route path="*">
                        <Redirect to='/' />
                    </Route>
                </main>
            </Router>
        );
    }

    return (
        <Router>
            <SocketProvider>
                <GUIProvider>
                    <ChatProvider>
                        <Row >
                            <Slider />
                            <Col md className='mx-0 px-0 main-col'>
                                <SideNav />
                                <ToastContainer transition={Zoom} autoClose={3000} />      
                                <main>
                                    <Container>
                                        <Switch>
                                            <Route exact path='/' component={Homepage} />
                                            <Route exact path='/profile' component={Profile} />
                                            <Route exact path='/rooms/:id' component={RoomGUI} />
                                            <Route exact path='/rooms/:id/:id' component={SocialSpace} />
                                            <Route exact path='/space' component={Space} />
                                        </Switch>
                                    </Container>
                                </main>
                                <Footer />
                            </Col>
                        </Row>
                    </ChatProvider>
                </GUIProvider>
            </SocketProvider>
        </Router>
    );
}

export default App;