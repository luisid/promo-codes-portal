import React, { useCallback, useEffect } from "react";
import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { InfoItem } from "../../components/InfoItem";
import { Filters } from "./components/Filters";
import { ServicesList } from "./components/List";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button";
import { useServiceFilters } from "./hooks";

const ServicesPage: React.FC = () => {
  const { search, handleSearchChange, resetSearch } = useServiceFilters();
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) =>
        fetch(`${import.meta.env.VITE_API_URL}/seed`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      );
    }
  }, [isAuthenticated]);

  const handleLoginAndLogout = useCallback(() => {
    if (isAuthenticated) {
      logout();
    } else {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect, logout]);

  return (
    <>
      <Header>
        {/* Not really sure what balance and payout are suppose to do. */}
        <InfoItem label="Balance" value="213 920 $" />
        <InfoItem label="Payout" value="159 465 $" />
        <Button onClick={handleLoginAndLogout}>
          {isAuthenticated ? "Log Out" : "Login"}
        </Button>
      </Header>
      {isAuthenticated && (
        <Body>
          <h1 className="text-4xl">Services</h1>
          <Filters
            search={search}
            resetSearch={resetSearch}
            handleSearchChange={handleSearchChange}
          />
          <div className="flex-1 mt-6">
            <ServicesList search={search} pageSize={20} />
          </div>
        </Body>
      )}
    </>
  );
};

export default ServicesPage;
