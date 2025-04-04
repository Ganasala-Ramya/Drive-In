import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Counters from './Components/counters/counters';
import CPList from './Components/CountersList/CPList';
import Settings from './Components/settings/Settings';
import Counteravailability from './Components/counteravailability/counteravailability';
import DetailsPage from './Components/CountersList/DetailsPage';
import Footer from './Footer';
import Home1 from "./Home1";
import { Logout } from "@mui/icons-material";
import Main from "./Components/Mainpaje";
import { SnackbarProvider } from "notistack";

function App({ profiles }) {
  return (
    <SnackbarProvider 
      maxSnack={3} 
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
    <div>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/admin" element={<Home />}>
        <Route index element={<Main />} />
          <Route path="counters" element={<Counters />} />
          <Route path="counterprofiles" element={<CPList />} />
          <Route path="counteravailability" element={<Counteravailability />} />
          <Route path="settings" element={<Settings />} />
          <Route path="details/:id" element={<DetailsPage profiles={profiles} />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
    </SnackbarProvider>
  );
}

export default App;
