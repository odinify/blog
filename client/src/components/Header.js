import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthContext';

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container header__container">
        <h2 className="header__brand">وبلاگ</h2>
        <nav className="header__nav">
          <ul className="header__menu">
            <li className="header__item">
              <Link to="/" className="header__link">
                خانه
              </Link>
            </li>
            {auth.isLoggedIn ? (
              <>
                <li className="header__item">
                  <Link to="/" className="header__link">
                    {auth.user.username}
                  </Link>
                </li>
                <li className="header__item">
                  <Link
                    to="/"
                    className="header__link"
                    onClick={() => auth.logout()}
                  >
                    خروج
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="header__item">
                  <Link to="/register" className="header__link">
                    ثبت نام
                  </Link>
                </li>
                <li className="header__item">
                  <Link to="/login" className="header__link">
                    ورود
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
