import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer.jsx";
import NavBar from "../components/NavBar/NavBar.jsx";
import { useInitApp } from "./hooks/useInitApp.js";
import { useState } from "react";

export default function App() {
	const [favorites, setFavorites] = useState([]);
	const { loading } = useInitApp();

	if (loading) return null;

	const handleFavoritesUpdate = newFavorites => {
		setFavorites(newFavorites);
	};
	return (
		<>
			<NavBar />
			<main>
				<Outlet
					context={{ onFavoritesUpdate: handleFavoritesUpdate, favorites }}
				/>
			</main>
			<Footer />
		</>
	);
}
