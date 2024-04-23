import './style.css';

import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

function SidebarAdmin({ toggle, handleToggleNavbar, expanded, handleChange }) {
    const link = [
        // {
        //   id: 1,
        //   icon: <DescriptionOutlinedIcon className="nav_icon" />,
        //   subMenu: [{ id: 1, path: "/admin/orders", text: "Orders" }],
        //   text: "Orders",
        // },
        {
            id: 1,
            icon: <SlideshowOutlinedIcon className="nav_icon" />,
            subMenu: [
                { id: 1, path: '/admin/genre', text: 'Genres' },
                { id: 2, path: '/admin/movie', text: 'Movies' },
                { id: 3, path: '/admin/season', text: 'Season' },
            ],
            text: 'Movies',
        },
        // {
        //   id: 3,
        //   icon: <LocalActivityIcon className="nav_icon" />,
        //   subMenu: [{ id: 1, path: "/admin/coupon", text: "Coupons" }],
        //   text: "Coupon",
        // },
        {
            id: 2,
            icon: <GroupsOutlinedIcon className="nav_icon" />,
            subMenu: [{ id: 1, path: '/admin/users', text: 'Users' }],
            text: 'User',
        },
    ];

    const [active, setActive] = useState(localStorage.getItem('active'));

    const handleActiveSideBar = (text) => {
        setActive(text);
        localStorage.setItem('active', JSON.stringify(text));
    };

    useEffect(() => {
        // navigate("/");
    }, []);

    return (
        <div className="l-navbar">
            <div
                className="nav"
                style={{
                    width: toggle ? '55px' : '260px',
                }}
            >
                <div>
                    <div className="navbar__logo">
                        {toggle ? (
                            <HomeOutlinedIcon className="nav_icon" />
                        ) : (
                            <Link to={'/admin'}>
                                <HomeOutlinedIcon className="nav_icon" /> ADMIN
                            </Link>
                        )}
                    </div>
                    {toggle ? (
                        <KeyboardArrowRightIcon
                            sx={{ fontSize: '25px' }}
                            onClick={handleToggleNavbar}
                            className="nav_toggle_icon flex justify-center items-center"
                        />
                    ) : (
                        <KeyboardArrowLeftIcon
                            sx={{ fontSize: '25px' }}
                            onClick={handleToggleNavbar}
                            className="nav_toggle_icon flex justify-center items-center"
                        />
                    )}
                    <div className="nav_toggle">
                        <ul className="nav__list">
                            {active === 'Dashboard' ? (
                                <Link
                                    to={'/admin'}
                                    onClick={() => handleActiveSideBar('Dashboard')}
                                    className="nav__link active"
                                >
                                    <DashboardOutlinedIcon className="nav_icon" /> {toggle ? '' : 'Dashboard'}
                                </Link>
                            ) : (
                                <Link
                                    to={'/admin'}
                                    onClick={() => handleActiveSideBar('Dashboard')}
                                    className="nav__link"
                                >
                                    <DashboardOutlinedIcon className="nav_icon" /> {toggle ? '' : 'Dashboard'}
                                </Link>
                            )}
                            {link.map((item, index) =>
                                toggle ? (
                                    <div key={item.id} className="nav__link">
                                        {item.icon}
                                    </div>
                                ) : (
                                    <Accordion
                                        key={item.id}
                                        sx={{ bgcolor: '#13192c', color: '#ededed' }}
                                        expanded={active === item.text || expanded === `panel${index}`}
                                        disableGutters={true}
                                        onChange={handleChange(`panel${index}`)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{ color: '#ededed' }} />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            sx={{ borderRadius: '8px', marginBottom: '3px' }}
                                            className={active === item.text ? 'link_header active' : ''}
                                        >
                                            {item.icon}
                                            {item.text}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {item.subMenu &&
                                                item.subMenu.map((subItem) => (
                                                    <NavLink
                                                        key={subItem.id}
                                                        to={subItem.path}
                                                        className="sub_link_sidebar"
                                                        onClick={() => handleActiveSideBar(item.text)}
                                                    >
                                                        <span>{subItem.text}</span>
                                                    </NavLink>
                                                ))}
                                        </AccordionDetails>
                                    </Accordion>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
