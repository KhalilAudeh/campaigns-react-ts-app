import React, { FC, useEffect } from "react";
import { Row, Alert } from "react-bootstrap";

interface CampaignsProps {
  campaigns: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    budget: number;
    status: string;
  }[];
}

const Campaigns: FC<CampaignsProps> = ({ campaigns }) => {
  let currentDate = new Date().getTime();

  useEffect(() => {
    campaigns.map((campaign) => {
      if (
        currentDate >= Date.parse(campaign.startDate) &&
        currentDate <= Date.parse(campaign.endDate)
      ) {
        return (campaign.status = "Active");
      } else {
        return (campaign.status = "Inactive");
      }
    });
  }, [currentDate, campaigns]);

  return (
    <Row className="mx-5">
      {campaigns.length ? (
        <table className="table table-responsive border border-1">
          <thead>
            <tr>
              <th scope="col" className="text-secondary py-3">
                Name
              </th>
              <th scope="col" className="text-secondary py-3">
                Status
              </th>
              <th scope="col" className="text-secondary py-3">
                Start date
              </th>
              <th scope="col" className="text-secondary py-3">
                End date
              </th>
              <th scope="col" className="text-secondary py-3">
                Budget
              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td width={"25%"} className="py-3">
                  {campaign.name}
                </td>
                <td width={"25%"} className="py-3">
                  {campaign.status === "Inactive" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#FF0000"
                      className="bi bi-x-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#38761d"
                      className="bi bi-check-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  )}
                  <span style={{ marginLeft: 6 }}>{campaign.status}</span>
                </td>
                <td width={"20%"} className="py-3">
                  {campaign.startDate}
                </td>
                <td width={"20%"} className="py-3">
                  {campaign.endDate}
                </td>
                <td className="py-3">
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "USD",
                  }).format(campaign.budget)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Alert variant="warning" className="col-6 mt-3">
          No results found for your search or filter, try another search!
        </Alert>
      )}
    </Row>
  );
};

export default Campaigns;
