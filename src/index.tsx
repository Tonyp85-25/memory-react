import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.scss";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter forceRefresh={true}>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);
