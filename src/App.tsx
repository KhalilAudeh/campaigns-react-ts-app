import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Campaigns from "./components/Campaigns";
import CampaignSearchBar from "./components/CampaignSearchBar";
import DateFilter from "./components/DateFilter";
import Pagination from "./components/Pagination";

const App = () => {
  let url = "data.json";
  const [campaigns, setCampaigns] = useState<any[]>([]);

  // variables used for search and filter by logic
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // variables used for pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 10;

  useEffect(() => {
    if (!campaigns.length) {
      axios
        .get(url)
        .then((response) => {
          setCampaigns(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [url, campaigns]);

  useEffect(() => {
    const filteredList = campaigns
      .filter((campaign) => {
        // check on user input for search and filter live on search input
        if (searchInput) {
          return campaign.name
            .toLowerCase()
            .includes(searchInput.toLocaleLowerCase());
        }
        return true;
      })
      .filter((campaign) => {
        if (dateRange[0].startDate && dateRange[0].endDate) {
          return (
            Date.parse(dateRange[0].startDate) >=
              Date.parse(campaign.startDate) &&
            Date.parse(dateRange[0].endDate) <= Date.parse(campaign.endDate)
          );
        }
        return true;
      });

    setFilteredCampaigns(filteredList);
  }, [campaigns, searchInput, dateRange]);

  const handleInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const clearFilters = () => {
    setDateRange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setIsOpen(false);
  };

  const numberOfPages = filteredCampaigns
    ? Math.ceil(filteredCampaigns.length / campaignsPerPage)
    : Math.ceil(campaigns.length / campaignsPerPage);

  const lastIndex = currentPage * campaignsPerPage;
  const firstIndex = lastIndex - campaignsPerPage;

  const currentCampaigns = filteredCampaigns.slice(firstIndex, lastIndex);

  return (
    <div>
      <CampaignSearchBar
        handleInputChange={handleInputChange}
        searchInput={searchInput}
      />

      <DateFilter
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dateRange={dateRange}
        setDateRange={setDateRange}
        clearFilters={clearFilters}
      />

      <Campaigns campaigns={currentCampaigns} />

      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
