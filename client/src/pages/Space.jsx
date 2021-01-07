import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import {MdExpandMore} from 'react-icons/md';
import './Space.css';
import {RiMoreLine} from 'react-icons/ri';

function Space() {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    return (
        <Container className='d-flex flex-row'>
            <section style={{background:'pink'}} className='Space-video-section'>
                <div className='d-flex justify-content-end'>
                    <button className='Sidenav-header-icon-btn'>
                        <RiMoreLine size={30} style={{fill: 'grey'}} onClick={showSidebar}/>
                    </button>
                </div>
                <div style={{background:'beige'}}>
                    vidoes
                </div>
            </section>

            <aside className={sidebar ? 'Sidenav-menu-space active' : 'Sidenav-menu-space'}>
                <div className='Sidenav-menu-items-space' >
                    <div className='Sidenav-toggle-space' >
                        <div className='d-flex justify-content-end'>
                            <button className='Sidenav-header-icon-btn'>
                                <MdExpandMore size={30} style={{fill: 'orangered'}} onClick={showSidebar}/>
                            </button>
                        </div>
                        
                    </div>
                </div>          
            </aside>
        </Container>
    );
}

export default Space;
