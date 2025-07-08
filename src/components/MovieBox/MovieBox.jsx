import React, { useState } from "react";
import { API_IMG } from "../../constants";
import Button from "react-bootstrap/Button";
import "./MovieBox.css";
import {
  Card,
  CardImg,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";

const MovieBox = ({
  poster_path,
  title,
  vote_average,
  release_date,
  overview,
}) => {
  const [show, setShow] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const handleShowOpen = () => {
    setShow(true);
  };
  const handleShowClose = () => {
    setShow(false);
  };

  const handleReadOpen = () => {
    setIsReadMore(true);
  };

  const handleReadClose = () => {
    setIsReadMore(false);
  };

  return (
    <>
      <div className="bg-secondary rounded-3 ">
        <Card className="movie-card bg-transparent border-0 ">
          <CardImg
            className="mt-3"
            style={{ width: "300px", height: "450px" }}
            src={API_IMG + poster_path}
            alt={title}
          />
          <Button className="mx-auto mt-3 mb-4" onClick={handleShowOpen}>
            View More
          </Button>
        </Card>

        <Modal show={show}>
          <ModalHeader closeButton onClick={handleShowClose}></ModalHeader>
          <img
            className="mx-auto d-block"
            src={API_IMG + poster_path}
            alt={title}
            style={{ width: "250px" }}
          />
          <ModalTitle>
            <h1>{title}</h1>
          </ModalTitle>
          <ModalBody>
            <h5>{`IMDb: ${Math.floor(vote_average)}`}</h5>
            <h5>{`Release Date: ${release_date}`}</h5>
            <h5>Overview</h5>
            {isReadMore ? (
              <>
                <p className="overview">
                  {overview} <span onClick={handleReadClose}>Read More</span>
                </p>
              </>
            ) : (
              <>
                <p className="overview">
                  {overview.slice(0, 150)}...
                  <span onClick={handleReadOpen}>Read More</span>
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" onClick={handleShowClose}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default MovieBox;
