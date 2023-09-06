import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminNavBar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNav = () => {
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
  const [zahtevi, setZahtevi] = useState({});

  const getZahtevi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-zahtevi",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        setZahtevi(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getZahtevi();
  }, []);

  return (
    <div className="WorkSpaceMeniDiv">
      <div className="AdminMeniTitle">
        <div>
          <h3>Admin</h3>
          <h4>{user?.firstName}</h4>
        </div>
        <p>Control panel</p>
      </div>
      <div className="WorkSpaceMeni">
        <Link className={"adminMeniLinks"} to={"/korisnici"}>
          <div className="elemOfMeni">
            <img src="users.png" alt="icon" />
            Korisinici
          </div>
        </Link>

        <Link className={"adminMeniLinks"} to={"/zahtevi"}>
          <div className="elemOfMeni">
            <img
              className="zahteviIcon"
              src="userNotification.png"
              alt="icon"
            />
            Zahtevi{" "}
            <strong
              className={
                zahtevi.length !== 0 ? "zahteviBrojac" : "zahteviBrojacNone"
              }
            >
              {zahtevi.length !== 0 ? zahtevi.length : null}
            </strong>
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/odbijeni"}>
          <div className="elemOfMeni">
            <img src="userNotification.png" alt="icon" />
            Odbijeni
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/grupe"}>
          <div className="elemOfMeni">
            <img src="membership.png" alt="icon" />
            Grupe
          </div>
        </Link>
        <Link className={"adminMeniLinks"} to={"/"}>
          <div className="elemOfMeni">
            <img src="logout.png" alt="icon" />
            Odjavi se
          </div>
        </Link>
      </div>
    </div>
  );
};
export default AdminNav;
