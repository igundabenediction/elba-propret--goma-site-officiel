/* =========================================================
   EL'BA PROPRETÉ
   JAVASCRIPT GLOBAL DU SITE
   ========================================================= */

"use strict";


/* =========================================================
   01. INITIALISATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initHeaderScroll();

    initHeroSlider();

    initWhatsappModal();

    initCurrentYear();

    initServiceButtons();

    initDateMinimum();

});



/* =========================================================
   02. MENU MOBILE
========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /* Fermer le menu lorsqu'un lien est sélectionné */

    const navLinks =
        mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Fermer si on clique en dehors du menu */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            mainNav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mainNav.classList.contains("active")
        ) {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* Fermer avec la touche Échap */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            mainNav.classList.contains("active")
        ) {

            mainNav.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}



/* =========================================================
   03. HEADER AU SCROLL
========================================================= */

function initHeaderScroll() {

    const header =
        document.getElementById("siteHeader");

    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}



/* =========================================================
   04. SLIDER HERO
========================================================= */

function initHeroSlider() {

    const slides =
        document.querySelectorAll(".hero-slide");

    if (slides.length <= 1) {
        return;
    }


    let currentSlide = 0;

    const slideDuration = 5500;


    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });

    }


    function nextSlide() {

        currentSlide =
            (currentSlide + 1) % slides.length;

        showSlide(currentSlide);

    }


    showSlide(currentSlide);


    let sliderInterval =
        setInterval(
            nextSlide,
            slideDuration
        );


    /*
       Si l'utilisateur revient sur l'onglet,
       le slider continue normalement.
    */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState === "hidden"
            ) {

                clearInterval(sliderInterval);

            } else {

                clearInterval(sliderInterval);

                sliderInterval =
                    setInterval(
                        nextSlide,
                        slideDuration
                    );

            }

        }
    );

}



/* =========================================================
   05. MODALE WHATSAPP
========================================================= */

function initWhatsappModal() {

    const modal =
        document.getElementById("whatsappModal");

    const overlay =
        document.getElementById(
            "whatsappModalOverlay"
        );

    const closeButton =
        document.getElementById(
            "closeWhatsappModal"
        );

    const form =
        document.getElementById(
            "whatsappServiceForm"
        );


    if (!modal) {
        return;
    }


    /*
       Tous les boutons qui possèdent
       .js-whatsapp-open ouvrent la fenêtre.
    */

    const openButtons =
        document.querySelectorAll(
            ".js-whatsapp-open"
        );


    openButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const selectedService =
                    button.dataset.service || "";

                openWhatsappModal(
                    selectedService
                );

            }
        );

    });


    /* Fermer avec le bouton X */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeWhatsappModal
        );

    }


    /* Fermer en cliquant sur le fond */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeWhatsappModal
        );

    }


    /* Fermer avec Échap */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {

                closeWhatsappModal();

            }

        }
    );


    /* Envoi du formulaire */

    if (form) {

        form.addEventListener(
            "submit",
            handleWhatsappSubmit
        );

    }

}



/* =========================================================
   06. OUVRIR WHATSAPP MODAL
========================================================= */

function openWhatsappModal(service = "") {

    const modal =
        document.getElementById("whatsappModal");

    if (!modal) {
        return;
    }


    const serviceSelect =
        document.getElementById("waService");


    if (
        serviceSelect &&
        service
    ) {

        /*
           On vérifie que le service existe
           dans la liste avant de le sélectionner.
        */

        const optionExists =
            Array.from(
                serviceSelect.options
            ).some(
                option =>
                    option.value === service
            );


        if (optionExists) {

            serviceSelect.value = service;

        }

    }


    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );


    /*
       Placer automatiquement le curseur
       dans le champ Nom.
    */

    setTimeout(() => {

        const nameInput =
            document.getElementById("waNom");

        if (nameInput) {
            nameInput.focus();
        }

    }, 250);

}



/* =========================================================
   07. FERMER WHATSAPP MODAL
========================================================= */

