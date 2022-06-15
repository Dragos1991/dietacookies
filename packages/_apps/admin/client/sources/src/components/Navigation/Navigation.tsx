import type { FunctionComponent } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";

import { NavLink, useLocation } from "react-router-dom";

const drawerWidth = 240;

interface INavigationProps {}

export const navigationRoutes = {
    dashboard: {
        path: "/",
        name: "Dashboard",
    },
    categories: {
        path: "/categories",
        name: "Categories",
    },
    products: {
        path: "/products",
        name: "Products",
    },
};

const Navigation: FunctionComponent<INavigationProps> = () => {
    const location = useLocation();
    const { dashboard, categories, products } = navigationRoutes;
    return (
        <Drawer
            variant="permanent"
            open={true}
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
        >
            <List>
                <ListItem
                    disablePadding
                    disabled={location.pathname === dashboard.path}
                >
                    <NavLink
                        to="/"
                        style={{
                            display: "block",
                            width: "100%",
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={dashboard.name} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    disabled={location.pathname === categories.path}
                >
                    <NavLink
                        to="/categories"
                        style={{
                            display: "block",
                            width: "100%",
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={categories.name} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                <ListItem
                    disablePadding
                    disabled={location.pathname === products.path}
                >
                    <NavLink
                        to="/products"
                        style={{
                            display: "block",
                            width: "100%",
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={products.name} />
                        </ListItemButton>
                    </NavLink>
                </ListItem>
            </List>
        </Drawer>
    );
};

export { Navigation };
