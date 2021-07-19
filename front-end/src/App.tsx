import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query-client";

const ServicesLazy = React.lazy(() => import("./pages/Services"));

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row items-stretch w-screen h-screen bg-gray-blue-light font-roboto">
        <section className="flex-none w-20 bg-gray-blue-dark">sidebar</section>
        <section className="flex flex-col flex-grow">
          <Suspense fallback>
            <BrowserRouter>
              <Route component={ServicesLazy} />
            </BrowserRouter>
          </Suspense>
        </section>
      </div>
    </QueryClientProvider>
  );
};

export { App };
