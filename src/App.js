import logo from './logo.svg';
import './App.css';
import Register from './Pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './Pages/Login';
import Home from './Pages/Home'
import Product from './Pages/Product';
import AddProduct from './Pages/AddProduct'
import UpdatePassword from './Pages/UpdatePassword'
import Profile from './Pages/Profile';
import ForgetPassword from './Pages/ForgetPassword';
import EditProduct from './Pages/EditProduct'
function App() {
  const PrivateRoute=({children})=>{
    const token=localStorage.getItem("auth") || sessionStorage.getItem("auth")
    return token !==null && token !==undefined ?(children):<Navigate to="/" />
  }
  const public_route=[
    {
      path:"/",
      component:<Login/>
    },
    {
      path:"/register",
      component: <Register/>
    },
    {
      path:"/home",
      component: <Home/>
    },
    {
      path:"/forgetPassword",
      component:<ForgetPassword/>
    }
  ]
  const protected_route=[
    {
      path:"/product",
      component:<Product/>
    },
    {
      path:"/AddProduct",
      component:<AddProduct/>
    },
    {
      path:"/updatePassword",
      component:<UpdatePassword/>
    },
    {
      path:"/profile",
      component:<Profile/>
    },
    {
      path:"/editProduct/:id",
      component:<EditProduct/>
    }
  ]
  return (
   <>
   <ToastContainer/>
   <BrowserRouter>
   <Routes>
    {
      public_route?.map((item)=>{
        return <Route path={item?.path} element={item?.component} />
      })
    }
    {
      protected_route?.map((item)=>{
        return <Route path={item?.path} element={<PrivateRoute>{item?.component}</PrivateRoute>} />
      })
    }

   </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;
