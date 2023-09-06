import React, { useEffect } from "react";
import { useState } from "react";
import "./odbijeni.css";
import axios from "axios";
import { toast } from "react-hot-toast";

import AdminNav from "../adminNavBar/adminNavBar";
const Odbijeni = () => {
  const [cardShow, setCardShow] = useState(false);
  const [zahtevId, setZahtevId] = useState({});
  const [zahtevi, setZahtevi] = useState();

  const getZahtevi = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/get-sve-zahtevi",
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

  const deleteZahtev = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/delete-zahtev",
        {
          id: zahtevId,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getZahtevi();
      }
    } catch (error) {
      toast.error("greska pri brisanju");
      console.log(error);
    }
  };
  useEffect(() => {
    getZahtevi();
  }, []);

  console.log(zahtevId);
  return (
    <div id="zahtevMain">
      <div className="WorkSpace">
        <AdminNav />
        <div className="rightFieldDiv">
          <div className="listaKorisnickihZahteva">
            <h1>Lista zahteva</h1>
            <div className="scrollDiv">
              {zahtevi?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.status === "rejected" ? "MyTermReject" : "MyTermNone"
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
                    <p
                      className="IzbrisiOdbijeni "
                      onClick={() => {
                        setCardShow(true);
                        setZahtevId(item._id);
                      }}
                    >
                      {" "}
                      Izbrisi
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
            <div className="potvrdaText">
              <h2>Potvrdite brisanje zahteva</h2>
            </div>
            <div className="btnsDiv">
              <button
                onClick={() => {
                  setCardShow(false);
                  deleteZahtev();
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
export default Odbijeni;
