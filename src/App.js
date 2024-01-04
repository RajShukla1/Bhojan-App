import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { createBrowserRouter } from 'react-router-dom';
import About from './components/About';

function App() {
  return (
    <div>
     <Header/> 
     <Body/>
     <Footer/>
    </div>
  );
}
const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
  },
  {
    path:'/about',
    element:<About/>,
  }
]);


export default App;
