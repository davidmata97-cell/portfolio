async function translatePage() {
    const toggle = document.getElementById("toggle");
    const targetLanguage = toggle.checked ? "en" : "es"; // Determina el idioma basado en el estado del switch
    const textToTranslate = document.body.innerText;

    const url = "https://libretranslate.com/translate";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: textToTranslate,
            source: targetLanguage === "es" ? "en" : "es",
            target: targetLanguage,
            format: "text"
        }),
    });

    const data = await response.json();
    
    // Reemplaza el contenido de la página con la traducción
    document.body.innerHTML = data.translatedText;
}

// Evento para activar la traducción cuando el usuario cambia el estado del switch
document.getElementById("toggle").addEventListener("change", translatePage);
