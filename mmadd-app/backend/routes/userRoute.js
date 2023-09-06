const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Zahtev = require("../models/zahteviModel");
const Group = require("../models/groupModel");
const jwt = require("jsonwebtoken");
const authMiddlewea = require("../midleweares/authMidleweares");
// const authMiddlewea = require("../midlewares/authMiddleweare");

router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(200).send({
        massage: "Email adresa je vec u upotrebi",
        success: false,
      });
    } else {
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;

      const newUser = new User(req.body);
      await newUser.save();

      res.status(200).send({
        massage: "Nalog je uspesno kreiran",
        success: true,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ massage: "Greska pri kreiranju naloga", success: false, error }); //sta znaci ova linija koda
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(200).send({
        massage:
          "Molimo vas proverite da li ste uneli ispravnu email adresu ili sifru",
        success: false,
      });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        res.status(200).send({
          massage:
            "Molimo vas proverite da li ste uneli ispravnu email adresu ili sifru",
          success: false,
        });
      } else {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.status(200).send({
          massage: "Uspesno izvrsena prijava",
          success: true,
          data: token,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ massage: "Greska pri logovanju", success: false, error });
  }
});

router.post("/get-user-info-by-id", authMiddlewea, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res
        .status(200)
        .send({ massage: "Korisnik ne postoji", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          zahtevi: user.zahtevi,
          isAdmin: user.isAdmin,
          aplikacije: user.aplikacije,
          imegrupe: user.imegrupe,
        },
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: "Greska pri pribavljanju konirsnickih informacija",
      success: false,
      error,
    });
  }
});

router.get("/get-users", authMiddlewea, async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res
        .status(200)
        .send({ massage: "Ne postoji ni jeda korisnik", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: users,
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: `Greska pri pribavljanju konirsnickih informacija `,
      success: false,
      error,
    });
  }
});

