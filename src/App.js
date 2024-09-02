import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Employee from "./pages/Employee";
import User from "./pages/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/employee"
            element={<ProtectedRoute element={<Employee />} />}
          ></Route>
          <Route
            path="/create"
            element={<ProtectedRoute element={<Create />} />}
          ></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route
            path="/edit/:id"
            element={<ProtectedRoute element={<Update />} />}
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
