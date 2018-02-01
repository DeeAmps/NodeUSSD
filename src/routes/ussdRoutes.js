const express = require("express");
const ussdParams = require("../utility/ussdParams").extractParams;
const menuStages = require("../models/menuStage");
const router = express.Router();
const Home = require("../menuHelper/HomeMenu");
const LevelOne = require("../menuHelper/LevelOneMenu");


router.get('/', ussdParams, (req, res) => {
    switch (res.locals.session.stage) {
        case menuStages.LEVEL_ONE:
            return Home.ProcessHome(req, res);
            break;
        case menuStages.LEVEL_TWO:
            return LevelOne.ProcessLevelOne(req, res);
            break;
        case menuStages.LEVEL_THREE:
            return ProcessLevelTwo();
            break;
        default:
            break;
    }
});

module.exports = router;