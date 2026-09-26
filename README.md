🛡️ RideGuardian

Smart Bike Accident Detection & Emergency Monitoring System

RideGuardian is an ESP32-based smart bike safety prototype that combines an ADXL345 accelerometer, NEO-6M GPS, and a Wi-Fi web dashboard to monitor motion and detect possible accidents.

When an accident is confirmed, the system can activate a buzzer, display an emergency alert, show the latest GPS location, and send an emergency email through a Node.js server.

⚠️ Educational prototype: This system is not a certified safety or emergency-response device.

✨ Features

🚨 Multi-stage accident detection

📐 Accelerometer-based tilt monitoring

📍 GPS latitude and longitude

🛰️ Satellite count and GPS status

🏍️ Live speedometer

📊 Live X/Y/Z acceleration graph

🧭 Google Maps location link

🔊 ESP32 buzzer alert

🚨 Emergency popup

⏳ SOS countdown

📄 Accident log

📈 Trip statistics

❤️ System-health monitoring

📧 Emergency email through Node.js + Nodemailer

💾 ESP32 LittleFS web dashboard

🧠 Accident Detection

The current firmware uses a state machine:

NORMAL
   │
   │ Strong impact
   ▼
IMPACT
   │
   │ Tilt > 65°
   ▼
FALLEN
   │
   │ Remains fallen for 5 seconds
   ▼
ACCIDENT

The impact stage checks a sudden acceleration change and G-force. The fall stage confirms significant tilt, and the bike must remain fallen for approximately 5 seconds before the accident state is confirmed.

After confirmation, the ESP32 sends "status":"ACCIDENT" to the dashboard and activates the emergency response.

🏗️ System Architecture

ADXL345 ──┐
          │
NEO-6M ───┼──> ESP32 ──> LittleFS Web Dashboard
          │             │
Buzzer ───┘             └──> Node.js Email Server
                                      │
                                      └──> Gmail

🔩 Hardware

Component

Purpose

ESP32 DevKit

Main controller, processing and Wi-Fi server

ADXL345

Acceleration and orientation

NEO-6M GPS

Location, speed and satellites

Buzzer

Local emergency alert

Breadboard / jumper wires

Prototyping

USB power

Development power

🔌 Pin Connections

ADXL345 → ESP32

ADXL345

ESP32

VCC

3.3V

GND

GND

SDA

GPIO 21

SCL

GPIO 22

NEO-6M → ESP32

NEO-6M

ESP32

TX

GPIO 4

RX

GPIO 5

GND

GND

VCC

Appropriate supply for your breakout

Buzzer → ESP32

Buzzer

ESP32

Signal / +

GPIO 18

GND / -

GND

🛠️ Software

PlatformIO

Arduino framework

C++

HTML / CSS / JavaScript

LittleFS

WiFi / WebServer

Adafruit ADXL345 library

TinyGPS++

Chart.js

Leaflet.js

OpenStreetMap

Node.js

Express

Nodemailer

Gmail

📁 Project Structure

VehicleAccidentDetectionSystem/
├── src/
│   └── main.cpp
├── data/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── email-server/
│   ├── server.js
│   └── .env
├── platformio.ini
└── README.md

🚀 Setup

1. Configure Wi-Fi

In main.cpp:

const char* ssid = "YOUR_WIFI_OR_HOTSPOT";
const char* password = "YOUR_PASSWORD";

2. Upload firmware

Use PlatformIO:

PlatformIO → Upload

3. Upload the web files

Whenever files in data/ change:

PlatformIO → Upload Filesystem Image

4. Open Serial Monitor

Set the baud rate to:

115200

The ESP32 will print an address such as:

WiFi Connected
IP : 172.26.x.x
Web Server Started

Open the printed IP address in a browser connected to the same network.

📧 Emergency Email

The ESP32 does not send Gmail directly. The current flow is:

ESP32
   ↓
HTTP POST /sendEmail
   ↓
Node.js server :3000
   ↓
Nodemailer
   ↓
Gmail

Example .env:

EMAIL=your-gmail@gmail.com
PASSWORD=your-google-app-password
RECEIVER=receiver@gmail.com

Keep .env private and add it to .gitignore:

.env
node_modules/

Start the email server:

cd email-server
npm install
node server.js

The Node.js server also provides:

GET /test

for testing the email service.

🌐 API

Status

GET /status

Example:

{"status":"ONLINE"}

Sensor data

GET /sensor

Example:

{
  "status": "SAFE",
  "x": -5.81,
  "y": -3.37,
  "z": -9.38,
  "total": 11.65,
  "tilt": 18.4,
  "lat": 26.105146,
  "lng": 91.593971,
  "speed": 0.0,
  "sat": 8
}

🖥️ Dashboard

The dashboard displays:

Live safety status

GPS information

Speedometer

Acceleration

G-force

Live map and bike marker

Route

Acceleration graph

Trip distance

Ride time

Top speed

Maximum G-force

Emergency monitoring

SOS countdown

Accident log

System health

🧪 Testing

For a controlled bench demonstration:

Normal
  ↓
Strong impact
  ↓
IMPACT
  ↓
Tilt > 65°
  ↓
FALLEN
  ↓
5 seconds
  ↓
ACCIDENT

Check the Serial Monitor, dashboard, buzzer, popup, accident log and email server during testing.

Do not perform dangerous road tests. Use safe, controlled testing.

⚠️ Limitations

GPS requires reasonable satellite visibility and may not work reliably indoors.

GPS speed can drift slightly when stationary.

The accident detector is threshold/state-machine based and is not certified.

Email alerts require the Node.js server to be running and reachable.

The prototype should not replace certified protective or emergency equipment.

🔮 Future Improvements

Gyroscope integration

Better accelerometer filtering and calibration

Machine-learning accident classification

Crash confidence score

Persistent accident database

SMS and phone-call alerts

Battery monitoring

Cloud storage

Mobile app

Camera integration

👨‍💻 Team

Abel Bora
Champouthai Malangmei
Riaz Mehta

Assam Don Bosco University

📜 License

This project is intended for academic and educational use.
