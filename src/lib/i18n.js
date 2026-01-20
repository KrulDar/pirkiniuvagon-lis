import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "app": {
                "title": "Shopping List",
                "loading": "Loading...",
                "connect": "Connect..."
            },
            "nav": {
                "title": "Shopping List"
            },
            "settings": {
                "language": "LANGUAGE",
                "activeList": "ACTIVE LIST",
                "selectList": "Select List",
                "manageLists": "⚙ Manage Lists",
                "appearance": "APPEARANCE",
                "light": "Light",
                "dark": "Dark",
                "auto": "Auto",
                "role": "Role: {{role}}",
                "adminPanel": "Admin Panel",
                "signOut": "Sign Out"
            },
            "auth": {
                "resetPassword": "Reset Password",
                "createAccount": "Create Account",
                "welcomeBack": "Welcome Back",
                "email": "Email",
                "password": "Password",
                "language": "Language",
                "languageHelper": "This language will be used for your starter food list",
                "sendReset": "Send Reset Link",
                "signUp": "Sign Up",
                "logIn": "Log In",
                "loading": "Loading...",
                "alreadyHaveAccount": "Already have an account?",
                "dontHaveAccount": "Don't have an account?",
                "forgotPassword": "Forgot Password?",
                "backToLogin": "Back to Log In",
                "checkEmailReset": "Check your email for the password reset link!",
                "checkEmailConfirm": "Check your email for the confirmation link!"
            },
            "welcome": {
                "title": "Welcome to Shopping List App!",
                "message": "You'll love this simple and effective tool.\n\nWe've created a first shopping list for you to get started. You can fill it with your own items and delete unused ones.\n\nHow to use:\n1. Mark the items you want to buy.\n2. Use the filter to show only marked items.\n3. Unmark items as you place them in your basket.\n\nSimple and effective!"
            },
            "listManager": {
                "title": "Manage Lists",
                "close": "Close",
                "newListName": "New List Name",
                "placeholder": "e.g., Weekly Shopping",
                "create": "Create",
                "cancel": "Cancel",
                "createButton": "+ Create New List",
                "rename": "Rename",
                "delete": "Delete",
                "shared": "Shared with you",
                "noLists": "No lists found.",
                "confirmDelete": "Delete this list? All items will be lost."
            },
            "categories": {
                "manage": "Manage Categories",
                "close": "Close",
                "newPlaceholder": "New Category Name",
                "add": "Add",
                "edit": "Edit",
                "delete": "Delete",
                "save": "Save",
                "cancel": "Cancel",
                "noCategories": "No custom categories.",
                "uncategorized": "Uncategorized",
                "confirmDelete": "Delete category? Items will be uncategorized.",
                "itemsCount": "({{count}} item)",
                "itemsCount_plural": "({{count}} items)"
            },
            "list": {
                "searchPlaceholder": "Search items...",
                "selectedItems": "Selected items",
                "addItem": "Add Item",
                "manageCategories": "Manage Categories",
                "hideCategories": "Hide Categories",
                "itemName": "Item Name",
                "itemNamePlaceholder": "e.g. Milk",
                "qty": "Qty",
                "category": "Category",
                "comment": "Comment",
                "commentPlaceholder": "Optional note",
                "save": "Save",
                "delete": "Delete",
                "cancel": "Cancel",
                "emptyList": "This list is empty.",
                "addFirstItem": "Add your first item",
                "noMatches": "No items match your filters.",
                "confirmDeleteItem": "Delete this item?",
                "noListSelected": "No list selected!",
                "createList": "Create New List",
                "noListsFound": "No lists found."
            },
            "titles": {
                "showAll": "Show All items",
                "showChecked": "Show only Checked items",
                "viewComment": "View comment",
                "editItem": "Edit item",
                "decreaseQty": "Decrease quantity",
                "increaseQty": "Increase quantity",
                "moveUp": "Move up",
                "moveDown": "Move down",
                "lightMode": "Light Mode",
                "darkMode": "Dark Mode",
                "systemDefault": "System Default",
                "addOrManage": "Add or Manage",
                "cancelAction": "Cancel"
            }
        }
    },
    no: {
        translation: {
            "app": {
                "title": "Handleliste",
                "loading": "Laster...",
                "connect": "Kobler til..."
            },
            "nav": {
                "title": "Handleliste"
            },
            "settings": {
                "language": "SPRÅK",
                "activeList": "AKTIV LISTE",
                "selectList": "Velg liste",
                "manageLists": "⚙ Administrer lister",
                "appearance": "UTSEENDE",
                "light": "Lys",
                "dark": "Mørk",
                "auto": "Auto",
                "role": "Rolle: {{role}}",
                "adminPanel": "Adminpanel",
                "signOut": "Logg ut"
            },
            "auth": {
                "resetPassword": "Tilbakestill passord",
                "createAccount": "Opprett konto",
                "welcomeBack": "Velkommen tilbake",
                "email": "E-post",
                "password": "Passord",
                "language": "Språk",
                "languageHelper": "Dette språket vil bli brukt til din startliste med mat",
                "sendReset": "Send tilbakestillingslenke",
                "signUp": "Registrer deg",
                "logIn": "Logg inn",
                "loading": "Laster...",
                "alreadyHaveAccount": "Har du allerede en konto?",
                "dontHaveAccount": "Har du ikke konto?",
                "forgotPassword": "Glemt passord?",
                "backToLogin": "Tilbake til innlogging",
                "checkEmailReset": "Sjekk e-posten for lenke til passordbytte!",
                "checkEmailConfirm": "Sjekk e-posten for bekreftelseslenke!"
            },
            "welcome": {
                "title": "Velkommen til Handleliste-appen!",
                "message": "Du kommer til å like denne enkle og effektive appen.\n\nVi har laget en første handleliste for å hjelpe deg i gang. Du kan fylle den med dine egne varer og slette de du ikke bruker.\n\nSlik bruker du den:\n1. Merk varene du vil kjøpe.\n2. Bruk filteret for å vise kun merkede varer.\n3. Avmerk varer etter hvert som du legger dem i handlekurven.\n\nEnkelt og effektivt!"
            },
            "listManager": {
                "title": "Administrer lister",
                "close": "Lukk",
                "newListName": "Navn på ny liste",
                "placeholder": "f.eks. Ukeshandel",
                "create": "Opprett",
                "cancel": "Avbryt",
                "createButton": "+ Opprett ny liste",
                "rename": "Gi nytt navn",
                "delete": "Slett",
                "shared": "Delt med deg",
                "noLists": "Ingen lister funnet.",
                "confirmDelete": "Slette denne listen? Alle varer vil gå tapt."
            },
            "categories": {
                "manage": "Administrer kategorier",
                "close": "Lukk",
                "newPlaceholder": "Nytt kategorinavn",
                "add": "Legg til",
                "edit": "Rediger",
                "delete": "Slett",
                "save": "Lagre",
                "cancel": "Avbryt",
                "noCategories": "Ingen egendefinerte kategorier.",
                "uncategorized": "Ukategorisert",
                "confirmDelete": "Slette kategori? Varer vil bli ukategorisert.",
                "itemsCount": "({{count}} vare)",
                "itemsCount_plural": "({{count}} varer)"
            },
            "list": {
                "searchPlaceholder": "Søk etter varer...",
                "selectedItems": "Valgte varer",
                "addItem": "Legg til vare",
                "manageCategories": "Administrer kategorier",
                "hideCategories": "Skjul kategorier",
                "itemName": "Varenavn",
                "itemNamePlaceholder": "f.eks. Melk",
                "qty": "Ant",
                "category": "Kategori",
                "comment": "Kommentar",
                "commentPlaceholder": "Valgfritt notat",
                "save": "Lagre",
                "delete": "Slett",
                "cancel": "Avbryt",
                "emptyList": "Denne listen er tom.",
                "addFirstItem": "Legg til din første vare",
                "noMatches": "Ingen varer passer til filtrene.",
                "confirmDeleteItem": "Slette denne varen?",
                "noListSelected": "Ingen liste valgt!",
                "createList": "Opprett ny liste",
                "noListsFound": "Ingen lister funnet."
            },
            "titles": {
                "showAll": "Vis alle varer",
                "showChecked": "Vis kun valgte varer",
                "viewComment": "Vis kommentar",
                "editItem": "Rediger vare",
                "decreaseQty": "Reduser antall",
                "increaseQty": "Øk antall",
                "moveUp": "Flytt opp",
                "moveDown": "Flytt ned",
                "lightMode": "Lys modus",
                "darkMode": "Mørk modus",
                "systemDefault": "Systemstandard",
                "addOrManage": "Legg til eller administrer",
                "cancelAction": "Avbryt"
            }
        }
    },
    lt: {
        translation: {
            "app": {
                "title": "Pirkinių sąrašas",
                "loading": "Kraunama...",
                "connect": "Jungiamasi..."
            },
            "nav": {
                "title": "Pirkinių sąrašas"
            },
            "settings": {
                "language": "KALBA",
                "activeList": "AKTYVUS SĄRAŠAS",
                "selectList": "Pasirinkti sąrašą",
                "manageLists": "⚙ Valdyti sąrašus",
                "appearance": "IŠVAIZDA",
                "light": "Šviesus",
                "dark": "Tamsus",
                "auto": "Auto",
                "role": "Rolė: {{role}}",
                "adminPanel": "Admin skydelis",
                "signOut": "Atsijungti"
            },
            "auth": {
                "resetPassword": "Atstatyti slaptažodį",
                "createAccount": "Sukurti paskyrą",
                "welcomeBack": "Sveiki sugrįžę",
                "email": "El. paštas",
                "password": "Slaptažodis",
                "language": "Kalba",
                "languageHelper": "Ši kalba bus naudojama jūsų pradiniame maisto sąraše",
                "sendReset": "Siųsti atstatymo nuorodą",
                "signUp": "Registruotis",
                "logIn": "Prisijungti",
                "loading": "Kraunama...",
                "alreadyHaveAccount": "Jau turite paskyrą?",
                "dontHaveAccount": "Neturite paskyros?",
                "forgotPassword": "Pamiršote slaptažodį?",
                "backToLogin": "Grįžti į prisijungimą",
                "checkEmailReset": "Patikrinkite el. paštą dėl slaptažodžio atstatymo nuorodos!",
                "checkEmailConfirm": "Patikrinkite el. paštą dėl patvirtinimo nuorodos!"
            },
            "welcome": {
                "title": "Sveiki prisijungę prie Shopping List App!",
                "message": "Jums tikrai patiks ši paprasta ir efektyvi programėlė.\n\nMes sukūrėme jums pirmą pirkinių sąrašą pradžiai. Jį galite pildyti savo prekėmis ir ištrinti nenaudojamas.\n\nKaip naudotis?\n1. Pažymėkite produktus, kuriuos norėsite pirkti.\n2. Paspauskite filtro mygtuką, kad rodytų tik pažymėtas prekes.\n3. Atžymėkite produktus, kuriuos jau įsidėjote į krepšelį.\n\nPaprasta ir efektyvu!"
            },
            "listManager": {
                "title": "Valdyti sąrašus",
                "close": "Uždaryti",
                "newListName": "Naujo sąrašo pavadinimas",
                "placeholder": "pvz., Savaitės pirkiniai",
                "create": "Sukurti",
                "cancel": "Atšaukti",
                "createButton": "+ Sukurti naują sąrašą",
                "rename": "Pervadinti",
                "delete": "Ištrinti",
                "shared": "Pasidalinta su jumis",
                "noLists": "Sąrašų nerasta.",
                "confirmDelete": "Ištrinti šį sąrašą? Visos prekės bus prarastos."
            },
            "categories": {
                "manage": "Valdyti kategorijas",
                "close": "Uždaryti",
                "newPlaceholder": "Naujas kategorijos pavadinimas",
                "add": "Pridėti",
                "edit": "Redaguoti",
                "delete": "Ištrinti",
                "save": "Išsaugoti",
                "cancel": "Atšaukti",
                "noCategories": "Nėra pasirinktinių kategorijų.",
                "uncategorized": "Nekategorizuota",
                "confirmDelete": "Ištrinti kategoriją? Prekės liks be kategorijos.",
                "itemsCount": "({{count}} prekė)",
                "itemsCount_plural": "({{count}} prekės)"
            },
            "list": {
                "searchPlaceholder": "Ieškoti prekių...",
                "selectedItems": "Pasirinktos prekės",
                "addItem": "Pridėti prekę",
                "manageCategories": "Valdyti kategorijas",
                "hideCategories": "Slėpti kategorijas",
                "itemName": "Prekės pavadinimas",
                "itemNamePlaceholder": "pvz. Pienas",
                "qty": "Kiekis",
                "category": "Kategorija",
                "comment": "Komentaras",
                "commentPlaceholder": "Papildoma pastaba",
                "save": "Išsaugoti",
                "delete": "Ištrinti",
                "cancel": "Atšaukti",
                "emptyList": "Šis sąrašas tuščias.",
                "addFirstItem": "Pridėkite pirmąją prekę",
                "noMatches": "Nerasta prekių pagal filtrus.",
                "confirmDeleteItem": "Ištrinti šią prekę?",
                "noListSelected": "Nepasirinktas sąrašas!",
                "createList": "Sukurti naują sąrašą",
                "noListsFound": "Nėra sąrašų."
            },
            "titles": {
                "showAll": "Rodyti visas prekes",
                "showChecked": "Rodyti tik pažymėtas prekes",
                "viewComment": "Žiūrėti komentarą",
                "editItem": "Redaguoti prekę",
                "decreaseQty": "Sumažinti kiekį",
                "increaseQty": "Padidinti kiekį",
                "moveUp": "Pakelti aukštyn",
                "moveDown": "Nuleisti žemyn",
                "lightMode": "Šviesus režimas",
                "darkMode": "Tamsus režimas",
                "systemDefault": "Sistemos numatytieji",
                "addOrManage": "Pridėti arba valdyti",
                "cancelAction": "Atšaukti"
            }
        }
    }
};

// Alias nb (Bokmål) to no (Norwegian) to ensure browser detection works
resources.nb = resources.no;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
