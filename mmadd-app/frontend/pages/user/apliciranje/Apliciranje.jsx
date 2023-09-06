import React, { useEffect } from "react";
import { useState } from "react";
import "./apliciranje.css";
import axios from "axios";
import UserNav from "../userNavBar/userNavbar";
import { toast } from "react-hot-toast";

const Apliciranje = () => {
  const [cardShow, setCardShow] = useState(false);

  const [zahtevInfo, setZahtevInfo] = useState();
  const [selectedTeh, setSelectedTeh] = useState("");
  const [validSubmit, setValidSubmit] = useState(false);
  const [validationArray, setValidationArray] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phoneNumber: true,
    address: true,
    tehnology: true,
  });

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
        });
        setValidationArray({
          ...validationArray,
          firstName: false,
          lastName: false,
          email: false,
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validSubmit) {
        const response = await axios.post(
          "http://localhost:5000/api/user/apliciranje",
          { ...zahtevInfo },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        console.log(response, "RESPONSE!");
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } else toast.error("Molimo vas ispunite sva polja");
    } catch (error) {
      toast.error("doslo je do greske pokusajte kasnije");
      console.log(error);
    }
  };

  const handleUserValues = (e) => {
    if (e.target.value !== "") {
      setZahtevInfo({
        ...zahtevInfo,
        [e.target.name]: e.target.value,
      });
      setValidationArray({
        ...validationArray,
        [e.target.name]: false,
      });
    } else {
      setValidationArray({
        ...validationArray,
        [e.target.name]: true,
      });
    }
    setZahtevInfo({
      ...zahtevInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateInputs = () => {
    validationArray.phoneNumber ||
    validationArray.address ||
    validationArray.tehnology
      ? setValidSubmit(false)
      : setValidSubmit(true);
  };
  useEffect(() => {
    validateInputs();
  }, [validationArray]);

  useEffect(() => {
    setZahtevInfo({
      ...zahtevInfo,
      tehnologija: selectedTeh,
    });

    if (selectedTeh === "") {
      setValidationArray({
        ...validationArray,
        tehnology: true,
      });
    } else {
      setValidationArray({
        ...validationArray,
        tehnology: false,
      });
    }
  }, [selectedTeh]);

  useEffect(() => {
    getUser();
  }, []);
  console.log(validSubmit);

  return (
    <div id="apliciranjeMain">
      <div className="WorkSpace">
        <UserNav />
        <div className="rightFieldDiv">
          <h1>Apliciraj za program</h1>
          <div className="bookingDiv">
            <div className="bookingFormDiv">
              <div className="middleLine"></div>
              <div className="aboveField">
                <div className="inputDiv">
                  <label htmlFor="phoneNumber">
                    <p
                      className={
                        validationArray.phoneNumber
                          ? "errorClass"
                          : "correctClass"
                      }
                    >
                      *Broj telefona
                    </p>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Broj telefona"
                    onChange={handleUserValues}
                  />
                </div>
                <div className="inputDiv">
                  <label htmlFor="address">
                    <p
                      className={
                        validationArray.address ? "errorClass" : "correctClass"
                      }
                    >
                      *Adresa
                    </p>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresa"
                    onChange={handleUserValues}
                  />
                </div>
              </div>
              <div className="middleLine"></div>
              <div className="belowField">
                <div className="inputDiv">
                  <label htmlFor="tehnology">
                    <p
                      className={
                        selectedTeh === "" ? "errorClass" : "correctClass"
                      }
                    >
                      *Tehnologija
                    </p>
                  </label>
                  <div className="tehnologysField">
                    <p
                      className={
                        selectedTeh === "AI"
                          ? "selectedTehnology"
                          : "unSelectedTehnology"
                      }
                      onClick={() => {
                        setSelectedTeh("AI");
                      }}
                    >
                      AI
                    </p>
                    <p
                      className={
                        selectedTeh === "DevOps"
                          ? "selectedTehnology"
                          : "unSelectedTehnology"
                      }
                      onClick={() => {
                        setSelectedTeh("DevOps");
                      }}
                    >
                      DevOps
                    </p>
                    <p
                      className={
                        selectedTeh === "Blockchain"
                          ? "selectedTehnology"
                          : "unSelectedTehnology"
                      }
                      onClick={() => {
                        setSelectedTeh("Blockchain");
                      }}
                    >
                      Blockchain
                    </p>
                  </div>
                </div>

                <div className="buttonDiv">
                  <button onClick={handleSubmit}>Apliciraj</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Apliciranje;
