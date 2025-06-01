import { registerRootComponent } from "expo";
import React, { StrictMode } from "react";

import App from "./src/App";

function Root() {
  return (
    <StrictMode>
        <App />
    </StrictMode>
  );
}

registerRootComponent(Root);
