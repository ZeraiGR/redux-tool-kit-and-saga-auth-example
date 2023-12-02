import { Menu } from '@gravity-ui/uikit'
import { NavLink } from 'react-router-dom'

export const Navigation = () => {
    return (
        <nav>
            <Menu size="s" className="menu">
                <Menu.Item>
                    <NavLink to="/home">Home</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item>
                    <NavLink to="/admin">Admin</NavLink>
                </Menu.Item>
            </Menu>
        </nav>
    )
}
