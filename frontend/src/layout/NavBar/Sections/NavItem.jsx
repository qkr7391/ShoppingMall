import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunction";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { useRouteId } from "react-router/dist/lib/hooks";

const routes = [
	{ to: "/login", name: "Sign In", auth: false },
	{ to: "/register", name: "Sign Up", auth: false },
	{ to: "", name: "Logout", auth: true },

	{ to: "/product/upload", name: "Upload", auth: true },
	{
		to: "/user/cart",
		name: "Cart",
		auth: true,
		icon: <AiOutlineShoppingCart style={{ fontSize: "1.4rem" }} />,
	},
	{ to: "/orders", name: "Orders", auth: true },
];

const NavItem = ({ mobile }) => {
	const isAuth = useSelector((state) => state.user?.isAuth);

	const cart = useSelector((state) => state.user?.userData?.cart);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			dispatch(logoutUser()).then(() => {
				navigate("/login");
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ul
			className={`text-md justify-center w-full flex gap-4 ${
				mobile && "flex-col bg-gray-900 h-full"
			} items-center`}
		>
			{routes.map(({ to, name, auth, icon }) => {
				if (isAuth !== auth) return null;

				if (name === "Logout") {
					return (
						<li
							key={name}
							className="py-2 text-center border-b-4 cursor-pointer"
						>
							<Link onClick={handleLogout}>{name}</Link>
						</li>
					);
				} else if (icon) {
					return (
						<li
							className="relative py-2 text-center border-b-4 cursor-pointer"
							key={name}
						>
							<Link to={to}>
								{icon}
								<span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white border-2 border-white rounded-full -right-3">
									{cart ? cart.length : 0}
								</span>
							</Link>
						</li>
					);
				} else {
					return (
						<li
							key={name}
							className="py-2 text-center border-b-4 cursor-pointer"
						>
							<Link to={to} key={name}>
								{name}
							</Link>
						</li>
					);
				}
			})}
		</ul>
	);
};

NavItem.propTypes = {
	mobile: PropTypes.bool.isRequired,
};

export default NavItem;
