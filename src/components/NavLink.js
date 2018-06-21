import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class NavLink extends React.Component {
    render() {
        var pathName = this.context.router.route.location.pathname;
        var isActive = pathName === this.props.to || pathName.substring(0,8) === this.props.to;
        var className = isActive ? "current-page" : "";

        return(
            <li className={className}>
                <Link {...this.props}>
                    {this.props.children}
                </Link>
            </li>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object
};

export default NavLink;
