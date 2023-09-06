import React, { useEffect } from "react";
import { useState } from "react";
import "./grupa.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import UserNav from "../userNavBar/userNavbar";
import { useNavigate } from "react-router-dom";

const UserGrupe = () => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState("");
  const [newGroupCardShow, setnewGroupCardShow] = useState(false);
  const [zahtevInfo, setZahtevInfo] = useState({});
  const [dropDownClick, setDropDownClick] = useState(false);
  const [grupe, setGrupe] = useState([]);

  const handleFilterInput = (e) => {
    setFilterValues(e.target.value);
  };

  const getGroups = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-groups",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setGrupe([...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };
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
        setZahtevInfo({
          ...zahtevInfo,
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          email: response.data.data.email,
          imegrupe: response.data.data.imegrupe,
        });
      } else {
        console.log(response.data.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  useEffect(() => {
    getGroups();
    getUser();
  }, []);
  console.log(zahtevInfo, "ime");
  return (
    <div id="grupeMain">
      <div className="WorkSpace">
        <UserNav />
        <div className="ListeDiv">
          <div className="listaGroupa">
            <h1>Moja grupa</h1>
            <div className="DivForGroupCards">
              <div className="filterAndAddDiv"></div>
              {grupe.length === 0 ? (
                <h1>"Jos uvek niste prihvaceni u grupu"</h1>
              ) : null}{" "}
              {grupe.map((item, index) => {
                let ucesniciTemp = item?.seenNotifications;
                if (zahtevInfo.imegrupe === item.ime) {
                  return (
                    <div
                      key={index}
                      className={
                        filterValues === "" ||
                        item.ime
                          .toLowerCase()
                          .includes(filterValues.toLowerCase())
                          ? "groupCard"
                          : "groupCardDisplayNone"
                      }
                    >
                      <div className="rightFieldGroupCard">
                        <div>
                          <h3>{item?.ime}</h3>
                          <p>{item?.tehnologija}</p>
                          <div className="groupCardDoctors"></div>
                          <strong>Ucesnici:</strong>

                          <div className="ucesniciDivTable">
                            {ucesniciTemp?.map((elem, index) => {
                              let ime = index + 1 + "" + elem.data.name;

                              return (
                                <div className="ucesnikDiv">
                                  {" "}
                                  <p>{ime}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="GroupButtonsDiv"></div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserGrupe;
