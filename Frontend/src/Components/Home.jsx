import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { extendTheme } from "@mui/material/styles";
import { Settings } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import StoreIcon from "@mui/icons-material/Store";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Psn from "./Imagess/psnlogo2.png";

const NAVIGATION = [
  {
    kind: "header",
    title: "Menu",
  },
  {
    
    segment: "admin/counters", 
    title: "Counters",
    icon: <RestaurantIcon />,
    to: "/admin/counters", 
  },
  {
   
    segment: "admin/counterprofiles",
    title: "Counter Profiles",
    icon: <StoreIcon />,
    to: "/admin/counterprofiles",
  },
  {
    segment: "admin/counteravailability",
    title: "admin/Counter Availability",
    icon: <RestaurantMenuIcon />,
    to: "/admin/counteravailability",
  },
  {
    segment: "admin/settings",
    title: "Settings",
    icon: <Settings />,
    to: "/admin/settings",
  },
  {
    segment: "logout",
    title: "Logout",
    icon: <LogoutIcon />,
    to: "/logout",
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function DashboardLayoutBasic() {
  const location = useLocation();
  const navigate = useNavigate();

  const router = React.useMemo(
    () => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate,
    }),
    [location, navigate]
  );

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src={Psn} alt="Logo" />,
        title: "The Place Drive In",
        homeUrl: "/admin",
      }}
      theme={demoTheme}
    >
      <DashboardLayout headerProps={{ title: "" }}>
        <div style={{ fontFamily: "Sans-Serif" }}>
          <Outlet /> 
        </div>
      </DashboardLayout>
    </AppProvider>
  );
}
