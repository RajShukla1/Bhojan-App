import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Header />
        <main className="app-main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantMenu />,
      },
    ],
  },
]);

export default App;
