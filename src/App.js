import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';

function App() {
  return (
    <div>
     <Header/>
     <Outlet/> 
     <Footer/>
    </div>
  );
}
export const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Error/>,
    children:[{
      path:'/',
    element:<Body/>,
    },
      {
      path:'/about',
      element:<About/>,
    },
    {
      path:'/contact',
      element: <Contact/>,
    },
    {
      path:'/cart',
      element:<Cart/>,
    },
    {
      path:'/restaurant/:id',
      element:<RestaurantMenu/>
    }
  ]
  },
]);


export default App;
