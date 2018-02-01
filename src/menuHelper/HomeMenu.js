const sessionManager = require("../utility/sessionManager");
const menuConstant = require("../models/menuConstants");
const menuStage = require("../models/menuStage");
const reply = require("../utility/UssdReply").Reply
const messages = require("../models/meuTemplates")
const client = require("../utility/connection");
const format = require("pg-format");

module.exports = {
    ProcessHome: function ProcessHOME(req, res) {
        client.connect((err, client, done) => {
            if (err) {
                return reply(req, res, res.locals.session, messages.error_occured);
            } else {

                let msisdn = res.locals.session.msisdn;
                let dialogId = res.locals.session.dialogId;
                let menuName = menuConstant.LEVELTWO;
                let stage = menuStage.LEVEL_TWO;

                res.locals.session.stage = stage;
                res.locals.session.menuName = menuName;


                let query = format('SELECT * FROM "FindUserInfo"(%L)', res.locals.session.msisdn);
                client.query(query, (err, results) => {
                    done();
                    if (err) {
                        return reply(req, res, res.locals.session, messages.error_occured)
                    } else if (results.rows[0].FindUserInfo == 0) {
                        sessionManager.setMenuAndStoreSession(res.locals.session);
                        return reply(req, res, res.locals.session, messages.welcomeNoInfo, menuName, menuConstant.HEADER_FC);
                    } else if (results.rows[0].FindUserInfo > 0) {
                        sessionManager.setMenuAndStoreSession(res.locals.session);
                        return reply(req, res, res.locals.session, messages.welcomeInfo, menuName, menuConstant.HEADER_FC)
                    }
                })
            }
        })
    }
}