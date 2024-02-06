import React from "react";

const CampaignSearchBar = ({
  handleInputChange,
  searchInput,
}: {
  handleInputChange: (event: any) => void;
  searchInput: string;
}) => {
  return (
    <nav
      className="navbar mb-5 border-2 px-4 py-3"
      style={{ backgroundColor: "#3f51b5" }}
    >
      <div className="container-fluid">
        <span
          className="navbar-brand text-capitalize fw-bold"
          style={{ color: "white" }}
        >
          campaigns
        </span>
        <form className="col-sm-6 col-md-4 col-lg-2">
          <input
            className="form-control me-2 w-100"
            type="text"
            placeholder="Search"
            onChange={handleInputChange}
            value={searchInput}
          />
        </form>
      </div>
    </nav>
  );
};

export default CampaignSearchBar;
