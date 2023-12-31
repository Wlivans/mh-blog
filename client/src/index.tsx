import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import App from "./App";
import "./i18n";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
