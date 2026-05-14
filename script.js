(function() {
    emailjs.init("Qj4dDgU6UZu9c6Vvx");
})();

const activateBtn = document.getElementById('activate-btn');
const introScreen = document.getElementById('intro-screen');
const mainContainer = document.getElementById('main-container');
const formsWrapper = document.getElementById('auth-forms');
const loggedInView = document.getElementById('logged-in-view');

const clickSound = document.getElementById('click-sfx');

let tempUserData = null;
let currentSentCode = "";

// 1. TIZIMNI TEKSHIRISH (Foydalanuvchi oldin kirganmi?)
window.onload = () => {
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
        // Agar session bo'lsa, intro va formani yashirib, salomlashish oynasini ko'rsatamiz
        introScreen.style.display = "none";
        mainContainer.style.display = "block";
        showLoggedIn(sessionUser);
    }
};

function showLoggedIn(username) {
    document.getElementById('auth-forms').style.display = "none";
    loggedInView.style.display = "block";
    document.getElementById('welcome-user').innerText = `Xush kelibsiz, ${username}!`;
}

// Chiqish tugmasi
document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('sessionUser');
    location.reload(); // Sahifani yangilash
};

// Activate Intro
activateBtn.onclick = () => {
    clickSound.play();
    introScreen.style.opacity = "0";
    setTimeout(() => { 
        introScreen.style.display = "none"; 
        mainContainer.style.display = "block"; 
    }, 800);
};

// Switch Forms
document.getElementById('to-reg-link').onclick = (e) => {
    e.preventDefault(); clickSound.play(); formsWrapper.style.transform = "translateX(-50%)";
};
document.getElementById('to-login-link').onclick = (e) => {
    e.preventDefault(); clickSound.play(); formsWrapper.style.transform = "translateX(0)";
};

// --- REGISTRATSIYA ---
const regForm = document.getElementById('reg-form');
regForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const errorMsg = document.getElementById('reg-error-msg');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // FOYDALANUVCHI NOMINI TEKSHIRISH (Takrorlanmaslik kerak)
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        errorMsg.innerText = "Bu foydalanuvchi nomi band!";
        return;
    }

    // EMAILNI TEKSHIRMAYMIZ (Bitta emailga ko'p akkaunt mumkin)

    if (password.length !== 8) {
        errorMsg.innerText = "Parol roppa-rosa 8 ta bo'lishi kerak";
        return;
    }

    currentSentCode = Math.floor(10000 + Math.random() * 90000).toString();

    const templateParams = {
        to_email: email,
        user_name: username,
        auth_code: currentSentCode
    };

    emailjs.send('service_cqi9bt6', 'template_cit74ko', templateParams)
        .then(() => {
            tempUserData = { username, email, password };
            document.getElementById('verify-modal').style.display = "flex";
            errorMsg.innerText = "";
        }, (err) => {
            errorMsg.innerText = "Email yuborishda xato!";
        });
};

// --- KODNI TASDIQLASH ---
document.getElementById('verify-confirm-btn').onclick = () => {
    const codeInput = document.getElementById('verify-code-input').value;
    if (codeInput === currentSentCode) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(tempUserData);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Ro'yxatdan o'tdingiz! Endi kiring.");
        document.getElementById('verify-modal').style.display = "none";
        formsWrapper.style.transform = "translateX(0)"; 
        regForm.reset();
    } else {
        document.getElementById('verify-error').innerText = "Kod xato!";
    }
};

// --- KIRISH ---
const loginForm = document.getElementById('login-form');
loginForm.onsubmit = (e) => {
    e.preventDefault();
    const userInput = document.getElementById('login-username').value.trim();
    const passInput = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error-msg');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.username.toLowerCase() === userInput.toLowerCase());

    if (!foundUser) {
        errorMsg.innerText = "Foydalanuvchi nomi topilmadi!";
    } else if (foundUser.password !== passInput) {
        errorMsg.innerText = "Parol noto'g'ri!";
    } else {
        // MUVAFFAQIYATLI KIRISH
        errorMsg.style.color = "#00ff00";
        errorMsg.innerText = "Kirilmoqda...";
        
        // SESSION SAQLASH (Eslab qolish)
        localStorage.setItem('sessionUser', foundUser.username);
        
        setTimeout(() => {
            showLoggedIn(foundUser.username);
        }, 1000);
    }
};
