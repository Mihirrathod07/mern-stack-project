import React, { Fragment, useState } from "react";
import "./Header.css";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Backdrop from "@material-ui/core/Backdrop";
import { LayoutDashboard} from "lucide-react";
import { ListChecks } from "lucide-react";
import { UserRound } from "lucide-react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert"
import { logout } from "../../../actions/userAction";
import { useDispatch , useSelector } from "react-redux";
import { ShoppingCart } from 'lucide-react';


const UserOptions = ({ user }) => {

  const { cartItems } = useSelector((state)=> state.cart);

  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  

  const options = [
    { icon: <ListChecks />, name: "Orders", func: orders },
    { icon: <UserRound />, name: "Profile", func: account },
    { icon:( <ShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />),
     name: `Cart(${cartItems.length})`, 
    func: Cart,
   },   
    { icon: <LogOut />, name: "Logout", func: logoutUser },
  ];

  if (user && user.role === "admin") {
    options.unshift({
      icon: <LayoutDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    Navigate("/admin/dashboard");
  }

  function orders() {
    Navigate("/orders");
  }

  function account() {
    Navigate("/account");
  }
  function Cart() {
    Navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Succesfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;