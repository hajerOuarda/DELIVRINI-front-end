import * as React from "react";
import {
  SwipeableDrawer,
  ListItemText,
  ListItemIcon,
  ListItem,
  Divider,
  List,
  Box,
  Button,
  Icon,
} from "@mui/material";

import TocIcon from "@mui/icons-material/Toc";
import { useNavigate } from "react-router-dom";
import {
  FoodBank,
  HowToReg,
  LocalDining,
  LoginRounded,
  MenuBook,
  RamenDining,
  Storefront,
} from "@mui/icons-material";
import { paths } from "../../utils/enums/routes";
import { HomePage } from "../../pages/HomePage";

export default function MenuComponent(props: any) {
  let navigate = useNavigate();
  const [state, setState] = React.useState({
    isOpen: false,
  });
  // const home = { name: "Home ", path: routes.user, icon: "home" }
  const mylist = [
    { name: "Home ", path: paths.home, icon: <HomePage /> },
    { name: "Sign Up", path: paths.signup, icon: <HowToReg /> },
    { name: "Log In", path: paths.login, icon: <LoginRounded /> },
    { name: "Restaurant", path: paths.restaurant, icon: <LocalDining /> },
    {
      name: "Restaurant Category",
      path: paths.restaurant_category,
      icon: <Storefront />,
    },
    { name: "Meal", path: paths.meal, icon: <RamenDining /> },
    { name: "Meal Category", path: paths.meal_category, icon: <MenuBook /> },
    { name: "Element", path: paths.element, icon: <FoodBank /> },
  ];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, isOpen: open });
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {mylist.map((element) => (
          <ListItem
            button
            onClick={() => {
              navigate(element.path);
            }}
          >
            <ListItemIcon>
              <Icon>{element.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={element.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List></List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <TocIcon />
      </Button>
      <SwipeableDrawer
        anchor={"left"}
        open={state.isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
      {props.children}
    </div>
  );
}

// <ListItem
//   button
//   onClick={() => {
//     navigate("/login");
//   }}
// >
//   <ListItemIcon>
//     <FoodBank />
//   </ListItemIcon>
//   <ListItemText primary="login" />
// </ListItem>;
