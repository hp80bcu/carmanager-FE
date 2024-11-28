import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home/Home";
import SearchPage from "./routes/SearchPage/SearchPage";
import Purchase from "./routes/Purchase/Purchase";
import Sale from "./routes/Sale/Sale";
import MyCarInfo from "./routes/MyCarInfo/MyCarInfo";
// import CarRegister from "./routes/MyCarInfo/CarRegister";
import Bookmark from "./routes/Bookmark/Bookmark";
import UserInfoModify from "./routes/users/UserInfoModify";
import Login from "./routes/users/login";
import Sale2 from "./routes/Sale/Sale2";
import CarDetailPage from "./routes/cars/CarDetailPage";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/sale/:carId" element={<Sale />} />
          <Route path="/sale" element={<Sale2 />} />
          <Route path="/mycar" element={<MyCarInfo />} />
          <Route path="/cars/:carId" element={<CarDetailPage />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/users/:userId" element={<UserInfoModify />} /> {/* 수정된 부분 */}
          <Route path="/users/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;