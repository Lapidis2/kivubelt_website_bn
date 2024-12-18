const Subscription = require("../modal/subscribeModal");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();


async function subscribe(req, res) {
    const { email } = req.body;

    try {
        await Subscription.create({ email });
        const GMAIL = process.env.Admin_email;
        const GMAIL_PASSWORD = process.env.admin_psswd;
        let config = {
            service: "gmail",
            auth: {
                user: GMAIL,
                pass: GMAIL_PASSWORD,
            },
        };

        let transporter = nodemailer.createTransport(config);

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Mailgen",
                link: "https://mailgen.js/",
            },
        });

        let response = {
            body: {
                name: "KIVU GRAFTER WEBSITE",
                intro: "You have successfully subscribed to our Newsletter!",
                body: "You will be receiving the updates every time there is new arTicle posted",
                outro: "Looking forward to do more business",
            },
        };

        let mail = MailGenerator.generate(response);

        let message = {
            from: GMAIL,
            to: email,
            subject: "Read for interveiw",
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(201).json({
                    msg: "Check your email the futher actions",
                });
            })
            .catch((error) => {
                return res.status(500).json({ error });
            });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { subscribe };