import React from 'react'
import {Route, Routes} from "react-router-dom";
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';
import Footer from './Footer.js';

import routes from '../../routes/routes.js';

function MasterLayout() {
  return (
    <div className='sb-nav-fixed'>
        <Navbar/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar/>
            </div>
            <div id="layoutSidenav_content">
            <main>
                <Routes>
                    {routes.map((route, idx) =>
                        route.Component && (
                            <Route
                                key={idx}
                                path={route.path}
                                element={<route.Component/>}
                            />
                        )
                    )}
                </Routes>
            </main>
            <Footer/>
        </div>
        </div>
    </div>
  )
}

export default MasterLayout
