


/* ================= LOGIN SYSTEM ================= */
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

// Set your login credentials here
const correctUser = "admin";
const correctPass = "1234";

document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    if (user === correctUser && pass === correctPass) {
        localStorage.setItem("loggedIn", "yes");

        loginPage.style.display = "none";
        languageModal.style.display = "flex"; // show language selection
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// Auto login if already logged in
if (localStorage.getItem("loggedIn") === "yes") {
    loginPage.style.display = "none";
    dashboard.style.display = "block";
}



const mainTitle = document.querySelector('#dashboard h1');

function setLanguage(lang){
    if(lang === 'kh'){
        mainTitle.textContent = mainTitle.dataset.kh;
    } else {
        mainTitle.textContent = mainTitle.dataset.en;
    }
}


function setLanguage(lang){
    localStorage.setItem('lang', lang);

    document.querySelectorAll('[data-en]').forEach(el => {
        if(lang === 'en'){
            el.textContent = el.dataset.en;
            el.classList.remove('khmer');   // English → remove Khmer class
        } else {
            el.textContent = el.dataset.kh;
            el.classList.add('khmer');      // Khmer → add Khmer class
        }
    });

    // Example for main title
    const mainTitle = document.querySelector('#dashboard h1');
    if(lang === 'kh'){
        mainTitle.classList.add('khmer');
    } else {
        mainTitle.classList.remove('khmer');
    }
}
const broker = "wss://d16fd8e5e1dd4b009a2f258d647172ba.s1.eu.hivemq.cloud:8884/mqtt";

const options = {
    username: "ATS_ESP",
    password: "ATS@esp32",
    reconnectPeriod: 2000,
    clean: true,
    keepalive: 60
}

const client = mqtt.connect(broker, options);

client.subscribe("ats/mainVoltage");
client.subscribe("ats/genVoltage");
client.subscribe("ats/current");
client.subscribe("ats/mode");

client.on("message", (topic, msg) => {
    const data = msg.toString();

    if (topic === "ats/mainVoltage")
        document.getElementById("mainVoltageValue").textContent = data + " V";

    if (topic === "ats/genVoltage")
        document.getElementById("genVoltageValue").textContent = data + " V";

    if (topic === "ats/current")
        document.getElementById("currentValue").textContent = data + " A";

    if (topic === "ats/mode") {
        // Mode description:
        // 0 = IDLE
        // 1 = MAIN_MODE
        // 2 = STARTING_GEN
        // 3 = GEN_MODE
        // 4 = Gen_novoltage

        // Main Lamp
        if (data === "1")
            setLamp(mainLamp, "on");
        else
            setLamp(mainLamp, "off");

        // Gen Lamp
        if (data === "3")
            setLamp(genLamp, "on");
        else
            setLamp(genLamp, "off");
    }
});
