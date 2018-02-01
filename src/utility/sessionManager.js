const sessionModel = require("../models/sessionModel");
const menuConstant = require("../models/menuConstants");
const menuStage = require("../models/menuStage");

module.exports = {
    getSession: function(req, res, next, inpmsisdn, inpdialogId, userInput = "") {
        let sessionData = sessionModel.findOne({ msisdn: inpmsisdn, dialogId: inpdialogId }, (err, data) => {
            if (data != null) {
                res.locals.session = data;
                next()
            } else {
                let sessionStore = new sessionModel();

                sessionStore.dialogId = inpdialogId;
                sessionStore.msisdn = inpmsisdn;
                sessionStore.menuName = menuConstant.HOME;
                sessionStore.stage = menuStage.LEVEL_ONE;
                sessionStore.userInput = userInput || "";
                sessionStore.save();

                res.locals.session = sessionStore;
                next();
            }
        })
    },

    setMenuAndStoreSession(session) {
        let imsisdn = session.msisdn;
        let idialogId = session.dialogId;
        let imenuName = session.menuName;
        let istage = session.stage;

        sessionModel.findOneAndUpdate({ msisdn: imsisdn, dialogId: idialogId }, { msisdn: imsisdn, dialogId: idialogId, menuName: imenuName, stage: istage }, function(err, results) {
            if (err) {
                console.log(err);
            }
            console.log("Updated!");
        });
    }
}