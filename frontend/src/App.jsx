import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlog";
import AddBlog from "./pages/AddBlog";
import MyBlogs from "./pages/MyBlogs";
import Navbar from "./components/NavBar";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();
  // Hide Navbar on /login and /signup
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<ProtectedRoute user={user}><AllBlogs /></ProtectedRoute>} />
          <Route path="/my-blogs" element={<ProtectedRoute user={user}><MyBlogs /></ProtectedRoute>} />
          <Route path="/add-blogs" element={<ProtectedRoute user={user}><AddBlog /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </AuthProvider>
);

export default App;