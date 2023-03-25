import React from 'react';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import {useRoutes} from "./routes";
import 'materialize-css';

function App() {
    const routes = useRoutes(true)
    return (
        <Router>
            <div className="container">
                <Routes>
                    {routes}
                </Routes>
            </div>
        </Router>
    )

}

export default App;
