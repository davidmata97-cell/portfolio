document.addEventListener('DOMContentLoaded', () => {
    const languageToggle = document.getElementById('toggle');
    // Intenta obtener el idioma guardado, si no existe, usa 'es' por defecto
    let currentLanguage = localStorage.getItem('portfolioLanguage') || 'es';

    // Función para cargar los archivos de traducción usando .then/.catch
    function fetchTranslations(lang) {
        return fetch(`languages/${lang}.json`) // Asegúrate que la ruta a tus archivos JSON sea correcta
            .then(response => {
                if (!response.ok) {
                    // Si el archivo no se encuentra o hay otro error HTTP, lanza un error
                    throw new Error(`Could not load ${lang}.json: ${response.status} ${response.statusText}`);
                }
                return response.json(); // Parsea el JSON
            })
            .catch(error => {
                console.error('Error fetching translation file:', error);
                return null; // Devuelve null si hay un error para manejarlo después
            });
    }

    // Función para aplicar las traducciones a la página
    function applyTranslations(translations) {
        if (!translations) {
            console.warn('No translations to apply. Check if JSON loaded correctly and is not null.');
            return; // No hagas nada si no hay traducciones
        }

        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key] !== undefined) { // Verifica que la clave exista en el objeto de traducciones
                if (element.tagName === 'INPUT' && (element.type === 'submit' || element.type === 'button')) {
                    element.value = translations[key];
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translations[key];
                } else {
                    element.innerHTML = translations[key];
                }
            } else {
                // Opcional: avisar si una clave no se encuentra, puede ser útil durante el desarrollo
                // console.warn(`Translation key "${key}" not found in JSON for language "${currentLanguage}".`);
            }
        });

        // Caso especial para el título de la página
        if (translations.pageTitle) {
            document.title = translations.pageTitle;
        }

        // Actualiza el atributo lang de la etiqueta <html>
        document.documentElement.lang = currentLanguage;
    }

    // Función para cambiar el idioma
    function changeLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('portfolioLanguage', lang); // Guarda la preferencia del usuario

        fetchTranslations(lang).then(translations => {
            // Solo aplica traducciones si fetchTranslations devolvió algo (no null)
            if (translations) {
                applyTranslations(translations);
            }
        });
    }

    // Inicializa las traducciones al cargar la página con el idioma actual
    changeLanguage(currentLanguage);

    // Configura el estado inicial del toggle y el listener de eventos
    if (languageToggle) {
        languageToggle.checked = currentLanguage === 'en'; // El toggle está 'checked' si el idioma es inglés

        languageToggle.addEventListener('change', () => {
            const newLanguage = languageToggle.checked ? 'en' : 'es';
            changeLanguage(newLanguage);
        });
    }
});