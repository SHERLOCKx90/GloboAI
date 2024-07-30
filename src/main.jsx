import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './Pages/CreateTrip.jsx'


const Router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
    },
    {
        element: <CreateTrip />,
        path: '/create-trip',
    },
])
const Container = document.getElementById("root");
const Root = ReactDOM.createRoot(Container);
Root.render(
    <RouterProvider router={Router} />
);

