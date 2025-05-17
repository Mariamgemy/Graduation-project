import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import "../Css/navBar.css";
import "../Css/test.css";
import { IoSearch } from "react-icons/io5";
import CustomModal from "../pages/IdValidation";
import LoginCard from "../pages/LoginCard";
import SearchBar from "./SearchData";
import SearchData from "./SearchBox";
import SearchBox from "./SearchBox";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDropdownItemClick = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserModal(false);
  };

  const handleProfileClick = () => {
    setShowUserModal(false);
    navigate("/profile");
  };

  const handleOrdersClick = () => {
    setShowUserModal(false);
    navigate("/orders");
  };

  return (
    <Navbar className="navbar fixed-top" expand="lg">
      <Container
        fluid
        className="d-flex align-items-center justify-content-between px-3"
      >
        <Link
          className="nav-logo d-flex align-items-center navbar-brand"
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/src/logo/Group 34198.svg" alt="Logo" />
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

        <div
          className="offcanvas offcanvas-start nav-bgc"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title h5-color" id="offcanvasNavbarLabel">
              القائمة{" "}
            </h5>
            <button
              type="button"
              className="btn-close d-flex close-fixed "
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>

          <div className="offcanvas-body">
            <Nav className="ms-auto mt-2">
              <Link
                to="/"
                className="nav-link text-white focus-indicator"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                الرئيسية
              </Link>
              <Link
                to="/services"
                className="nav-link text-white focus-indicator"
              >
                {" "}
                خداماتنا{" "}
              </Link>
              <Link
                to="/signUp"
                className="nav-link text-white focus-indicator none"
              >
                متابعة الطلبات
              </Link>

              <div className="d-lg-none mt-3">
                <h5 className="h5-color">
                  __________________________________________
                </h5>
                <h5 className="h5-color mt-4 mb-4">
                  {" "}
                  <FiMenu size={30} color="white" /> المزيد
                </h5>
                <Link to="/questions" className="nav-link text-end">
                  <FaChevronLeft className="ms-2" />
                  الأسئلة الشائعة{" "}
                </Link>
                <Link to="/suggestions" className="nav-link text-end">
                  <FaChevronLeft className="ms-2" />
                  الشكاوى والمقترحات{" "}
                </Link>
                <Link to="#privacy" className="nav-link text-end">
                  <FaChevronLeft className="ms-2" />
                  سياسة الخصوصية{" "}
                </Link>
                <Link to="popularServices" className="nav-link text-end">
                  <FaChevronLeft className="ms-2" /> أشهر الخدمات{" "}
                </Link>
              </div>
            </Nav>
            <SearchBox data={SearchData} />
            <div className="d-flex mt-2">
              {user ? (
                <div className="d-flex align-items-center">
                  <button
                    className="btn nav-btn btn-outline-success px-4 py-2 fs-5 mb-2"
                    onClick={() => setShowUserModal(true)}
                  >
                    <MdPerson size={30} /> {user.email}
                  </button>
                  <Modal
                    show={showUserModal}
                    onHide={() => setShowUserModal(false)}
                    centered
                    className="blur-background-modal"
                    backdropClassName="custom-backdrop"
                  >
                    <Modal.Body className="p-4 rounded-4">
                      <h3 className="mb-4 text-center text-color">
                        {user.email}
                      </h3>
                      <div className="d-flex flex-column gap-3">
                        <button
                          className="btn btn-outline-success w-100 py-2"
                          onClick={handleProfileClick}
                        >
                          حسابي
                        </button>
                        <button
                          className="btn btn-outline-success w-100 py-2"
                          onClick={handleOrdersClick}
                        >
                          طلباتي
                        </button>
                        <button
                          className="btn btn-outline-success w-100 py-2 text-danger border-danger"
                          onClick={handleLogout}
                        >
                          تسجيل الخروج
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn nav-btn btn-outline-success px-4 py-2 fs-5 mb-2"
                    onClick={() => setShowModal(true)}
                  >
                    <MdPerson size={30} /> تسجيل الدخول
                  </button>
                  <LoginCard
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                  />
                </>
              )}
              <div className="d-none d-lg-block ">
                <Dropdown
                  show={dropdownOpen}
                  onToggle={(isOpen) => setDropdownOpen(isOpen)}
                >
                  <Dropdown.Toggle
                    className="no-caret btn nav-btn btn-outline-success me-2 px-4 py-2 fs-5"
                    variant="success"
                  >
                    <FiMenu size={30} color="white" /> المزيد
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      className="dropdown-item"
                      to="/questions"
                      onClick={handleDropdownItemClick}
                    >
                      الأسئلة الشائعة
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/suggestions"
                      onClick={handleDropdownItemClick}
                    >
                      {" "}
                      الشكاوى والمقترحات
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/questions"
                      onClick={handleDropdownItemClick}
                    >
                      {" "}
                      سياسة الخصوصية
                    </Link>
                    <Link
                      className="dropdown-item"
                      to="/popularServices"
                      onClick={handleDropdownItemClick}
                    >
                      أشهر الخدمات{" "}
                    </Link>
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