function closeWhatsappModal() {

    const modal =
        document.getElementById("whatsappModal");

    if (!modal) {
        return;
    }


    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}



/* =========================================================
   08. DATE MINIMUM
========================================================= */

function initDateMinimum() {

    const dateInput =
        document.getElementById("waDate");

    if (!dateInput) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const formattedDate =
        `${year}-${month}-${day}`;


    dateInput.min =
        formattedDate;

}



/* =========================================================
   09. BOUTONS DES SERVICES
========================================================= */

function initServiceButtons() {

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );


    serviceButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const service =
                    button.dataset.service || "";

                openWhatsappModal(service);

            }
        );

    });

}



/* =========================================================
   10. ENVOI FORMULAIRE WHATSAPP
========================================================= */

function handleWhatsappSubmit(event) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const name =
        document
            .getElementById("waNom")
            ?.value
            .trim() || "";


    const telephone =
        document
            .getElementById("waTelephone")
            ?.value
            .trim() || "";


    const service =
        document
            .getElementById("waService")
            ?.value
            .trim() || "";


    const address =
        document
            .getElementById("waAdresse")
            ?.value
            .trim() || "";


    const date =
        document
            .getElementById("waDate")
            ?.value || "";


    const message =
        document
            .getElementById("waMessage")
            ?.value
            .trim() || "";


    /*
       Vérification minimale.
    */

    if (
        !name ||
        !telephone ||
        !service ||
        !address
    ) {

        alert(
            "Veuillez remplir tous les champs obligatoires."
        );

        return;

    }


    /*
       Formatage de la date.
    */

    let formattedDate =
        "Non précisée";


    if (date) {

        const dateObject =
            new Date(
                `${date}T00:00:00`
            );


        if (
            !Number.isNaN(
                dateObject.getTime()
            )
        ) {

            formattedDate =
                dateObject.toLocaleDateString(
                    "fr-FR",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    }
                );

        }

    }


    /*
       Numéro officiel EL'BA PROPRETÉ
    */

    const whatsappNumber =
        "243972840963";


    /*
       Message envoyé à WhatsApp.
    */

    const whatsappMessage =

`Bonjour, bienvenue chez EL'BA PROPRETÉ 👋

À quoi pouvons-nous vous aider s'il vous plaît ?

━━━━━━━━━━━━━━━━━━
📋 DEMANDE DE SERVICE
━━━━━━━━━━━━━━━━━━

👤 Nom : ${name}

📞 Téléphone : ${telephone}

🧹 Service souhaité :
${service}

📍 Adresse / Quartier :
${address}

📅 Date souhaitée :
${formattedDate}

💬 Demande :
${message || "Aucune précision supplémentaire."}

━━━━━━━━━━━━━━━━━━

Merci à EL'BA PROPRETÉ pour votre disponibilité.`;



    /*
       Encodage sécurisé du message
       dans l'URL WhatsApp.
    */

    const encodedMessage =
        encodeURIComponent(
            whatsappMessage
        );


    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


    /*
       Fermer la fenêtre avant
       d'ouvrir WhatsApp.
    */

    closeWhatsappModal();


    /*
       Petit délai pour laisser
       l'animation de fermeture
       se terminer.
    */

    setTimeout(() => {

        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }, 150);


    /*
       Réinitialiser le formulaire
       après préparation de la demande.
    */

    setTimeout(() => {

        form.reset();

    }, 300);

}



/* =========================================================
   11. ANNÉE AUTOMATIQUE DU FOOTER
========================================================= */

function initCurrentYear() {

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (!currentYear) {
        return;
    }


    currentYear.textContent =
        new Date().getFullYear();

}



/* =========================================================
   12. PROTECTION CONTRE LES ERREURS
========================================================= */

/*
   Ce message permet de vérifier facilement
   dans la console du navigateur que le fichier
   script.js est bien chargé.
*/

console.log(
    "EL'BA PROPRETÉ — script.js chargé avec succès."
);