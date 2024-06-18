# Online Shopping Mall Project

---

A project to create an online shopping mall site using React/Redux that allows users to register, add to cart, delete, or purchase simple products.

## Lecture 01 - Create React with Vite

---

npm init vite

Setting directories and files structure.

## Lecture 02 - Setting Vite ESlint

---

npm i -D vite-plugin-eslint eslint eslint-config-react-app

[frontend/vite.config.js]

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; //add

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), eslint()], //add eslint()
});
```

[frontend/.eslintrc.cjs]

```js
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
		"react-app", // add
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react/jsx-no-target-blank": "off",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
};
```

## Lecture 03 - TailWidCSS

---

TailWindCSS : Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. Unlike traditional CSS frameworks that provide predefined components and styles, Tailwind CSS provides low-level utility classes that let you build custom designs without writing any CSS.

extention - TailWindCSS IntelliSense

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

[tailwind.config.js]

```js
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // add
	theme: {
		extend: {},
	},
	plugins: [],
};
```

[index.css]

```js
@tailwind base; //add
@tailwind components;//add
@tailwind utilities;//add

:root {
    ...
```

## Lecture 04 - React Router DOM & React Router DOM APIs

---

- What is 'React Router Dom'? - React Router DOM is a popular library used for handling routing in React applications. It allows developers to create single-page applications with navigation, and without the need to refresh the whole page.

- The React Router DOM allows you to implement dynamic routing in your web app. Unlike traditional routing architectures, where routing is handled in a configuration outside of the running app, the React Router DOM facilitates component-based routing based on the requirements of the app and platform.

- Because React is a Single Page Application (SPA), it has a single index.js template. Other components are added to this template using JavaScript to change the page.
  At this point, the React Router DOM library helps to route/navigate and render the new components.

* npm install react-router-dom
* <BrowserRouter>

[EXAMPLE]

```js
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" component={About} />
					<Route path="/contact" component={Contact} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
```

- Components

* BrowserRouter: A router implementation that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
* Route: It renders some UI when its path matches the current URL.
* Switch: It renders the first child <Route> or <Redirect> that matches the location.

- Example Components

* Here are simple implementations for the Home, About, and Contact components
  [EXAMPLE]

```js
// Home.js
import React from 'react';

const Home = () => {
  return <h2>Home</h2>;
};

export default Home;

// About.js
import React from 'react';

const About = () => {
  return <h2>About</h2>;
};

export default About;

// Contact.js
import React from 'react';

const Contact = () => {
  return <h2>Contact</h2>;
};

export default Contact;

```

- Navigation

* To navigate between these routes, you can use the Link component
  [EXAMPME]

```js
// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
```

- Routes :

* Container/parent role for all individual routes that will be created in the app.
* It will render the first matching Route among the child components created by Route.

- Route :

* Used to create a single route.
* It takes two attributes

1. path: Specifies the URL path of the desired component.
2. element/component: Specifies the component that should be rendered to match the path.

- Link: The Link component is similar to the anchor element (<a />) in HTML.

1. The to attribute specifies the path the link takes.

- Nested Routes : Nested routes are routes that are defined within the scope of another route. This allows you to have hierarchical routing structures.

[EXAMPME]

```js
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Dashboard from "./Dashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="contact" element={<Contact />} />
				<Route path="dashboard/*" element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
```

- Outlet : The <Outlet> component is used within a parent route to render the child routes.

[EXAMPLE]

```js
// Dashboard.js
import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<h2>Dashboard</h2>
			<Outlet />
		</div>
	);
};

export default Dashboard;
```

- useNavigate : The useNavigate hook is used to programmatically navigate to different routes within your application.

[EXAMPLE]

```js
import React from "react";
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		// Navigate to a different route
		navigate("/dashboard");
	};

	return (
		<div>
			<h2>MyComponent</h2>
			<button onClick={handleClick}>Go to Dashboard</button>
		</div>
	);
};

export default MyComponent;
```

- useParams : The useParams hook allows you to access the parameters of the current route. For example, if your route is defined as /users/:id, you can use useParams to access the id parameter.

[EXAMPLE]

```js
import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { id } = useParams();

	return (
		<div>
			<h2>User Profile</h2>
			<p>User ID: {id}</p>
		</div>
	);
};

export default UserProfile;
```

- useLocation : he useLocation hook is provided by React Router v6 to access the current location object, which represents the current URL. It returns an object with properties such as pathname, search, hash, state, and key.

[EXAMPLE]

```js
import React from "react";
import { useLocation } from "react-router-dom";

const MyComponent = () => {
	const location = useLocation();

	return (
		<div>
			<h2>Current Location</h2>
			<p>Pathname: {location.pathname}</p>
			<p>Search: {location.search}</p>
			<p>Hash: {location.hash}</p>
			{/* You can also access the state property if you passed state using the navigate method */}
			{/* <p>State: {location.state && JSON.stringify(location.state)}</p> */}
		</div>
	);
};

export default MyComponent;
```

- pathname represents the path of the current URL.
- search represents the query parameters of the current URL.
- hash represents the hash fragment of the current URL.
- state represents any state that might have been passed to the current location object (if applicable).

* useRoutes : In React Router v6, useRoutes is a hook that allows you to define nested routes dynamically based on a configuration object. It's useful for more complex routing setups where you want to programmatically define routes.

[EXAMPLE]

```js
import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const routes = [
	{
		path: "/",
		element: <Home />,
		children: [
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
		],
	},
	{ path: "dashboard/*", element: <Dashboard /> },
];

