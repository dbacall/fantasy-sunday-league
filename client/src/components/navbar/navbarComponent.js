import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar-styles.module.scss';
import { ReactComponent as CloseMenu } from '../../assets/x-mark.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import classNames from 'classnames';

const Navbar = ({ user, logout }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const openMenu = () => {
    setMobileMenu(true);
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    logout();
    closeMenu();
  };

  return (
    <section className={styles.navbar}>
      <nav>
        <Link to="/" className={styles.title} onClick={closeMenu}>
          <span>Fantasy Sunday League</span>
        </Link>
        {user ? (
          <div
            className={classNames(styles.navButtons, {
              [styles.active]: mobileMenu,
            })}
          >
            <Link
              to="/my-sunday-leagues"
              className={styles.navButton}
              onClick={closeMenu}
            >
              My Sunday Leagues
            </Link>
            <Link to="/" className={styles.navButton} onClick={closeMenu}>
              My Fantasy Leagues
            </Link>
            <a className={styles.navButton} onClick={onLogoutClick}>
              Logout
            </a>
          </div>
        ) : null}
        {user ? (
          <div
            className={styles.mobileMenuIcon}
            onClick={mobileMenu ? closeMenu : openMenu}
          >
            {mobileMenu ? (
              <CloseMenu className={styles.menuIcon} />
            ) : (
              <MenuIcon className={styles.menuIcon} />
            )}
          </div>
        ) : null}
      </nav>
    </section>
  );
};

export default Navbar;
