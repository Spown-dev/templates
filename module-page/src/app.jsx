import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mfe1CoreLayouts from "./screens/layouts/core/index.jsx";
import { routes } from "./routes.js";

const App = () => {
  return (
    <BrowserRouter basename="/leadboard">
      <Routes>
        <Route path="/" element={<Mfe1CoreLayouts />}>
          {routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={null}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
