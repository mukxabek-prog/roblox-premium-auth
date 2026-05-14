(function() {
    // Sizning Public Key'ingiz
    emailjs.init("Qj4dDgU6UZu9c6Vvx");
})();

const activateBtn = document.getElementById('activate-btn');
const introScreen = document.getElementById('intro-screen');
const mainContainer = document.getElementById('main-container');
const formsWrapper = document.getElementById('auth-forms');
const loggedInView = document.getElementById('logged-in-view');
const clickSound = document.getElementById(' bugun ko'p sinab ko'rgan bo'lsangiz, limit tugagan bo'lishi mumkin.
2.  **Service yoki Template ID noto'g'ri:** EmailJS dashboardingizda ushbu ID'lar aynan biz yozganimizdek (`service_cqi9bt6` va `template_cit74ko`) ekanligini qayta tekshiring.
3.  **Template sozlamalari:** EmailJS saytidagi shabloningiz ichida o'zgaruvchi nomlari JS dagi bilan bir xil bo'lishi kerak: `{{to_email}}`, `{{user_name}}`, `{{auth_code}}`.

Xatoni aniq bilish va tizimni to'g'rilash uchun mana yangilangan **script.js**. Bu safar xato yuz berganda Console-ga (F12) aniq sababini chiqaradi:

### script.js (To'liq va xato aniqlovchi versiya)
```javascript
(function() {
    // Siz bergan Public Key
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

// 1. Tizimni tekshirish (Session)
window.onload = () => {
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
        introScreen.style.display = "none";
        mainContainer.style.display = "block";
        showLoggedIn(sessionUser);
    }
};

function showLoggedIn(username) {
    formsWrapper.style.display = "none";
    loggedInView.style.display = "block";
    document.getElementById('welcome-user').innerText = `Xush kelibsiz, ${username}!`;
}

document.getElementById('logout-btn').onclick = () => {click-sfx');

let tempUserData = null;
let currentSentCode = "";

// 1. SESSION TEKSHIRISH
window.onload = () => {
    const sessionUser = localStorage.getItem('sessionUser');
    if (sessionUser) {
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

// Chiqish
document.getElementById('logout-btn').onclick = () => {
    localStorage.removeItem('sessionUser');
    location.reload();
};

// Intro yopish
activateBtn.onclick = () => {
    if(clickSound) clickSound.play();

    localStorage.removeItem('sessionUser');
    location.reload();
};

activateBtn.onclick = () => {
    clickSound.play();
    introScreen.style.opacity = "0";
    setTimeout(() => { 
        introScreen.style.display = "none"; 
        mainContainer.style.display = "block"; 
    }, 800);
};

document.getElementById('to-reg-link').onclick = (e) => {
    e.preventDefault(); formsWrapper.style.transform = "translateX(-50%)";
};
document.getElementById('to-login-link').onclick = (e) => {
    e.preventDefault(); formsWrapper.style.transform = "translateX(0)";
};

// --- REGISTRATSIYA ---
const regForm = document.getElementById('reg-form');
regForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById('reg-    introScreen.style.opacity = "0";
    setTimeout(() => { 
        introScreen.style.display = "none"; 
        mainContainer.style.display = "block"; 
    }, 800);
};

// Formani almashtirish
document.getElementById('to-reg-link').onclick = (e) => {
    e.preventDefault(); formsWrapper.style.transform = "translateX(-50%)";
};
document.getElementById('to-login-link').onclick = (e) => {
    e.preventDefault(); formsWrapper.style.transform = "translateX(0)";
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

    // Username bandligusername').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const errorMsg = document.getElementById('reg-error-msg');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Foydalanuvchi nomini tekshirish
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        errorMsg.innerText = "Bu foydalanuvchi nomi band!";
        return;
    }

    if (password.length !== 8) {
        errorMsg.innerText = "Parol roppa-rosa 8 ta bo'lishi kerak";
        return;
    }

    // Kod yaratish
    currentSentCode = Math.floor(10000 + Math.random() * 90000).toString();

    const templateParams = {
        to_email: email,
        user_name: username,
        auth_code: currentSentCode
    };

    // YUKLASH HOLATI
    errorMsg.style.color = "#00d2ff";
ini tekshirish
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        errorMsg.innerText = "Bu foydalanuvchi nomi band!";
        errorMsg.style.color = "#ff4757";
        return;
    }

    if (password.length !== 8) {
        errorMsg.innerText = "Parol roppa-rosa 8 ta bo'lishi kerak";
        errorMsg.style.color = "#ff4757";
        return;
    }

    // 5 xonali tasodifiy kod
    currentSentCode = Math.floor(10000 + Math.random() * 90000).toString();

    const templateParams = {
        to_email: email,
        user_name: username,
        auth_code: currentSentCode
    };

    errorMsg.innerText = "Kod yuborilmoqda...";
    errorMsg.style.color = "#00d2ff";

    // EmailJS yuborish
    emailjs.send('service_cqi9bt6', 'template_cit74ko', templateParams)
        .then(()    errorMsg.innerText = "Email yuborilmoqda...";

    // EMAILJS YUBORISH
    emailjs.send('service_cqi9bt6', 'template_cit74ko', templateParams)
        .then(() => {
            tempUserData = { username, email, password };
            document.getElementById('verify-modal').style.display = "flex";
            errorMsg.innerText = "";
        })
        .catch((err) => {
            console.error("EmailJS xatosi:", err);
            errorMsg.style.color = "#ff4757";
            errorMsg.innerText = "Xato: " + (err.text || "Limit tugagan yoki ID noto'g'ri!");
            
            // TEST UCHUN: Agar email ishlamasa, kodni console-ga chiqarib qo'yamiz
            console.log("Test rejimi uchun kod:", currentSentCode);
        });
};

// --- KODNI TASDIQLASH ---
document.getElementById('verify-confirm-btn').onclick = () => {
    const codeInput = document.getElementById('verify-code-input').value;
    if (codeInput === currentSentCode) {
         => {
            openVerifyModal(username, email, password);
        })
        .catch((err) => {
            console.error("EmailJS Error:", err);
            // AGAR EMAIL KETMASA - FALLBACK (Zaxira yo'li)
            errorMsg.innerText = "Email xizmati band. Kod ekranda ko'rsatildi!";
            errorMsg.style.color = "#ffa502";
            alert("EmailJS xatosi tufayli kodni shu yerda ko'rsatamiz.\nTasdiqlash kodi: " + currentSentCode);
            openVerifyModal(username, email, password);let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(tempUserData);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Ro'yxatdan o'tdingiz!");
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

    let users = JSON.parse(localStorage.getItem('users'))
        });
};

function openVerifyModal(u, e, p) {
    tempUserData = { username: u, email: e, password: p };
    document.getElementById('verify-modal').style.display = "flex";
    document.getElementById('reg-error-msg').innerText = "";
}

// --- KODNI TASDIQLASH ---
document.getElementById('verify-confirm-btn').onclick = () => {
    const codeInput = document.getElementById('verify-code-input').value;
    const verifyError = document.getElementById('verify-error');

    if (codeInput === currentSentCode) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(tempUserData);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
        document.getElementById('verify-modal').style.display = "none";
        formsWrapper.style.transform = "translateX(0)"; 
        regForm.reset();
    } else {
        verifyError.innerText = "Kod xato!";
    }
};

// --- KIR || [];
    const foundUser = users.find(u => u.username.toLowerCase() === userInput.toLowerCase());

    if (!foundUser) {
        errorMsg.innerText = "Foydalanuvchi nomi topilmadi!";
    } else if (foundUser.password !== passInput) {
        errorMsg.innerText = "Parol noto'g'ri!";
    } else {
        localStorage.setItem('sessionUser', foundUser.username);
        showLoggedIn(foundUser.username);
    }
};
