import React, { useState } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiMenu } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import '../Css/navBar.css';
import '../Css/test.css'
import { IoSearch } from "react-icons/io5";
import ModalComponent from "../pages/IdValidation"

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar className="navbar fixed-top" expand="lg">
      <Container fluid className="d-flex align-items-center justify-content-between px-3">
        <Link className="nav-logo d-flex align-items-center navbar-brand" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src='/src/logo/Group 34198.svg' alt="Logo" />
        </Link>

        <button
          className="navbar-toggler btn-tog"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="offcanvas offcanvas-start nav-bgc" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title h5-color" id="offcanvasNavbarLabel">القائمة </h5>
            <button type="button" className="btn-close d-flex close-fixed " data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>

          <div className="offcanvas-body">
            <Nav className="ms-auto mt-2">
              <Link to="/" className="nav-link text-white focus-indicator" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>الرئيسية</Link>
              <Link to="/services" className="nav-link text-white focus-indicator"> خداماتنا </Link>
              <Link to="#contact" className="nav-link text-white focus-indicator"> متابعة الطلبات </Link>

              <div className="d-lg-none mt-3">
                <h5 className='h5-color'>__________________________________________</h5>
                <h5 className='h5-color mt-4 mb-4'> <FiMenu size={30} color="white" /> المزيد</h5>
                <Link to="/questions" className="nav-link text-end"><FaChevronLeft className="ms-2" />الأسئلة الشائعة </Link>
                <Link to="#complaints" className="nav-link text-end"><FaChevronLeft className="ms-2" />الشكاوى والمقترحات </Link>
                <Link to="#privacy" className="nav-link text-end"><FaChevronLeft className="ms-2" />سياسة الخصوصية </Link>
                <Link to="#terms" className="nav-link text-end"><FaChevronLeft className="ms-2" />شروط الاستخدام </Link>
              </div>
            </Nav>
            <div className="search-container search-Wel">
              <input
                className="form-control searchInput "
                type="search"
                placeholder="ابحث هنا ....  "
                aria-label="Search"
              />
              <button className=" btn-search" type="button">
                <IoSearch size={30} />
              </button>
            </div>
            <div className="d-flex mt-2">
              <button type='button' className="btn nav-btn btn-outline-success px-4 py-2 fs-5 mb-2" onClick={() => setShowModal(true)}>
                <MdPerson size={30} /> تسجيل الدخول
              </button>
              <ModalComponent show={showModal} handleClose={() => setShowModal(false)} />
              <div className="d-none d-lg-block ">
                <Dropdown show={dropdownOpen} onToggle={(isOpen) => setDropdownOpen(isOpen)}>
                  <Dropdown.Toggle className="no-caret btn nav-btn btn-outline-success me-2 px-4 py-2 fs-5" variant="success">
                    <FiMenu size={30} color="white" /> المزيد
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link className="dropdown-item" to="/questions" onClick={handleDropdownItemClick}>الأسئلة الشائعة</Link>
                    <Link className="dropdown-item" to="/questions" onClick={handleDropdownItemClick}> الشكاوى والمقترحات</Link>
                    <Link className="dropdown-item" to="/questions" onClick={handleDropdownItemClick}> سياسة الخصوصية</Link>
                    <Link className="dropdown-item" to="/questions" onClick={handleDropdownItemClick}>شروط الاستخدام</Link>
         
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;