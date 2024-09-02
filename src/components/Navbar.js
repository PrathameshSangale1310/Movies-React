import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    let location = useLocation();

    const [query, setQuery] = useState("");
    const navigate = useNavigate(); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/popular" style={{ paddingLeft: "125px" }}>
                    Moviedb
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="d-flex ms-auto align-items-center" style={{ paddingRight: "125px" }}>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/popular'?"active":""}`} aria-current="page" to="/popular">Popular</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/toprated'?"active":""}`} to="/toprated">Top Rated</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/upcoming'?"active":""}`} to="/upcoming">Upcoming</Link>
                            </li>
                        </ul>
                        <form className="d-flex ms-3" role="search" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit" style={{backgroundColor:"#a7b2b2", color:"black"}}>Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
