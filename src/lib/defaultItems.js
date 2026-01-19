// Default food items template for new users
// Items are provided in all three supported languages
export const DEFAULT_CATEGORIES = {
    en: [
        "🍿 Snacks",
        "🥛 Dairy Products",
        "🍦 Frozen Products",
        "💊 Supplements",
        "🍞 Bread and Rolls",
        "🥬 Vegetables",
        "🍎 Fruits and Berries",
        "🥜 Nuts and Seeds",
        "🧀 Cheeses",
        "🥩 Meat and Fish",
        "🌮 Taco Products",
        "🍚 Grains and Flour",
        "🥫 Canned Goods",
        "🍪 Dry Products",
        "🧂 Spices and Sauces",
        "🥤 Beverages",
        "🧻 Household Items"
    ],
    no: [
        "🍿 Snacks",
        "🥛 Meieriprodukter",
        "🍦 Frosne produkter",
        "💊 Kosttilskudd",
        "🍞 Brød og rundstykker",
        "🥬 Grønnsaker",
        "🍎 Frukt og bær",
        "🥜 Nøtter og frø",
        "🧀 Oster",
        "🥩 Kjøtt og fisk",
        "🌮 Taco-produkter",
        "🍚 Korn og mel",
        "🥫 Hermetikk",
        "🍪 Tørrvarer",
        "🧂 Krydder og sauser",
        "🥤 Drikkevarer",
        "🧻 Husholdningsartikler"
    ],
    lt: [
        "🍿 Užkandžiai",
        "🥛 Pieno produktai",
        "🍦 Šaldyti produktai",
        "💊 Papildai",
        "🍞 Duona ir bandelės",
        "🥬 Daržovės",
        "🍎 Vaisiai ir uogos",
        "🥜 Riešutai ir sėklos",
        "🧀 Sūriai",
        "🥩 Mėsa ir žuvis",
        "🌮 Taco produktai",
        "🍚 Kruopos ir miltai",
        "🥫 Konservai",
        "🍪 Sausieji produktai",
        "🧂 Prieskoniai ir padažai",
        "🥤 Gėrimai",
        "🧻 Namų ūkio prekės"
    ]
};

export const DEFAULT_LIST_NAME = {
    en: "Food",
    no: "Mat",
    lt: "Maistas"
};

