import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import ZahteviZaProgram from "../pages/admin/zahtevi/zahtevi";
import UserZahteviZaProgram from "../pages/user/zahtevi/userZahtevi";
import Korisnici from "../pages/admin/korisnici/Korisnici";
import Apliciranje from "../pages/user/apliciranje/Apliciranje";
import Grupe from "../pages/admin/grupe/grupe";
import Odbijeni from "../pages/admin/odbijeni/Odbijeni";
import UserGrupe from "../pages/user/grupa/grupa";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="korisnici" element={<Korisnici />} />

          <Route path="registracija" element={<Register />} />

          <Route path="zahtevi" element={<ZahteviZaProgram />} />

          <Route path="userzahtevi" element={<UserZahteviZaProgram />} />

          <Route path="apliciranje" element={<Apliciranje />} />

          <Route path="grupe" element={<Grupe />} />
          <Route path="odbijeni" element={<Odbijeni />} />
          <Route path="usergrupe" element={<UserGrupe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
