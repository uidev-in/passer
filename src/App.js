import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import User from "./pages/User";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/edit/:id" element={<Update />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
