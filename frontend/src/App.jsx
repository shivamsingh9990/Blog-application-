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

const AppContent = () => {
  const location = useLocation();
  // Hide Navbar on /login and /signup
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/add-blogs" element={<AddBlog />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
// filepath: c:\Users\Shivam\Documents\full_stack_project[1]\full stack project\frontend\src\App.jsx