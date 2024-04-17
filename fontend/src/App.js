import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoute } from './Route/Routes';
// user
import Register from './Pages/Register/Register';
import FilmPage from './Pages/FilmPage/FilmPage';
import IntroMovie from './Pages/ItroMovie/IntroMovie';
import WatchMoviePage from './Pages/WatchMoviePage/WatchMoviePage';
// admin
import AdminHome from './Pages/admin/home/AdminHome';
import IndexAdminHome from './Pages/admin/IndexAdminHome';
import ManageGenre from './Pages/admin/movie/ManageGenre';
import ManageSeason from './Pages/admin/movie/ManageSeason';
// import ManageCoupon from './Pages/admin/coupon/ManageCoupon';
// import ManageOrders from './Pages/admin/orders/ManageOrders';
import ManageMovie from './Pages/admin/movie/ManageMovie';
import ManageEpisode from './Pages/admin/movie/ManageEpisode';
import ManageUsers from './Pages/admin/users/ManageUsers';
// 404
import page404 from './Pages/404 Page/404';

function App() {
    const NotFilmPageArr = publicRoute.filter((item) => item.component !== FilmPage);

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* user */}
                    {NotFilmPageArr.map((RouteItem, index) => {
                        return <Route path={RouteItem.path} exact Component={RouteItem.component} key={index} />;
                    })}
                    <Route path="/register" Component={Register} />
                    <Route path="/:FilmPage" Component={FilmPage} />
                    <Route path="/phim/:IntroMovie" Component={IntroMovie} />
                    <Route path="/xem-phim/:WatchMovie" Component={WatchMoviePage} />

                    {/* error */}
                    <Route path="/error/404" Component={page404} />

                    {/* admin */}
                    {user && user.roles ? (
                        user.roles.includes('ROLE_ADMIN') ? (
                            <Route path="/admin" Component={IndexAdminHome}>
                                {/* dashboard */}
                                <Route index Component={AdminHome}></Route>
                                {/* orders */}
                                {/* <Route path="/admin/orders" Component={ManageOrders}></Route> */}
                                {/* movie */}
                                <Route path="/admin/genre" Component={ManageGenre}></Route>
                                <Route path="/admin/movie" Component={ManageMovie}></Route>
                                <Route path="/admin/season" Component={ManageSeason}></Route>
                                <Route path="/admin/episode" Component={ManageEpisode}></Route>
                                {/* coupon */}
                                {/* <Route path="/admin/coupon" Component={ManageCoupon}></Route> */}
                                {/* users */}
                                <Route path="/admin/users" Component={ManageUsers}></Route>
                            </Route>
                        ) : (
                            <Route path="/admin/*" element={<Navigate to="/error/404" />} />
                        )
                    ) : (
                        <Route path="/admin/*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
