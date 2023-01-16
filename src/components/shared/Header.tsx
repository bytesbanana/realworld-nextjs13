import storage from "fetcher/storage";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { UserResponse } from "types/response";
import ActiveLink from "./ActiveLink";

const Header = () => {
  const { data: currentUser } = useSWR<UserResponse>("user", storage);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" href="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <ActiveLink className="nav-link" href="/" activeClassName="active">
              Home
            </ActiveLink>
          </li>
          {currentUser && (
            <>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/editor"
                  activeClassName="active"
                >
                  {" "}
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/settings"
                  activeClassName="active"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/profile/chivas23_01"
                  activeClassName="active"
                >
                  <img
                    className="user-pic"
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                  />
                  {currentUser.user.username}
                </ActiveLink>
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/login"
                  activeClassName="active"
                >
                  Sign in
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/register"
                  activeClassName="active"
                >
                  Sign up
                </ActiveLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
