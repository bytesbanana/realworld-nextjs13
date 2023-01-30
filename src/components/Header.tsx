import { DEFAULT_USER_IMG_URL } from "lib/utils/constant";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="">
              Home
            </a>
          </li>

          {session && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="">
                  {" "}
                  <i className="ion-compose"></i>&nbsp;New Article{" "}
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/settings">
                  {" "}
                  <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link ng-binding"
                  ui-sref-active="active"
                  href="#/@chivas23_01"
                >
                  <img
                    className="user-pic"
                    src={session.user.image || DEFAULT_USER_IMG_URL}
                  />
                  {session.user.name}
                </a>
              </li>
            </>
          )}
          {!session && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/auth/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/auth/register">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
