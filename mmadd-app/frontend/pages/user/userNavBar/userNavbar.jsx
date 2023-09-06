import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./userNavbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserNav = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") }, //ovo ubrzava obradu??
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log(response.data.data);
        navigate("/");
      }
    } catch (error) {
      setUser(null);
      console.log(error);
      navigate("/");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="WorkSpaceMeniDiv">
      <div className="AdminMeniTitle">
        <div>
          <h3>User</h3>
          <h4>{user?.firstName}</h4>
        </div>
        <p>Control panel</p>
      </div>
      <div className="WorkSpaceMeni">
        <Link className={"adminMeniLinks"} to={"/apliciranje"}>
          <div className="elemOfMeni">
            <img
              className="zahteviIcon"
              src="userNotification.png"
              alt="icon"
            />
            Apliciraj
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/userzahtevi"}>
          <div className="elemOfMeni">
            <img
              className="zahteviIcon"
              src="userNotification.png"
              alt="icon"
            />
            Zahtevi
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/usergrupe"}>
          <div className="elemOfMeni">
            <img src="membership.png" alt="icon" />
            Grupe
          </div>
        </Link>
        <div className="elemOfMeni">
          <img src="logout.png" alt="icon" />
          <Link className={"adminMeniLinks"} to={"/"}>
            Odjavi se
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserNav;
