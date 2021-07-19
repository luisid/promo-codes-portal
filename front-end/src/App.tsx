import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./query-client";
import { Logo } from "./components/Logo";
import { MenuIcon } from "./components/MenuIcon";

const ServicesLazy = React.lazy(() => import("./pages/Services"));
const items = [0, 1, 2, 3, 4, 5, 6, 7];

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row items-stretch w-screen h-screen bg-gray-blue-light font-roboto">
        <section className="flex flex-col flex-none w-20 bg-gray-blue-dark">
          <div className="px-6 py-5">
            <Logo />
          </div>
          <div className="">
            {items.map(() => (
              <div className="px-7 py-6">
                <MenuIcon />
              </div>
            ))}
          </div>
        </section>
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
