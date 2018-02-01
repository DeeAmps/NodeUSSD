const express = require("express");
const messages = require("../models/meuTemplates");
const fs = require("fs");
const path = require("path");

const sessionModel = require("../models/sessionModel");
const menuConstant = require("../models/menuConstants");
const menuStage = require("../models/menuStage");
const sessionManager = require("./sessionManager")

exports.extractParams = (req, res, next) => {
    let inpmsisdn = req.query.msisdn;
    let userInput = req.query.userInput
    let inpdialogId = req.query.dialogId
    let allowed = checkMsisdn(inpmsisdn);

    if (!inpmsisdn && !inpdialogId) {
        return res.send(messages.incorrectParams);
    } else if (!allowed) {
        return res.send("Not ok");
    } else {
        sessionManager.getSession(req, res, next, inpmsisdn, inpdialogId, userInput);
    }

    function checkMsisdn(msisdn) {
        let allowed = fs.readFileSync(path.join(__dirname, "../allowed.txt"), 'utf-8').split('\r\n');
        for (let index = 0; index < allowed.length; index++) {
            if (allowed[index] == msisdn.toString()) {
                return true;
            }
        }
        return false;

    }
}