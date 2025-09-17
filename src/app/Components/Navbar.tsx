import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark bg-opacity-75 fixed-top text-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          CSE3CWA-CSE5006 Blogs ...
        </Link>
        <div className={styles.container}>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
            <div className={isOpen ? styles.barOpen : styles.bar}></div>
          </div>
          <nav className={isOpen ? styles.menuOpen : styles.menu}>
            <ul>
              <li>
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/createblog" passHref>
                  Create New Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
