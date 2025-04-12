


import './App.css'

import { Route, Router, Routes } from 'react-router';


import WelcomePage from './components/welcomePage/WelcomePage'
import SignUp from './pages/signUp';
import ScrollToTopButton from './components/scrolling/ScrollBtn';
import Login from './pages/Login';
import Services from './pages/services'
import Questions from './pages/Questions';
import CardDetails from "./pages/ServicesSteps";
import Layout from "./components/Layout"
import CustomModal from './pages/IdValidation';
import BackendPage from './pages/Backend';

function App() {


  return (
    <>
<ScrollToTopButton/>


<Routes>
<Route path='/' element={<Layout><WelcomePage/></Layout>}/>
<Route path='signUp' element={<Layout><SignUp/></Layout>}/>
<Route path='login' element={<Layout><Login/></Layout>}/>
<Route path='services' element={<Layout><Services/></Layout>}/>
<Route path='questions' element={<Layout><Questions/></Layout>}/>
<Route path='idValidate' element={<Layout><CustomModal/></Layout>}/>
<Route path='backend' element={<Layout><BackendPage/></Layout>}/>
<Route path="/card/:id" element={<Layout><CardDetails /></Layout>} />



  </Routes>


    </>
  )
}

export default App