function App() {
	const routing = useRoutes(routes);

	return <Router>{routing}</Router>;
}

export default App;
```

- The routes array contains an array of route objects. Each route object has a path property representing the URL path, an element property representing the component to render when the route matches, and optionally a children property for nested routes.
- The useRoutes hook is called with the routes array to generate the routing configuration.
- The routing variable returned from useRoutes is then rendered within the <Router> component.

* Dynamic Routing : You can generate routes dynamically based on conditions or data.
  [EXAMPLE]

```js
const items = [
	{ id: 1, name: "Item 1" },
	{ id: 2, name: "Item 2" },
	{ id: 3, name: "Item 3" },
];

const routes = items.map((item) => ({
	path: `item/${item.id}`,
	element: <ItemDetail item={item} />,
}));
```

- This will generate routes like /item/1, /item/2, /item/3, etc., each rendering the ItemDetail component with the corresponding item.

* Redirects and Not Found Routes : You can also include redirects and not found routes in the routes array
  [EXAMPLE]

```js
const routes = [
	{ path: "/", element: <Home /> },
	{ path: "about", element: <About /> },
	{ path: "contact", element: <Contact /> },
	{ path: "dashboard/*", element: <Dashboard /> },
	{ path: "login", element: <Login /> },
	{ path: "profile", element: <Profile />, authRequired: true },
	{ path: "logout", element: <Logout /> },
	{ path: "*", element: <NotFound /> },
];
```

- The '\*' path matches any route that hasn't been matched by previous routes, serving as a catch-all for not found routes.
- You can also conditionally render certain routes based on authentication status or other conditions, as shown with the authRequired property.

** Applying real-world programs **

1. install reacr-router-dom
   -> npm install react-router-dom

2. [src/main.jsx] - add/change code

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom"; //add

ReactDOM.createRoot(document.getElementById("root")).render(
	// change
	<BrowserRouter>
		<App />
	</BrowserRouter> // change
);
```

3. [src/App.jsx] add/change code

```js
import { Route, Routes, Outlet } from "react-router-dom";
// import "./App.css";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
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
		<div>
			<NavBar />
			<main>
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
```

## Lecture 05 - CSS Structure & React Icons

---

![Alt text](IMG_0D7C05C293DC-1-1.jpeg)

1. CSS structure
   [src/App.jsx]

```js
function Layout() {
	return (
		<div className="flex flex-col h-screen justify-between">
			<NavBar />
			<main className="mb-auto w-10/12 max-w-4xl mx-auto">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
```

2. React Icons

- npm install react-icons
  [src/Footer]

```js
import React from "react";
import { AiOutlineSmile } from "react-icons/ai";

const Footer = () => {
	//change
	return (
		//style
		<div className="flex h-20 text-lg justify-center items-center">
			All right reserved.
			<AiOutlineSmile />
		</div>
	);
};

export default Footer;
```

## Lecture 06 - Redux & Redux-Persist

---

- Prepare for using Redux

1. npm install @reduxjs/toolkit react-redux

- Redux Toolkit provides utilities to simplify Redux development, and React Redux allows you to connect your React components with the Redux store.

2. [src/store/userSlice.js]

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userData: {
		id: "",
		email: "",
		name: "",
		role: 0,
		image: "",
	},
	isAuth: false,
	isLoading: false,
	error: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (buider) => {},
});

export default userSlice.reducer;
```

This file defines a Redux slice using createSlice from Redux Toolkit.
It sets the initial state for the user slice, including userData, isAuth, isLoading, and error.
The reducers and extraReducers sections are currently empty. They would contain reducer functions and extra reducers for handling actions and updating the state.

3. [src/store/index.js]

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
```

This file creates the Redux store using configureStore from Redux Toolkit.
It imports the user reducer from userSlice.js.
The user reducer is added to the store under the key user.

4. [src/main.jsx]

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);
```

This file is the entry point of your React application.
It sets up the Redux store to be provided to all components using the Provider component from React Redux.
The <BrowserRouter> component wraps the entire application, enabling React Router functionality.
ReactDOM.createRoot().render() method is used to render the root component (<App />) into the HTML element with the id "root". This is the modern approach for rendering in React 18 and above.

- Redux-Persist
- Redux Persist is a library that helps persist the Redux state to the local storage or any other storage mechanism. It's commonly used in Redux applications, especially in combination with React, to maintain the state even after a page refresh or when the user navigates away from the application.

1. npm install redux-persist
2. [src/store/index.js]

```js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	persistReducer,
	persistStore,
} from "redux-persist";

// Combine all the reducers into one rootReducer.
export const rootReducer = combineReducers({
	user: userReducer, // Add the userReducer to the rootReducer.
});

// Configuration object for redux-persist.
const persistConfig = {
	key: "root", // Key for the persisted data in storage.
	storage, // Storage engine to use (default storage in this case).
};

// Create a persisted reducer using the persistConfig and rootReducer.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer and customized middleware.
export const store = configureStore({
	reducer: persistedReducer, // Use the persisted reducer.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

// Create a persistor object for the store.
export const persistor = persistStore(store);
```

3. [src/main.jsx]

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</BrowserRouter>
);
```
