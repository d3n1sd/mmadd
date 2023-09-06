import React, { useEffect } from "react";
import AdminNav from "../adminNavBar/adminNavBar";
import { useState } from "react";

import "./korisnici.css";
import axios from "axios";

import { toast } from "react-hot-toast";

const Korisnici = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [showDeleteUserDiv, setShowDeleteUserDiv] = useState(false);
  const [showChangeUserDiv, setShowChangeUserDiv] = useState(false);
  const [UserID, setUserID] = useState("");
  const [userInfo, setUserInfo] = useState();

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-users",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.data);
      setKorisnici([...response.data.data]);
    } catch (error) {}
  };

  // const deleteUser = async () => {
  //   try {
  //     dispatch(showLoading);
  //     const response = await axios.post(
  //       "http://localhost:5000/api/admin/delete-user",
  //       {
  //         _id: UserID,
  //       },
  //       {
  //         headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     dispatch(hideLoading);
  //     if (response.data.success) {
  //       toast.success(response.data.message);

  //       getUsers();
  //     }
  //   } catch (error) {
  //     toast.error("greska pri brisanju");
  //     console.log(error);
  //   }
  //   setShowDeleteUserDiv(!showDeleteUserDiv);
  // };
  // const hendleUserInfo = (e) => {
  //   setUserInfo({
  //     ...userInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const changeUserInfo = async () => {
  //   try {
  //     console.log(userInfo);
  //     dispatch(showLoading);
  //     const response = await axios.post(
  //       "http://localhost:5000/api/admin/change-user-info",
  //       {
  //         _id: userInfo._id,
  //         firstName: userInfo.firstName,
  //         lastName: userInfo.lastName,
  //         email: userInfo.email,
  //       },
  //       {
  //         headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     dispatch(hideLoading);
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       getUsers();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setShowChangeUserDiv(false);
  // };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div id="adminMain">
      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="listaKorisnika">
            <h1>Lista korisnika</h1>
            <div className="DivForUserCards">
              {korisnici.map((item, index) => {
                return (
                  <div key={index} className="userCard">
                    <div>
                      <p>
                        <strong>ime:</strong>{" "}
                      </p>
                      <p>{`${item.firstName} ${item.lastName}`}</p>
                    </div>
                    <div>
                      <p>
                        <strong>email:</strong>{" "}
                      </p>
                      <p>{item.email}</p>
                    </div>
                    <div>
                      <p>
                        <strong> datum:</strong>
                      </p>
                      <p>
                        {item.updatedAt.split("").slice(8, 10)}-
                        {item.updatedAt.split("").slice(5, 7)}-
                        {item.updatedAt.split("").slice(0, 4)}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>status:</strong>{" "}
                      </p>
                      <p>{item.isAdmin ? "Admin" : "User"}</p>
                    </div>

                    {/* <div className="usersBtnDiv">
                      <button
                        onClick={() => {
                          setShowChangeUserDiv(!showChangeUserDiv);
                          setUserInfo(item);
                        }}
                      >
                        Izmeni
                      </button>
                      <button
                        id="userDeleteDiv"
                        onClick={() => {
                          setShowDeleteUserDiv(true);
                          setUserID(item._id);
                        }}
                      >
                        Izbrisi
                      </button>
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* {showDeleteUserDiv ? (
        <div className="deleteUserDivMain">
          <div className="deleteUserDiv">
            <h3>Potvrdite da zelite da izbrisete terapiju</h3>
            <div className="deleteUserButtonsDiv">
              <button onClick={deleteUser}>Potvrdi</button>
              <button
                id="userDeleteBtn"
                onClick={() => {
                  setShowDeleteUserDiv(false);
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null} */}
      {/* {showChangeUserDiv ? (
        <div className="cardForChangeBackground">
          <div className="cardForChange">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setShowChangeUserDiv(!showChangeUserDiv);
                }}
              />
            </div>
            <div className="userInfoElement">
              <label htmlFor="firstName">Ime</label>
              <input
                name="firstName"
                type="text"
                placeholder="Promeni Ime"
                onChange={hendleUserInfo}
              />
            </div>
            <div className="userInfoElement">
              <label htmlFor="lastName">Prezime</label>
              <input
                name="lastName"
                type="text"
                placeholder="Promeni Prezime"
                onChange={hendleUserInfo}
              />
            </div>
            <div className="userInfoElement">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Promeni Email adresu"
                onChange={hendleUserInfo}
              />
            </div>
            <button onClick={changeUserInfo}>Promeni</button>
          </div>
        </div>
      ) : null} */}
    </div>
  );
};
export default Korisnici;
