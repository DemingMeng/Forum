
import { render } from "react-dom";
import { createTheme} from "@material-ui/core";
import App from "./App.js";
import React from "react";
window.React = React
const theme = createTheme()


render(<App/>,document.getElementById("body"))

