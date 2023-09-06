import React, { useEffect } from "react";
import { useState } from "react";
import "./grupe.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminNav from "../adminNavBar/adminNavBar";
import { useNavigate } from "react-router-dom";

const Grupe = () => {
  const navigate = useNavigate();
  const [filterValues, setFilterValues] = useState("");
  const [newGroupCardShow, setnewGroupCardShow] = useState(false);
  const [ucesnikIme, setUcesnikIme] = useState("");
  const [imeGrupeUceniska, setImeGrupeUceniska] = useState("");
  const [deleteUcesnikCard, setDeleteUcesnikCard] = useState(false);
  const [deleteGroupCardShow, setdeleteGroupCardShow] = useState(false);

  const [deleteGroupValues, setdeleteGroupValues] = useState({
    imegrupe: "",
    id: "",
  });

  const [newGroupValues, setnewGroupValues] = useState({
    tehnologija: "",
    ime: "",
  });
  const [dropDownClick, setDropDownClick] = useState(false);
  const [grupe, setGrupe] = useState([]);

  const handleFilterInput = (e) => {
    setFilterValues(e.target.value);
  };

  const handlenewGroupValues = (e) => {
    setnewGroupValues({
      ...newGroupValues,
      [e.target.name]: e.target.value,
    });
  };

  const AddNewGroup = async () => {
    setnewGroupCardShow(false);
    try {
      if (newGroupValues.tehnologija != "" && newGroupValues.ime != "") {
        const response = await axios.post(
          "http://localhost:5000/api/user/add-new-group",
          {
            tehnologija: newGroupValues.tehnologija,
            ime: newGroupValues.ime,
          },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.massage);

          setnewGroupValues({
            tehnologija: "",
            ime: "",
          });

          getGroups();
        } else {
          toast.error(response.data.massage);
        }
      } else {
        toast.error("popunite sva polja");
      }
    } catch (error) {}
  };

  const deleteUcesnik = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/delete-ucesnik",
        {
          name: ucesnikIme,
          ime: imeGrupeUceniska,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getGroups();
      }
    } catch (error) {
      toast.error("greska pri brisanju");
      console.log(error);
    }
    setDeleteUcesnikCard(false);
  };
  const deleteGroup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/delete-group",
        {
          _id: deleteGroupValues.id,
          imegrupe: deleteGroupValues.imegrupe,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getGroups();
      }
    } catch (error) {
      toast.error("greska pri brisanju");
      console.log(error);
    }
    setdeleteGroupCardShow(!deleteGroupCardShow);
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

  useEffect(() => {
    getGroups();
    getUser();
  }, []);

  const handleShowingValues = () => {
    setnewGroupCardShow(!newGroupCardShow);
  };

  const handleShowingDeleteTherapyDiv = (item, imegrupe) => {
    setdeleteGroupCardShow(!deleteGroupCardShow);
    if (item !== "") {
      setdeleteGroupValues({ id: item, imegrupe: imegrupe });
    }
  };

  return (
    <div id="grupeMain">
      {newGroupCardShow ? (
        <div className="DivForAddingNewTherapyMain">
          <div className="NewTherapyInputsDiv">
            <div className="newTherapyXiconDiv">
              <img
                className="xIcon"
                src="x.png"
                alt="X"
                onClick={handleShowingValues}
              />
            </div>
            <h1>Add New Group</h1>
            <div className="DivInput">
              <label
                className={
                  newGroupValues.ime === "" ? "labelEror" : "labelCorect"
                }
                htmlFor="ime"
              >
                Ime grupe:
              </label>
              <input
                type="text"
                name="ime"
                placeholder="Unesite ime"
                onChange={handlenewGroupValues}
              />
            </div>
            <div className="DivInput">
              <label
                className={
                  newGroupValues.tehnologija === ""
                    ? "labelEror"
                    : "labelCorect"
                }
                htmlFor="tehnologija"
              >
                Tehnologija:
              </label>
              <div className="categoryOfTherapySelector">
                <div
                  onClick={() => {
                    setDropDownClick(!dropDownClick);
                  }}
                  className="selsectorMainField"
                >
                  {newGroupValues.tehnologija === "" ? (
                    <p> izaberi kategoriju</p>
                  ) : (
                    newGroupValues.tehnologija
                  )}
                  <img src={dropDownClick ? "up.png" : "down.png"} alt="icon" />
                </div>

                {dropDownClick ? (
                  <div className="categoryOfTherapySelectorDropDown">
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setnewGroupValues({
                          ...newGroupValues,
                          tehnologija: "AI",
                        });
                      }}
                    >
                      AI
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setnewGroupValues({
                          ...newGroupValues,
                          tehnologija: "DevOps",
                        });
                      }}
                    >
                      DevOps
                    </div>
                    <div
                      className="selsectorDropDownField"
                      onClick={() => {
                        setnewGroupValues({
                          ...newGroupValues,
                          tehnologija: "Blockchain",
                        });
                      }}
                    >
                      Blockchain
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <button onClick={AddNewGroup}>Add</button>
          </div>
        </div>
      ) : null}

      <div className="WorkSpace">
        <AdminNav />
        <div className="ListeDiv">
          <div className="listaGroupa">
            <h1>Lista Grupa</h1>
            <div className="DivForGroupCards">
              <div className="filterAndAddDiv">
                <input
                  placeholder="filtriraj po nazivu"
                  type="text"
                  onChange={handleFilterInput}
                />
                <button onClick={handleShowingValues}>Dodaj novu grupu</button>
              </div>

              {grupe.map((item, index) => {
                let ucesniciTemp = item?.seenNotifications;

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
                                <p
                                  className="izbrisiUcesnik"
                                  onClick={() => {
                                    setDeleteUcesnikCard(true);
                                    setUcesnikIme(elem.data.name);
                                    setImeGrupeUceniska(item.ime);
                                  }}
                                >
                                  izbrisi
                                </p>{" "}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="GroupButtonsDiv">
                        <button
                          className="deleteButton"
                          onClick={() => {
                            handleShowingDeleteTherapyDiv(item._id, item.ime);
                          }}
                        >
                          Izbriši grupu
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {deleteGroupCardShow ? (
        <div className="deleteTherapyDivMain">
          <div className="deleteTherapyDiv">
            <h3>Potvrdite da zelite da izbrisete grupu</h3>
            <div className="deleteTherapyButtonsDiv">
              <button onClick={deleteGroup}>Potvrdi</button>
              <button
                onClick={() => {
                  setdeleteGroupCardShow(!deleteGroupCardShow);
                  setdeleteGroupValues("");
                }}
              >
                Odbij
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {deleteUcesnikCard ? (
        <div className="deleteTherapyDivMain">
          <div className="deleteTherapyDiv">
            <h3>Potvrdite da zelite da izbrisete ucesnika</h3>
            <div className="deleteTherapyButtonsDiv">
              <button onClick={deleteUcesnik}>Potvrdi</button>
              <button
                onClick={() => {
                  setUcesnikIme("");
                  setDeleteUcesnikCard(false);
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
export default Grupe;
