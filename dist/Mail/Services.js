"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const util_1 = __importDefault(require("util"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const readFileAsync = util_1.default.promisify(fs_1.default.readFile);
const transporter = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: 'sheikmo2425v@gmail.com',
        pass: 'zlot ttwq csto ykt'
    }
});
// Function to send email
const sender = (to, subject, text, cc, bcc, templateName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const template = yield readFileAsync(path_1.default === null || path_1.default === void 0 ? void 0 : path_1.default.join(__dirname, `./Templates/${templateName}.ejs`));
    const html = ejs_1.default === null || ejs_1.default === void 0 ? void 0 : ejs_1.default.render(template.toString(), Object.assign(data || {}));
    try {
        let info = yield transporter.sendMail({
            from: 'sheikmo2425v@gmail.com',
            to: to,
            subject: subject,
            cc: cc,
            bcc: bcc,
            text: text,
            html: html
        });
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
        return info.messageId;
    }
    catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error;
    }
});
exports.default = sender;
