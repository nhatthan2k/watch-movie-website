import AdminNavbar from '../../component/navbar/AdminNavbar';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../component/sidebar/SidebarAdmin';
import { useState } from 'react';

function IndexAdminHome() {
    const [toggle, setToggle] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleToggleNavbar = () => {
        setToggle(!toggle);
        setExpanded(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <SidebarAdmin
                toggle={toggle}
                handleToggleNavbar={handleToggleNavbar}
                expanded={expanded}
                handleChange={handleChange}
            />
            <div style={{ marginLeft: toggle ? '70px' : '275px' }}>
                <AdminNavbar />
                <div
                    style={{
                        padding: '24px',
                        background: '#dfe6e9',
                        height: 'calc( 100vh - 45px )',
                        maxHeight: 'calc( 100vh - 45px )',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default IndexAdminHome;
