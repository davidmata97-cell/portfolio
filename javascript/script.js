async function loadLanguage(lang) {
    const response = await fetch(`lang/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        element.innerText = translations[key] || element.innerText;
    });
}

document.getElementById("toggle").addEventListener("change", function () {
    const selectedLang = this.checked ? "en" : "es";
    loadLanguage(selectedLang);
});

document.getElementById("toggle").addEventListener("change", function () {
    const flagIcon = document.querySelector(".flag-icon");

    if (this.checked) {
        flagIcon.classList.remove("en");
        flagIcon.classList.add("es"); // Mueve la imagen y cambia la bandera a España
    } else {
        flagIcon.classList.remove("es");
        flagIcon.classList.add("en"); // Vuelve a Inglaterra y se mueve de regreso
    }
});

