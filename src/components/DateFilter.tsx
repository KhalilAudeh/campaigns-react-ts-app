import React from "react";
import { DateRangePicker } from "react-date-range";
import { Col, Row } from "react-bootstrap";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

const DateFilter = ({
  isOpen,
  setIsOpen,
  dateRange,
  setDateRange,
  clearFilters,
}: {
  isOpen: any;
  setIsOpen: any;
  dateRange: any;
  setDateRange: any;
  clearFilters: () => void;
}) => {
  return (
    <Row className="px-5 mb-4">
      <Col sm={8} md={4}>
        <Button
          className="w-50"
          variant="primary"
          onClick={() => setIsOpen(true)}
        >
          Filter by period
        </Button>
      </Col>

      {isOpen && (
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={true}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Filter by Period
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DateRangePicker
              onChange={(newRange) => setDateRange([newRange.selection])}
              moveRangeOnFirstSelection={true}
              ranges={dateRange}
              direction="horizontal"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Row>
  );
};

export default DateFilter;
