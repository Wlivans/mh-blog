import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import UserAuthForm from "./pages/userAuthForm";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navbar />}>
				<Route path="/signin" element={<UserAuthForm type="signIn" />} />
				<Route path="/signup" element={<UserAuthForm type="signUp" />} />
			</Route>
		</Routes>
	);
}

export default App;