// Default items with translations
// Format: { name_en, name_no, name_lt, category_index, amount }
export const DEFAULT_ITEMS = [
    // Snacks
    { name_en: "Chips", name_no: "Chips", name_lt: "Čipsų", category: 0, amount: 1 },
    { name_en: "Popcorn 🍿", name_no: "Popcorn 🍿", name_lt: "Popkornų 🍿", category: 0, amount: 1 },
    { name_en: "Dried Mango", name_no: "Tørket mango", name_lt: "Džiovintų mango", category: 0, amount: 1 },

    // Dairy Products
    { name_en: "Greek Yogurt", name_no: "Gresk yoghurt", name_lt: "Graikiško jogurto", category: 1, amount: 1 },
    { name_en: "Cottage Cheese", name_no: "Cottage cheese", name_lt: "Varškės", category: 1, amount: 1 },
    { name_en: "Coffee Milk 🥛", name_no: "Kaffemelk 🥛", name_lt: "Kavos pieno 🥛", category: 1, amount: 1 },
    { name_en: "Almond Milk", name_no: "Mandelmelk", name_lt: "Migdolų pieno", category: 1, amount: 1 },
    { name_en: "Regular Milk 🥛", name_no: "Vanlig melk 🥛", name_lt: "Paprasto pieno 🥛", category: 1, amount: 1 },
    { name_en: "Biola", name_no: "Biola", name_lt: "Biolos", category: 1, amount: 1 },
    { name_en: "Eggs 🥚", name_no: "Egg 🥚", name_lt: "Kiaušinių 🥚", category: 1, amount: 1 },
    { name_en: "Butter 🧈", name_no: "Smør 🧈", name_lt: "Sviesto 🧈", category: 1, amount: 1 },
    { name_en: "Mayonnaise", name_no: "Majones", name_lt: "Majonezo", category: 1, amount: 1 },
    { name_en: "Melted Butter", name_no: "Smeltet smør", name_lt: "Tirpinto sviesto", category: 1, amount: 1 },
    { name_en: "Condensed Milk", name_no: "Kondensert melk", name_lt: "Kondensūoto pieno", category: 1, amount: 1 },
    { name_en: "Yogurts", name_no: "Yoghurt", name_lt: "Jogurtukų", category: 1, amount: 1 },
    { name_en: "Sour Cream Black", name_no: "Rømme svart", name_lt: "Grietinės juodos", category: 1, amount: 1 },
    { name_en: "Cream", name_no: "Fløte", name_lt: "Grietinėlės", category: 1, amount: 1 },

    // Frozen Products
    { name_en: "Frozen Mango", name_no: "Frossen mango", name_lt: "Šaldyto mango", category: 2, amount: 1 },
    { name_en: "Ice Cream Box 🍦", name_no: "Isboks 🍦", name_lt: "Dėžutė ledų 🍦", category: 2, amount: 1 },
    { name_en: "Frozen Cherries", name_no: "Frosne kirsebær", name_lt: "Višnių šaldytų", category: 2, amount: 1 },
    { name_en: "Frozen French Fries", name_no: "Frosne pommes frites", name_lt: "Bulvyčių fri šaldytų", category: 2, amount: 1 },

    // Supplements
    { name_en: "Vitamin C", name_no: "Vitamin C", name_lt: "Vitamino C", category: 3, amount: 1 },
    { name_en: "Ginseng", name_no: "Ginseng", name_lt: "Ženšenio", category: 3, amount: 1 },

    // Bread and Rolls
    { name_en: "Frozen Rolls", name_no: "Frosne rundstykker", name_lt: "Šaldytų bandelių", category: 4, amount: 1 },
    { name_en: "Panini", name_no: "Panini", name_lt: "Panini", category: 4, amount: 1 },
    { name_en: "Croissants 🥐", name_no: "Croissanter 🥐", name_lt: "Kruasanų 🥐", category: 4, amount: 1 },
    { name_en: "Bread 🍞", name_no: "Brød 🍞", name_lt: "Duonos 🍞", category: 4, amount: 1 },
    { name_en: "Burger Buns 🍔", name_no: "Burgerbrød 🍔", name_lt: "Burgerių bandelių 🍔", category: 4, amount: 1 },
    { name_en: "Garlic Bread", name_no: "Hvitløksbrød", name_lt: "Duonelė hvitløk kepimui", category: 4, amount: 1 },

    // Vegetables
    { name_en: "Iceberg Lettuce 🥬", name_no: "Isbergsalat 🥬", name_lt: "Iceberg salotos 🥬", category: 5, amount: 1 },
    { name_en: "Beets", name_no: "Rødbeter", name_lt: "Burokėlių", category: 5, amount: 1 },
    { name_en: "Cucumber 🥒", name_no: "Agurk 🥒", name_lt: "Agurko 🥒", category: 5, amount: 1 },
    { name_en: "Avocado 🥑", name_no: "Avokado 🥑", name_lt: "Avokado 🥑", category: 5, amount: 1 },
    { name_en: "Mint", name_no: "Mynte", name_lt: "Mėtos", category: 5, amount: 1 },
    { name_en: "Carrots 🥕", name_no: "Gulrøtter 🥕", name_lt: "Morkų 🥕", category: 5, amount: 1 },
    { name_en: "Sprouts", name_no: "Spirer", name_lt: "Daigėlių", category: 5, amount: 1 },
    { name_en: "Salad Mix", name_no: "Salatblanding", name_lt: "Salotų maišelis", category: 5, amount: 1 },
    { name_en: "Onions 🧄", name_no: "Løk 🧄", name_lt: "Svogūnėlių 🧄", category: 5, amount: 1 },
    { name_en: "Cauliflower", name_no: "Blomkål", name_lt: "Žiedinio kopūsto", category: 5, amount: 1 },
    { name_en: "Basil", name_no: "Basilikum", name_lt: "Baziliko", category: 5, amount: 1 },
    { name_en: "Regular Potatoes", name_no: "Vanlige poteter", name_lt: "Bulvių paprastų", category: 5, amount: 1 },
    { name_en: "Sweet Potatoes", name_no: "Søtpoteter", name_lt: "Bulvės saldžios", category: 5, amount: 2 },
    { name_en: "Bell Peppers 🌶️", name_no: "Paprika 🌶️", name_lt: "Paprikos 🌶️", category: 5, amount: 1 },
    { name_en: "Cherry Tomatoes 🍅", name_no: "Cherrytomater 🍅", name_lt: "Pomidoriukų 🍅", category: 5, amount: 1 },
    { name_en: "Pickled Cucumbers", name_no: "Syltede agurker", name_lt: "Raugintų agurkų", category: 5, amount: 1 },

    // Fruits and Berries
    { name_en: "Mango 🥭", name_no: "Mango 🥭", name_lt: "Mango 🥭", category: 6, amount: 1 },
    { name_en: "Nectarines", name_no: "Nektariner", name_lt: "Nektarinų", category: 6, amount: 1 },
    { name_en: "Watermelon", name_no: "Vannmelon", name_lt: "Arbūzo", category: 6, amount: 1 },
    { name_en: "Berries 🍓🫐", name_no: "Bær 🍓🫐", name_lt: "Uogų 🍓🫐", category: 6, amount: 1 },
    { name_en: "Oranges", name_no: "Appelsiner", name_lt: "Apelsinų", category: 6, amount: 1 },
    { name_en: "Apples 🍏", name_no: "Epler 🍏", name_lt: "Obuolių 🍏", category: 6, amount: 1 },
    { name_en: "Mandarins", name_no: "Mandariner", name_lt: "Mandarinų", category: 6, amount: 1 },
    { name_en: "Persimmons", name_no: "Persimmon", name_lt: "Persimonų", category: 6, amount: 1 },
    { name_en: "Lemons", name_no: "Sitroner", name_lt: "Citrinų", category: 6, amount: 1 },
    { name_en: "Strawberries 🍓", name_no: "Jordbær 🍓", name_lt: "Braškių 🍓", category: 6, amount: 1 },
    { name_en: "Pumpkin", name_no: "Gresskar", name_lt: "Moliūgo", category: 6, amount: 1 },
    { name_en: "Bananas 🍌", name_no: "Bananer 🍌", name_lt: "Bananų 🍌", category: 6, amount: 1 },
    { name_en: "Kiwi", name_no: "Kiwi", name_lt: "Kiwi", category: 6, amount: 1 },

    // Nuts and Seeds
    { name_en: "Mixed Nuts", name_no: "Blandede nøtter", name_lt: "Riešutų mix", category: 7, amount: 1 },
    { name_en: "Pine Nuts", name_no: "Pinjekjerner", name_lt: "Kedro riešutėlių", category: 7, amount: 1 },
    { name_en: "Sesame Seeds", name_no: "Sesamfrø", name_lt: "Sezamo sėklų", category: 7, amount: 1 },
    { name_en: "Pumpkin Seeds", name_no: "Gresskarfrø", name_lt: "Moliūgo sėklų", category: 7, amount: 1 },

    // Cheeses
    { name_en: "Grated Cheese", name_no: "Revet ost", name_lt: "Tarkuoto sūrio", category: 8, amount: 1 },
    { name_en: "Cream Cheese", name_no: "Kremost", name_lt: "Tepamo sūrelio", category: 8, amount: 1 },
    { name_en: "Cheese", name_no: "Ost", name_lt: "Sūrio", category: 8, amount: 1 },
    { name_en: "Mozzarella", name_no: "Mozzarella", name_lt: "Mozzarelos", category: 8, amount: 1 },
    { name_en: "Feta", name_no: "Feta", name_lt: "Fetos", category: 8, amount: 1 },

    // Meat and Fish
    { name_en: "Meatballs", name_no: "Kjøttboller", name_lt: "Mėsyčių", category: 9, amount: 1 },
    { name_en: "Ham", name_no: "Skinke", name_lt: "Kumpėlio", category: 9, amount: 1 },
    { name_en: "Beef", name_no: "Biff", name_lt: "Jautienos", category: 9, amount: 1 },
    { name_en: "Chicken Fillet", name_no: "Kyllingfilet", name_lt: "Vištienos filė", category: 9, amount: 1 },
    { name_en: "Skinkeost", name_no: "Skinkeost", name_lt: "Skinkeost", category: 9, amount: 1 },
    { name_en: "Salmon", name_no: "Laks", name_lt: "Lašišos", category: 9, amount: 1 },
    { name_en: "Diced Ham", name_no: "Terninger skinke", name_lt: "Šinkės mažais gabaliukais", category: 9, amount: 1 },
    { name_en: "Ground Meat", name_no: "Kjøttdeig", name_lt: "Faršo", category: 9, amount: 1 },
    { name_en: "Bacon Strips 🥓", name_no: "Baconstriper 🥓", name_lt: "Bacon juostelių 🥓", category: 9, amount: 1 },
    { name_en: "Cooked Shrimp", name_no: "Kokte reker", name_lt: "Krevetės keptos iš Remos", category: 9, amount: 12 },

    // Taco Products
    { name_en: "Taco Wraps 🌮", name_no: "Taco-lefser 🌮", name_lt: "Taco lavašiukų 🌮", category: 10, amount: 1 },
    { name_en: "Small Taco Wraps", name_no: "Små taco-lefser", name_lt: "Taco lavašiukų mažiukų", category: 10, amount: 1 },
    { name_en: "Taco Seasoning", name_no: "Taco-krydder", name_lt: "Taco prieskonių", category: 10, amount: 1 },
    { name_en: "Taco Shells 🌮", name_no: "Taco-skjell 🌮", name_lt: "Taco laivėlių 🌮", category: 10, amount: 1 },

    // Grains and Flour
    { name_en: "Rice", name_no: "Ris", name_lt: "Ryžių", category: 11, amount: 1 },
    { name_en: "Puff Pastry", name_no: "Butterdeig", name_lt: "Sluoksniuotos tešlos", category: 11, amount: 1 },
    { name_en: "Flour", name_no: "Mel", name_lt: "Miltų", category: 11, amount: 1 },
    { name_en: "Semolina", name_no: "Semulegryn", name_lt: "Manai", category: 11, amount: 1 },

    // Canned Goods
    { name_en: "Tomato Puree 🍅", name_no: "Tomatpuré 🍅", name_lt: "Pomidorų tyrės skardinės 🍅", category: 12, amount: 1 },
    { name_en: "Corn 🌽", name_no: "Mais 🌽", name_lt: "Kukurūzų 🌽", category: 12, amount: 1 },
    { name_en: "Canned Peas", name_no: "Hermetiske erter", name_lt: "Konservuotų žirnelių 2vnt", category: 12, amount: 1 },
    { name_en: "Canned Corn", name_no: "Hermetisk mais", name_lt: "Konservuotų kukurūzų", category: 12, amount: 1 },
    { name_en: "Jam", name_no: "Syltetøy", name_lt: "Uogienė", category: 12, amount: 1 },
    { name_en: "Canned Beans", name_no: "Hermetiske bønner", name_lt: "Koncerv. Pupelės", category: 12, amount: 1 },

    // Dry Products
    { name_en: "Crackers", name_no: "Kjeks", name_lt: "Trapučių", category: 13, amount: 1 },
    { name_en: "Granola", name_no: "Granola", name_lt: "Granolų", category: 13, amount: 1 },
    { name_en: "Bread Crumbs", name_no: "Brødsmuler", name_lt: "Duonos skrebučių", category: 13, amount: 1 },
    { name_en: "Powdered Sugar", name_no: "Melis", name_lt: "Cukraus pudros", category: 13, amount: 1 },
    { name_en: "Sugar", name_no: "Sukker", name_lt: "Cukraus", category: 13, amount: 1 },
    { name_en: "Salt", name_no: "Salt", name_lt: "Druskos", category: 13, amount: 1 },
    { name_en: "Baking Powder", name_no: "Bakepulver", name_lt: "Kepimo miltelių", category: 13, amount: 1 },
    { name_en: "Breakfast Cereal", name_no: "Frokostblanding", name_lt: "Sausų pusryčių", category: 13, amount: 1 },
    { name_en: "Chickpeas", name_no: "Kikerter", name_lt: "Avinžirnių", category: 13, amount: 1 },

    // Spices and Sauces
    { name_en: "Pesto", name_no: "Pesto", name_lt: "Pesto", category: 14, amount: 1 },
    { name_en: "Soy Sauce", name_no: "Soyasaus", name_lt: "Sojų", category: 14, amount: 1 },
    { name_en: "Bouillon Cubes", name_no: "Buljonterninger", name_lt: "Sultinio kubelių", category: 14, amount: 1 },
    { name_en: "Mustard", name_no: "Sennep", name_lt: "Garstyčių", category: 14, amount: 1 },
    { name_en: "Karma Spice Jar", name_no: "Karma krydderglass", name_lt: "Karma prieskonių slovikėlis", category: 14, amount: 1 },
    { name_en: "Lemon Concentrate", name_no: "Sitronkonsentrat", name_lt: "Citrinos koncentrato buteliukyje", category: 14, amount: 1 },

    // Beverages
    { name_en: "Sprite", name_no: "Sprite", name_lt: "Sprite", category: 15, amount: 1 },
    { name_en: "Non-Alcoholic Beer", name_no: "Alkoholfritt øl", name_lt: "Nealkoholinio alaus", category: 15, amount: 1 },
    { name_en: "Mineral Water", name_no: "Mineralvann", name_lt: "Mineralinio", category: 15, amount: 1 },
    { name_en: "Schweppes", name_no: "Schweppes", name_lt: "Švepsas", category: 15, amount: 1 },

    // Household Items
    { name_en: "Toilet Paper", name_no: "Toalettpapir", name_lt: "Tualetinio popieriaus", category: 16, amount: 1 },
    { name_en: "Paper Towels", name_no: "Kjøkkenpapir", name_lt: "Rankų popieriaus", category: 16, amount: 1 },
    { name_en: "Baking Paper", name_no: "Bakepapir", name_lt: "Kepimo popieriaus", category: 16, amount: 1 },
    { name_en: "Trash Bags", name_no: "Søppelposer", name_lt: "Siuksliu Maisu", category: 16, amount: 1 },
    { name_en: "Shower Gel", name_no: "Dusjgel", name_lt: "Dušo žele", category: 16, amount: 1 },
    { name_en: "Dishwasher Tablets", name_no: "Oppvasktabletter", name_lt: "Indaploves tabletes", category: 16, amount: 1 }
];
