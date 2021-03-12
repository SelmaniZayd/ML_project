import React from 'react';
import { router } from '../../Router';
import { NavLink, Route } from 'react-router-dom';

const Header = () => <header>
    <div>
        {
            router.map((prop, key) => 
                !prop.redirect
                ? <NavLink to={prop.path} key={key} className="nav-link">
                    {prop.name}
                    </NavLink>
                : <Route path={prop.path} component={prop.component} key={key} />
            )
        }
    </div>
</header>

export default Header;