router.get("/get-sve-zahtevi", authMiddlewea, async (req, res) => {
  try {
    const zahtevi = await Zahtev.find({});
    console.log(zahtevi.length);
    if (zahtevi.length === 0) {
      return res
        .status(200)
        .send({ massage: "Ne postoji ni jeda zahtev", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: zahtevi,
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: `Greska pri pribavljanju  informacija o zahtevima `,
      success: false,
      error,
    });
  }
});

router.get("/get-user-zahtevi", authMiddlewea, async (req, res) => {
  try {
    const zahtevi = await Zahtev.find({
      userId: req.body.userId,
    });
    console.log(zahtevi.length);
    if (zahtevi.length === 0) {
      return res
        .status(200)
        .send({ massage: "Ne postoji ni jeda zahtev", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: zahtevi,
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: `Greska pri pribavljanju  informacija o zahtevima `,
      success: false,
      error,
    });
  }
});

router.get("/get-zahtevi", authMiddlewea, async (req, res) => {
  try {
    const zahtevi = await Zahtev.find({
      status: "pending",
    });
    console.log(zahtevi.length);
    if (zahtevi.length === 0) {
      return res
        .status(200)
        .send({ massage: "Ne postoji ni jeda zahtev", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: zahtevi,
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: `Greska pri pribavljanju  informacija o zahtevima `,
      success: false,
      error,
    });
  }
});

router.post("/apliciranje", authMiddlewea, async (req, res) => {
  try {
    const zahtev = await Zahtev.find({ userId: req.body.userId });

    if (zahtev.length >= 1) {
      return res.status(200).send({
        message:
          "Vec ste aplicirali,molimo vas pre nego opet posaljete  sacekajte da admin obradi vas zahtev",
        success: false,
      });
    } else {
      const newZahtev = new Zahtev({
        ...req.body,
        status: "pending",
      });
      await newZahtev.save();

      res
        .status(200)
        .send({ success: true, message: "Uspesno ste aplicirali za termin" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ messaga: "Greska pri apliciranju", success: false, error });
  }
});

router.get("/get-groups", authMiddlewea, async (req, res) => {
  try {
    const groups = await Group.find({});
    if (!groups) {
      return res
        .status(200)
        .send({ massage: "Ne postoji ni jedna grupa", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: groups,
      });
    }
  } catch (error) {
    return res.status(500).send({
      massage: `Greska pri pribavljanju liste grupa `,
      success: false,
      error,
    });
  }
});

router.post("/add-new-group", authMiddlewea, async (req, res) => {
  try {
    console.log(req.body);

    const newGroup = new Group(req.body);
    await newGroup.save();
    res.status(200).send({
      massage: "Terapija je uspesno dodata",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Greška pri dodavanju terapije.",
      success: false,
      error,
    });
  }
});

router.post("/delete-zahtev", authMiddlewea, async (req, res) => {
  try {
    console.log(req.body.id);
    const deletedZahtev = await Zahtev.findByIdAndRemove({
      _id: req.body.id,
    });

    if (!deletedZahtev) {
      return res.status(404).json({
        success: false,
        message: "Zahtev nije pronađen.",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Zahtev je uspješno obrisan.",
        deletedZahtev,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom brisanja zahteva.",
      error: error.message,
    });
  }
});

router.post("/delete-group", authMiddlewea, async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndRemove({
      _id: req.body._id,
    });

    if (!deletedGroup) {
      return res.status(404).json({
        success: false,
        message: "Grupa nije pronađena.",
      });
    } else {
      console.log(deletedGroup);
      await Zahtev.deleteMany({
        imegrupe: deletedGroup.ime,
      });

      return res.status(200).json({
        success: true,
        message: "Grupa je uspješno obrisana.",
        deletedGroup,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom brisanja grupe.",
      error: error.message,
    });
  }
});

router.post("/odbij-zahtev", authMiddlewea, async (req, res) => {
  try {
    console.log(req.body);
    const zahtev = await Zahtev.findOne({ userId: req.body.zahtevInfo.userId });
    zahtev.status = "rejected";
    await zahtev.save();

    res.status(200).send({ success: true, message: "Zahtev je odbijen." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Greška pri odobravanju zahteva.",
      success: false,
      error,
    });
  }
});

router.post("/delete-ucesnik", authMiddlewea, async (req, res) => {
  try {
    console.log(req.body.name);
    let ime = req.body.name.split(" ");
    console.log(ime);
    const group = await Group.findOne({
      ime: req.body.ime,
    });

    let seenNotifications = group.seenNotifications.filter((item) => {
      return item.data.name !== req.body.name;
    });

    await Group.findByIdAndUpdate(group._id, { seenNotifications });

    const zahtev = await Zahtev.findOneAndRemove({
      firstName: ime[0],
      lastName: ime[1],
    });

    return res.status(200).json({
      success: true,
      message: "Ucesnik je uspješno obrisana.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Došlo je do greške prilikom brisanja Ucesnik.",
      error: error.message,
    });
  }
});

router.post("/odobri-zahtev", authMiddlewea, async (req, res) => {
  try {
    console.log(req.body);
    const zahtev = await Zahtev.findOne({ userId: req.body.zahtevInfo.userId });
    zahtev.status = "approved";
    zahtev.imegrupe = req.body.tehno;
    await zahtev.save();
    await User.findByIdAndUpdate(zahtev.userId, { imegrupe: req.body.tehno });
    const group = await Group.findOne({ ime: req.body.tehno });
    const seenNotifications = group.seenNotifications;
    seenNotifications.push({
      data: {
        userId: req.body.zahtevInfo.userId,
        name:
          req.body.zahtevInfo.firstName + " " + req.body.zahtevInfo.lastName,
      },
    });
    await Group.findByIdAndUpdate(group._id, { seenNotifications });

    res.status(200).send({ success: true, message: "Zahtev je odobren." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Greška pri odobravanju zahteva.",
      success: false,
      error,
    });
  }
});

module.exports = router;
