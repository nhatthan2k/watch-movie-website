import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute } from './Route/Routes';
// user
import Header from './Layout/component/Header/Header';
import Navbar from './Layout/component/Navbar/Navbar';
import Footer from './Layout/component/Footer/Footer';
import Register from './Pages/Register/Register';
import FilmPage from './Pages/FilmPage/FilmPage';
import IntroMovie from './Pages/ItroMovie/IntroMovie';
import WatchMoviePage from './Pages/WatchMoviePage/WatchMoviePage';
import createMovie from './Pages/movieControl/createMovie/createMovie';
import UserPage from './Pages/user/UserPage/UserPage';
import editMovie from './Pages/movieControl/editMovie/editMovie';
import editUser from './Pages/user/editUser/editUser';
// admin
import AdminHome from './Pages/admin/home/AdminHome';
import IndexAdminHome from './Pages/admin/IndexAdminHome';
import ManageCategory from './Pages/admin/products/ManageCategory';
import ManageColor from './Pages/admin/products/ManageColor';
import ManageCoupon from './Pages/admin/coupon/ManageCoupon';
import ManageOrders from './Pages/admin/orders/ManageOrders';
import ManageProduct from './Pages/admin/products/ManageProduct';
import ManageSize from './Pages/admin/products/ManageSize';
import ManageUsers from './Pages/admin/users/ManageUsers';

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
                    <Route path="/movie" Component={createMovie} />
                    <Route path="/movie/edit" Component={editMovie} />
                    <Route path="/user" Component={UserPage} />
                    <Route path="/user/edit/:id" Component={editUser} />
                    <Route path="/register" Component={Register} />
                    <Route path="/:FilmPage" Component={FilmPage} />;
                    <Route path="/phim/:IntroMovie" Component={IntroMovie} />
                    <Route path="/xem-phim/:WatchMovie" Component={WatchMoviePage} />
                </Routes>
                <Footer />
            </Router>
            {/* admin */}
            <Routes>
                <Route path="/admin" Component={IndexAdminHome}>
                    {/* dashboard */}
                    <Route index Component={AdminHome}></Route>
                    {/* orders */}
                    <Route path="/admin/orders" Component={ManageOrders}></Route>
                    {/* products */}
                    <Route path="/admin/category" Component={ManageCategory}></Route>
                    <Route path="/admin/product" Component={ManageProduct}></Route>
                    <Route path="/admin/color" Component={ManageColor}></Route>
                    <Route path="/admin/size" Component={ManageSize}></Route>
                    {/* coupon */}
                    <Route path="/admin/coupon" Component={ManageCoupon}></Route>
                    {/* users */}
                    <Route path="/admin/users" Component={ManageUsers}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
