import { DEFAULT_USER_IMG_URL } from "lib/utils/constant";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import ActiveLink from "./ActiveLink";

const Header = () => {
  const { data: session } = useSession();

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

          {session && (
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
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link ng-binding"
                  activeClassName="active"
                  href={`/profile/${session.user?.name}`}
                >
                  <img
                    className="user-pic"
                    src={session.user?.image || DEFAULT_USER_IMG_URL}
                  />
                  {session.user?.name}
                </ActiveLink>
              </li>
            </>
          )}
          {!session && (
            <>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/auth/login"
                  activeClassName="active"
                >
                  Sign in
                </ActiveLink>
              </li>
              <li className="nav-item">
                <ActiveLink
                  className="nav-link"
                  href="/auth/register"
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
