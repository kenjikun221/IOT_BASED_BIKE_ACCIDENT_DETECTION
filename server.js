require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,

        pass: process.env.PASSWORD

    }

});

app.post("/sendEmail", async (req, res) => {

    const { lat, lng, speed, gforce } = req.body;

    try {

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.RECEIVER,

            subject: "🚨 RideGuardian Emergency Alert",

            html: `

            <h2>Possible Accident Detected</h2>

            <p><b>Latitude:</b> ${lat}</p>

            <p><b>Longitude:</b> ${lng}</p>

            <p><b>Speed:</b> ${speed} km/h</p>

            <p><b>G-Force:</b> ${gforce}</p>

            <a href="https://maps.google.com/?q=${lat},${lng}">
            Open Location
            </a>

            `

        });

        console.log("Emergency Email Sent");

        res.json({
            success:true
        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            success:false
        });

    }

});

app.get("/test", async (req, res) => {

    try {

        await transporter.sendMail({

            from: process.env.EMAIL,

            to: process.env.RECEIVER,

            subject: "✅ RideGuardian Test Email",

            html: `
                <h2>RideGuardian Test</h2>

                <p>This is a test email.</p>

                <p>If you received this, Gmail is working correctly!</p>
            `

        });

        console.log("Test email sent successfully!");

        res.send("✅ Test email sent!");

    }

    catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

});

app.listen(3000,()=>{

    console.log("RideGuardian Server Running");

});