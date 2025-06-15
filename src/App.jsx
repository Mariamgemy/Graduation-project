import "./App.css";
import { Route, Router, Routes } from "react-router";
import WelcomePage from "./components/welcomePage/WelcomePage";
import SignUp from "./pages/signUp";
import ScrollToTopButton from "./components/scrolling/ScrollBtn";
import Login from "./pages/Phone";
import Services from "./pages/services";
import Questions from "./pages/Questions";
import CardDetails from "./pages/ServicesSteps";
import Layout from "./components/Layout";
import CustomModal from "./pages/IdValidation";
import BackendPage from "./pages/Backend";
import PopularServices from "./pages/PopularServices";
import Suggestions from "./pages/Suggestions";
import ComplaintDone from "./pages/complaintDone";
import PaymentSuccess from "./components/PaymentSuccess";
import StripePaymentForm from "./components/StripePaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import Phone from "./pages/ComplaintDone";
import { AuthProvider } from "./context/AuthContext.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ModalProvider } from './components/ModalManager';
import ModalContainer from './components/ModalContainer'; 
import NavBar from './components/NavBar';
// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe("your_stripe_publishable_key");

function App() {
  return (
    <AuthProvider>
      <ScrollToTopButton />
      <ModalProvider> 
      <NavBar />
      <ModalContainer /> 
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <WelcomePage />
            </Layout>
          }
        />
        <Route
          path="signUp"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="questions"
          element={
            <Layout>
              <Questions />
            </Layout>
          }
        />
        <Route
          path="idValidate"
          element={
            <Layout>
              <CustomModal />
            </Layout>
          }
        />
        <Route
          path="backend"
          element={
            <Layout>
              <BackendPage />
            </Layout>
          }
        />
        <Route
          path="popularServices"
          element={
            <Layout>
              <PopularServices />
            </Layout>
          }
        />
        <Route
          path="suggestions"
          element={
            <Layout>
              <Suggestions />
            </Layout>
          }
        />
        <Route
          path="complaintDone"
          element={
            <Layout>
              <ComplaintDone />
            </Layout>
          }
        />
            <Route
              path="services"
              element={
                <Layout>
              <ProtectedRoute>
                  <Services />
                  </ProtectedRoute>
                </Layout>
              }
            />

        <Route
          path="/orders"
          element={
            <Layout>
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        {/* <Route
          path="phone"
          element={
            <Layout>
              <Phone />
            </Layout>
          }
        /> */}

        <Route
          path="/card/:id"
          element={
            <Layout>
              <CardDetails />
            </Layout>
          }
        />
        {/* Payment routes */}
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Layout>
                <StripePaymentForm />
              </Layout>
            </Elements>
          }
        />
        <Route
          path="/payment-success"
          element={
            <Layout>
              <PaymentSuccess />
            </Layout>
          }
        />
      </Routes>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
