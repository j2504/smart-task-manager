import { NavLink } from 'react-router-dom';
import { ThemeContext } from "../context/ThemeContext"
import { useContext } from 'react';

/**
* Sidebar navigation for main sections of the app
*/

function Sidebar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className='d-flex flex-column flex-shrink-0 p-3 bg-light' style={{ width: '250px', height: '100vh' }}>
            <h4 className='text-primary fw-bold'>🧠SmartTask</h4>
            {/** Dark/Light toggle button */}
            <button className={`btn btn-sm ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                onClick={toggleTheme}>
                {theme === 'dark' ? ' ☀ Light Mode' : ' 🌙 Dark Mode'}
            </button>
            <hr />
            <ul className='nav nav-pills flex-column mb-auto'>
                <li className='nav-item'>
                    <NavLink to='/' className='nav-link text-dark'>
                        📃 Task List
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/calendar' className='nav-link text-dark'>
                        📆 Calendar
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/settings' className='nav-link text-dark'>
                        ⚙ Settings
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/about' className=' nav-link text-dark'>
                        ℹ About
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div>
                <NavLink to="/login" className='nav-link text-dark'> 🔐 Login</NavLink>
            </div>
        </div>
    );
}

export default Sidebar;