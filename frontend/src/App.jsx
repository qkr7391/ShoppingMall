import { Route, Routes, Outlet } from "react-router-dom";
// import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";

// import NotAuthRoutes from "./components/NotAuthRoutes";
// import ProtectedRoutes from "./components/ProtectedRoutes";
// import UploadProductPage from "./pages/UploadProductPage";
// import DetailProductPage from "./pages/DetailProductPage";
// import CartPage from "./pages/CartPage";
// import HistoryPage from "./pages/HistoryPage";

function Layout() {
	return (
		<div className="flex flex-col h-screen justify-between">
			<ToastContainer
				position="bottom-right"
				theme="light"
				pauseOnHover
				autoClose={1500}
			/>
			<NavBar />
			<main className="mb-auto w-10/12 max-w-4xl mx-auto">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* without Login */}
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* with Login */}
				{/* <Route element={<ProtectedRoutes />}>
					<Route path="product/upload" element={<UploadProductPage />} />
					<Route path="product/:productId" element={<DetailProductPage />} />
					<Route path="user/cart" element={<CartPage />} />
					<Route path="history" element={<HistoryPage />} />
				</Route> */}
			</Route>
		</Routes>
	);
}

export default App;
