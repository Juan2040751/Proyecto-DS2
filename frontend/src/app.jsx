import { Toolbar } from "@mui/material";
import React from "react";
import Navbar from "./components/navbar";
import { Analytics } from "@vercel/analytics/react"

export default function App({ children, window }) {
  return (
    <>
      <div>
        <Navbar window={window} />
        <Toolbar />
        {children}
     </div>
     <Analytics mode={'production'} />;
    </>
  );
}
