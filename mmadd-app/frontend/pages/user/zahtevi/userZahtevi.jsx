import React, { useEffect } from "react";
import { useState } from "react";
import "./userZahtevi.css";
import axios from "axios";
import { toast } from "react-hot-toast";

import UserNav from "../userNavBar/userNavbar";

const UserZahteviZaProgram = () => {
  const [cardShow, setCardShow] = useState(false);
  const [zahtevInfo, setZahtevInfo] = useState({});
  const [zahtevi, setZahtevi] = useState();

  const getZahtevi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-user-zahtevi",
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
    getZahtevi();
  }, []);

  console.log(zahtevi);
  return (
    <div id="zahtevMain">
      <div className="WorkSpace">
        <UserNav />
        <div className="rightFieldDiv">
          <div className="listaKorisnickihZahteva">
            <h1>Lista zahteva</h1>
            <div className="scrollDiv">
              {zahtevi?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.status === "pending"
                        ? "MyTermPending"
                        : item.status === "approved"
                        ? "MyTermAproved"
                        : "MyTermReject"
                    }
                  >
                    <p>
                      <strong>Ime: </strong>
                      {item.firstName} {item.lastName}{" "}
                    </p>
                    <p>
                      <strong>email: </strong>
                      {item.email}
                    </p>
                    <p>
                      <strong>Adresa: </strong>
                      {item.address}
                    </p>
                    <p>
                      {" "}
                      <strong>tehnologija: </strong>
                      {item.tehnologija}
                    </p>

                    <p>
                      <strong>Status: </strong>
                      {item.status}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {cardShow ? (
        <div className="ShowCardBackgroun">
          <div className="aproveCard">
            <div className="iconDiv">
              <img
                src="x.png"
                alt="X"
                onClick={() => {
                  setCardShow(false);
                }}
              />
            </div>
            <div className="infoDiv">
              <img src="Admin.png" alt="" />
              <div className="mainOfInfoDiv">
                <h3>
                  {zahtevInfo?.firstName} {zahtevInfo?.lastName}
                </h3>
                <p>Adresa: {zahtevInfo?.address}</p>
                <p>Email: {zahtevInfo?.email}</p>
                <p>Telefon: {zahtevInfo?.phoneNumber}</p>
                <p>Status: {zahtevInfo?.status}</p>
              </div>
            </div>
            <div className="btnsDiv">
              <button
                onClick={() => {
                  setCardShow(false);
                  //   aproveApointments();
                }}
              >
                Potvrdi
              </button>
              <button
                className="rejectBtn"
                onClick={() => {
                  setCardShow(false);
                  //   rejectApointments();
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default UserZahteviZaProgram;
