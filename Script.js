


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
