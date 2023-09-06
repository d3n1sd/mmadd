import React, { useEffect } from "react";
import { useState } from "react";
import "./zahtevi.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminNav from "../adminNavBar/adminNavBar";

const ZahteviZaProgram = () => {
  const [cardShow, setCardShow] = useState(false);

  const [zahtevInfo, setZahtevInfo] = useState({});
  const [zahtevi, setZahtevi] = useState();
  const [tehno, setTehno] = useState("");
  const [dropDownClick, setDropDownClick] = useState(false);
  const [grupe, setGrupe] = useState([]);
  const [tehnoFotGroup, setTehnoFotGroup] = useState("");
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

  const odobriZahtev = async () => {
    try {
      if (tehno !== "") {
        const response = await axios.post(
          "http://localhost:5000/api/user/odobri-zahtev",
          { zahtevInfo, tehno },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.data.success) {
          toast.success("Zahtev je odobren");
          getZahtevi();
          setTehno("");
        }
      } else {
        toast.error("izaberite grupu");
      }
    } catch (error) {
      setTehno("");
      console.log(error);
    }
  };

  const odbijZahtev = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/odbij-zahtev",
        { zahtevInfo },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success("Zahtev je odbijen");
        getZahtevi();
        setTehno("");
      }
    } catch (error) {
      setTehno("");
      console.log(error);
    }
  };

  const showingCard = (item) => {
    setCardShow(true);
    setZahtevInfo(item);
    setTehnoFotGroup(item.tehnologija);
  };

  useEffect(() => {
    getZahtevi();
    getGroups();
  }, []);
  useEffect(() => {
    setZahtevInfo({ ...zahtevInfo, grupa: tehno });
  }, [tehno]);
  console.log(tehnoFotGroup);
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
                    className="Zahtev"
                    onClick={() => {
                      showingCard(item);
                    }}
                  >
                    Korisnik {item.firstName} {item.lastName} je aplicirao za
                    obuku.
                    <p>Vise</p>
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
                  setTehno("");
                }}
              />
            </div>
            <div className="infoDiv">
              <div className="DivInput">
                <label
                  className={tehno === "" ? "labelEror" : "labelCorect"}
                  htmlFor="tehnologija"
                >
                  Grupa:
                </label>
                <div className="categoryOfTherapySelector">
                  <div
                    onClick={() => {
                      setDropDownClick(!dropDownClick);
                    }}
                    className="selsectorMainField"
                  >
                    {tehno === "" ? <p> Dodeli grupu</p> : tehno}
                    <img
                      src={dropDownClick ? "up.png" : "down.png"}
                      alt="icon"
                    />
                  </div>

                  {dropDownClick ? (
                    <div className="categoryOfTherapySelectorDropDown">
                      {grupe?.map((item, index) => {
                        return (
                          <div
                            className="selsectorDropDownField"
                            onClick={() => {
                              setTehno(item.ime);
                            }}
                          >
                            {item.ime} - {item.tehnologija}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mainOfInfoDiv">
                <h3>
                  {zahtevInfo?.firstName} {zahtevInfo?.lastName}
                </h3>
                <p>Adresa: {zahtevInfo?.address}</p>
                <p>Email: {zahtevInfo?.email}</p>
                <p>Telefon: {zahtevInfo?.phoneNumber}</p>
                <p>Status: {zahtevInfo?.status}</p>
                <p>Tehnologija: {zahtevInfo?.tehnologija}</p>
              </div>
            </div>
            <div className="btnsDiv">
              <button
                onClick={() => {
                  setCardShow(false);
                  odobriZahtev();
                }}
              >
                Potvrdi
              </button>
              <button
                className="rejectBtn"
                onClick={() => {
                  setCardShow(false);
                  odbijZahtev();
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
export default ZahteviZaProgram;
