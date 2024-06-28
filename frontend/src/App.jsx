import { Route, Routes, Outlet, useLocation } from "react-router-dom";
// import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NavBar from "./layout/NavBar";
import Footer from "./layout/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunction";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";

import UploadProductPage from "./pages/UploadProductPage";
import DetailProductPage from "./pages/DetailProductPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

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
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.user?.isAuth);
	const { pathname } = useLocation();
	useEffect(() => {
		if (isAuth) {
			dispatch(authUser());
		}
	}, [isAuth, pathname, dispatch]);
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<LandingPage />} />

				{/* with Login only */}
				<Route element={<ProtectedRoutes isAuth={isAuth} />}>
					<Route path="/protected" element={<ProtectedPage />} />

					<Route path="/products/upload" element={<UploadProductPage />} />
					<Route path="/product/:productId" element={<DetailProductPage />} />
					<Route path="/user/cart" element={<CartPage />} />
					<Route path="/orders" element={<OrdersPage />} />
				</Route>

				{/* without Login only */}
				<Route element={<NotAuthRoutes isAuth={isAuth} />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
