
import NavBar from './NavBar';
import '../Css/Layout.css';


const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main className="content">
        {children}
      </main>
   
    </div>
  );
};

export default Layout;