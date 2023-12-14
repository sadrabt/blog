import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Register from "./assets/pages/Register"
import Login from "./assets/pages/Login"
import Home from "./assets/pages/Home"
import Write from "./assets/pages/Write"
import Single from "./assets/pages/Single"
import Header from "./assets/components/Header"
import Footer from "./assets/components/Footer"
import './assets/css/reset.css'
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/style.css"

const Layout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
    <div className = "app">
      <div className = "">
        <RouterProvider router={router}/>
      </div>
    </div>
    
  );
}

export default App;