const sessionManager = require("../utility/sessionManager");
const menuConstant = require("../models/menuConstants");
const menuStage = require("../models/menuStage");
const reply = require("../utility/UssdReply").Reply
const messages = require("../models/meuTemplates")
const client = require("../utility/connection");
const format = require("pg-format");
const util = require('util');

function GetInfo(req, res, menuName, msisdn) {
    client.connect((err, client, done) => {
        if (err) {
            return reply(req, res, res.locals.session, messages.incorrectInput);
        }
        let query = format('SELECT * FROM "GetUserInfo"(%L)', msisdn);
        client.query(query, (err, results) => {
            done();
            if (err) {
                return reply(req, res, res.locals.session, messages.incorrectInput);
            }
            let message = util.format(messages.Info, results.rows[0].FirstName, results.rows[0].LastName, (results.rows[0].DateOfBirth).toDateString());
            return reply(req, res, res.locals.session, message, menuName, menuConstant.HEADER_FB)
        })
    });
}

module.exports = {
    ProcessLevelOne: function ProcessLevelOne(req, res) {
        client.connect((err, client, done) => {
            if (err) {
                return reply(req, res, res.locals.session, messages.error_occured);
            } else {

                let msisdn = res.locals.session.msisdn;
                let dialogId = res.locals.session.dialogId;
                let menuName = menuConstant.LEVELTHREE;
                let stage = menuStage.LEVEL_THREE;
                let userInput = res.locals.session.userInput;

                let query = format('SELECT * FROM "FindUserInfo"(%L)', res.locals.session.msisdn);
                client.query(query, (err, results) => {
                    done();
                    if (err) {
                        return reply(req, res, res.locals.session, messages.error_occured)
                    } else if (results.rows[0].FindUserInfo == 0 && userInput == "1") {
                        sessionManager.setMenuAndStoreSession(res.locals.session);
                        return reply(req, res, res.locals.session, messages.firstName, menuName, menuConstant.HEADER_FC);
                    } else if (results.rows[0].FindUserInfo > 0 && userInput == "1") {
                        return GetInfo(req, res, menuName, msisdn);
                    } else if (results.rows[0].FindUserInfo > 0 && userInput == "2") {
                        sessionManager.setMenuAndStoreSession(res.locals.session);
                        return reply(req, res, res.locals.session, messages.newFirstName, menuName, menuConstant.HEADER_FC)
                    } else {
                        return reply(req, res, res.locals.session, messages.incorrectInput);
                    }
                });
            }
        });

    }
}