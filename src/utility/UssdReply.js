const menuConstants = require("../models/menuConstants");
const session = require("../models/sessionModel");

module.exports = {
    Reply: function(req, res, session, message, menu = "", flowControl = menuConstants.HEADER_FB) {
        res.set("Freeflow", flowControl);
        res.set("Menu", menu);
        if (flowControl == menuConstants.HEADER_FB && session != null) {
            session.remove({ msisdn: session.msisdn, dialogId: session.dialogId });
        }
        return res.send(message);
    }
}