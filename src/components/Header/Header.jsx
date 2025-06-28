import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import "./Header.css";

const Header = ({ onSearch, onClickUpcoming, onClickPopular }) => {
  const [searchText, setSearchText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(searchText);
    onSearch(searchText);
  };
  return (
    <>
      <Navbar className="bg-secondary">
        <Container className="justify-content-start  bg-secondary">
          <Navbar.Brand href="/" className="categoryChoice">
            🎬MovieDb App
          </Navbar.Brand>
          <Nav.Link
            href="#"
            className="me-3 categoryChoice"
            onClick={onClickUpcoming}
          >
            Upcoming
          </Nav.Link>
          <Nav.Link
            href="#"
            className="categoryChoice"
            onClick={onClickPopular}
          >
            Popular
          </Nav.Link>
          <Form className="d-flex ms-auto" onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Search"
              className="custom-width"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
