const path = require("path");
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: "juliojimenez1998@gmail.com",
    clientId:
      "59360722351-oge8rannm7mmbnheqe9i5sflcu3r36it.apps.googleusercontent.com",
    clientSecret: "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",
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

var mailOptions = {
  from: "j.jimenezv098@gmail.com",
  to: "juliojimenez@gmail.com",
  subject: "Sending Email using Node.js",
  template: "emailCrearUsuario",
  context: {
    title: "Title Here",
    text: "Lorem ipsum dolor sit amet, consectetur...",
  },
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
