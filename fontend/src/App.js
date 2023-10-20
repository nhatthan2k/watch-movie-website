import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute } from './Route/Routes';

import Header from './Layout/component/Header/Header';
import Navbar from './Layout/component/Navbar/Navbar';
import Footer from './Layout/component/Footer/Footer';
import FilmPage from './Pages/FilmPage/FilmPage';
import IntroMovie from './Pages/ItroMovie/IntroMovie';
import WatchMoviePage from './Pages/WatchMoviePage/WatchMoviePage';

function App() {
    const NotFilmPageArr = publicRoute.filter((item) => item.component !== FilmPage);

    return (
        <div className="App">
            <Router>
                <Header />
                <Navbar />
                <Routes>
                    {NotFilmPageArr.map((RouteItem, index) => {
                        return <Route path={RouteItem.path} exact Component={RouteItem.component} key={index} />;
                    })}
                    <Route path="/:FilmPage" Component={FilmPage} />;
                    <Route path="/phim/:IntroMovie" Component={IntroMovie} />
                    <Route path="/xem-phim/:WatchMovie" Component={WatchMoviePage} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
