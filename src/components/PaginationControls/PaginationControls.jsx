import React from "react";
import { Button } from "react-bootstrap";

const PaginationControls = ({
  onClickNext,
  onClickPrevious,
  currentPage,
  totalPages,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <div
      className="mt-2 d-flex flex-column justify-content-center align-items-center gap-3"
      style={{ gridColumn: "1 / -1" }}
    >
      <div className="d-flex justify-content-center align-items-center gap-3">
        <Button onClick={onClickPrevious} disabled={isPrevDisabled}>
          Previous
        </Button>
        <Button onClick={onClickNext} disabled={isNextDisabled}>
          Next
        </Button>
      </div>
      <p className="text-white m-0">
        {currentPage} / {totalPages}
      </p>
    </div>
  );
};

export default PaginationControls;
