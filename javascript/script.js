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

