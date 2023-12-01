import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import UserAuthForm from "./pages/userAuthForm";
import { createContext, useEffect, useState } from "react";
import { getSession } from "./common/session";

export const UserContext = createContext({});

function App() {
	const [userAuth, setUserAuth] = useState({});

	useEffect(() => {
		const userSession = getSession("user");

		userSession ? setUserAuth(JSON.parse(userSession)) : setUserAuth({ access_token: null });
	}, []);

	return (
		<UserContext.Provider value={{ userAuth, setUserAuth }}>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path="/login" element={<UserAuthForm type="login" />} />
					<Route path="/register" element={<UserAuthForm type="register" />} />
				</Route>
			</Routes>
		</UserContext.Provider>
	);
}

export default App;
