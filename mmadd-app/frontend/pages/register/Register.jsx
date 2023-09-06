import { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({});
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validSubmit, setValidSubmit] = useState(false);
  const [chechValidation, setChechValidation] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let valid = true;
    if (!userData.email) {
      setEmailError("Potrebno je da unesete Vašu email adresu");
      valid = false;
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(userData.email)) {
      setEmailError("Uneta eemail adresa nije validna");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!userData.firstName) {
      setFirstNameError("Potrebno je da unesete vaše ime");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!userData.lastName) {
      setLastNameError("Potrebno je da unesete vaše prezime");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!userData.password) {
      setPasswordError("Potrebno je uneti šifru");
      valid = false;
    } else if (userData.password.length < 8) {
      setPasswordError("Šifra mora imati više od 8 karaktera");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Potrebno je potvrditi šifru");
      valid = false;
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError("Šifra potvrde mora imati više od 8 karaktera");
      valid = false;
    } else if (confirmPassword !== userData.password) {
      setConfirmPasswordError("Šifre se ne poklapaju");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }
    valid ? setValidSubmit(true) : setValidSubmit(false);
  };
  useEffect(() => {
    validateInputs();
  }, [userData, confirmPassword]);
  const onChangeInput = (e) => {
    if (e.target.name !== "confirmPassword") {
      setUserData({
        ...userData,
        [e.target.name]: e.target.value,
      });
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validSubmit) {
        console.log(userData);
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          userData
        );

        if (response.data.success) {
          console.log(response);
          toast.success(response.data.massage);
          navigate("/");
        } else {
          console.log(response);
          toast.error(response.data.massage);
        }
      } else toast.error("Molimo vas unesite ispravne podatke");
    } catch (error) {
      // toast.error(response.data.massage);
      console.log(error);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2>Registruj svoj besplatni nalog</h2>

        <div className="firstandlastnameMain">
          <div className="firstandlastname">
            <input
              type="text"
              placeholder="Ime"
              name="firstName"
              onChange={onChangeInput}
            />

            <span>{firstNameError}</span>
          </div>

          <div className="firstandlastname">
            <input
              type="text"
              placeholder="Prezime"
              name="lastName"
              onChange={onChangeInput}
            />

            <span>{lastNameError}</span>
          </div>
        </div>
        <div className="emailPasInputsDiv">
          <input
            type="email"
            placeholder="Email adresa"
            name="email"
            onChange={onChangeInput}
          />

          <span>{emailError}</span>
        </div>
        <div className="emailPasInputsDiv">
          <input
            type="password"
            placeholder="Kreiraj svoju šifru"
            name="password"
            onChange={onChangeInput}
          />

          <span>{passwordError}</span>
        </div>
        <div className="emailPasInputsDiv">
          <input
            type="password"
            placeholder="Potvrdi šifru"
            name="confirmPassword"
            onChange={onChangeInput}
          />

          <span>{confirmPasswordError}</span>
        </div>

        <button>Registruj se</button>

        <Link to={"/"}>Uloguj se</Link>
      </form>
      <br />
    </div>
  );
};

export default Register;
