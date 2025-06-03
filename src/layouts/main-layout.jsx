import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { SWRConfig } from "swr";
import { CustomModal as Modal } from "../components/ui/modal";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  IconButton,
  Box,
  Button,
  Icon,
} from "@mui/material";

import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Info as InfoIcon,
  Build as BuildIcon,
  ContactMail as ContactMailIcon,
  Menu as MenuIcon,
  Facebook,
  Instagram,
  YouTube,
  Logout,
  AssignmentInd,
} from "@mui/icons-material";

import { useMediaQuery } from "@mui/material";
import Logo from "../assets/logo.png";
import { useUserStore } from "../lib/store";
import {
  BriefcaseIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { useAxios } from "../lib/hooks/useAxios";
import ViewProfile from "../components/profile/profile-view";
const drawerWidth = 240;

const navItems = [
  { title: "Home", icon: <HomeIcon />, path: "/" },
  { title: "Our Services", icon: <BuildIcon />, path: "/#services" },
  { title: "About Us", icon: <InfoIcon />, path: "/#about" },
  { title: "Contact", icon: <ContactMailIcon />, path: "/#contact" },
];

const adminMenuItems = [
  { title: "Dashboard", icon: DashboardIcon, path: "/dash-board" },
  { title: "Staff", icon: UsersIcon, path: "/staff" },
  {
    title: "Supervisors",
    icon: SupervisedUserCircleIcon,
    path: "/supervisors",
  },
  {
    title: "Work Item",
    icon: ClipboardDocumentListIcon,
    path: "/work-item",
  },
  {
    title: "Assigned Works",
    icon: ClipboardDocumentListIcon,
    path: "/assigned-works",
  },
];
const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [authMenuItems, setAuthMenuItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  const toggleDrawer = () => setOpen(!open);
  const api = useAxios();
  const fetcher = (resource, init) =>
    api(resource, init).then((res) => res.data);

  const options = { fetcher: fetcher };

  useEffect(() => {
    if (isAdmin) {
      setAuthMenuItems([...adminMenuItems]);
    } else {
      setAuthMenuItems([]);
    }
  }, [isAdmin]);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <SWRConfig value={options}>
      <div className="h-[100vh]">
        <CssBaseline />

        {/* Top Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/30 border-b border-[var(--primary-gold)] py-3 px-4 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-wrap gap-y-4">
            {/* Left: Logo & Company Name */}
            <div className="flex items-center space-x-4">
              <img src={Logo} alt="Logo" className="h-14 w-auto" />
              <div>
                <h1 className="text-lg font-bold text-[var(--primary-gold)] font-serif">
                  CATERS HUB
                </h1>
                <p className="text-xs text-gray-500">The Way You Wanted.</p>
              </div>
            </div>

            {/* Center: Navigation */}
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-serif text-[#2c2c54]">
              {navItems.map((item) => (
                <a
                  key={item.title}
                  href={item.path}
                  className="hover:text-[var(--primary-gold)] transition"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Right: Social Icons + Enquire + Menu Button */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-[var(--primary-gold)] hover:scale-110 transition"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="text-[var(--primary-gold)] hover:scale-110 transition"
              >
                <Instagram />
              </a>
              <a
                href="#"
                className="text-[var(--primary-gold)] hover:scale-110 transition"
              >
                <YouTube />
              </a>
              <div className="flex gap-2">
                {!isRegisterPage && !user && (
                  <Button
                    className="hidden text-primary"
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </Button>
                )}

                {!isLoginPage && !user && (
                  <Button
                    variant="contained"
                    className={` ${isLoginPage ? "hidden" : ""}`}
                    size="small"
                    color="primary"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                )}
              </div>

              {/* Menu Button */}
              {user && (
                <IconButton
                  onClick={toggleDrawer}
                  className="text-[var(--primary-gold)]"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </div>
          </div>
        </header>

        {/* Drawer */}
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              <ListItem key="profile-edit" disablePadding>
                <ListItemButton onClick={handleOpen}>
                  <ListItemIcon>
                    <UserIcon className="w-5 h-5" />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItemButton>
              </ListItem>

              <ListItem key="upcoming-works" disablePadding>
                <ListItemButton
                  component={Link}
                  to={"/upcoming-works"}
                  selected={location.pathname === "/upcoming-works"}
                >
                  <ListItemIcon>
                    <BriefcaseIcon className="w-5 h-5" />
                  </ListItemIcon>
                  <ListItemText primary="Upcoming Works" />
                </ListItemButton>
              </ListItem>

              {!isAdmin && <ListItem key="user-assigned-works" disablePadding>
                <ListItemButton
                  component={Link}
                  to={"/user-assigned-works"}
                  selected={location.pathname === "/user-assigned-works"}
                >
                  <ListItemIcon>
                    <AssignmentInd className="w-5 h-5" />
                  </ListItemIcon>
                  <ListItemText primary="Assigned Works" />
                </ListItemButton>
              </ListItem>}

              {authMenuItems.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                  >
                    <ListItemIcon>
                      <item.icon className="w-5 h-5" />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <List>
              <ListItem disablePadding className="bg-red-100">
                <ListItemButton onClick={async () => await removeUser()}>
                  <ListItemIcon>
                    <Logout color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" className="text-red-700" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <div>
          <Modal isOpen={openModal} handleClose={handleClose} title="PROFILE">
            <ViewProfile handleClose={handleClose} />
          </Modal>
        </div>
        <main
          className="h-full"
          style={{
            paddingTop: 80,
            marginLeft: 0,
            transition: "margin 0.3s",
          }}
        >
          <Outlet />
        </main>
      </div>
    </SWRConfig>
  );
};

export default MainLayout;
