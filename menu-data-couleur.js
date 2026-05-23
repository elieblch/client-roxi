/* =====================================================================
   ROXI · Données de carte (source unique, partagée par les deux versions)
   Transcrites depuis la carte officielle ROXI. La carte fait foi.
   Structure : window.MENU.sections[] dans l'ordre des 6 cases du site.
   - card  : libellés de la vignette (FR/EN) : title, italic, desc, price
   - modal : title + italic (FR/EN)
   - groups[] : { t:{fr,en}, cols?:[c1,c2,c3], nt?:noteHaut{fr,en},
                  nb?:noteBas{fr,en}, items:[ {n, d?:{fr,en}, p} ] }
       • cols présent  -> tableau de prix (jusqu'à 3 colonnes), it.p = tableau
       • cols absent    -> ligne simple, it.p = chaîne unique (ou absent)
   Prix stockés au format FR ("3,30 €") ; le rendu EN reformate en "€3.30".
   Noms propres (cocktails, marques, cépages) identiques FR/EN.
   ===================================================================== */
window.MENU = {
  sections: [

    /* ============ 1. BIÈRES ============ */
    {
      key: "bieres",
      photo: "/photo-biere.webp",
      card: {
        fr: { title:"Bières", italic:"Belges, au fût & en bouteille",
              desc:"Cristal, Blanche de Bruges, Grimbergen et Juicy «crime passion» au fût ; Chimay, Duvel, Chouffe, Orval et plus en bouteille.",
              price:"3,30 € à 7 €" },
        en: { title:"Beers", italic:"Belgian, on tap & bottled",
              desc:"Cristal, Blanche de Bruges, Grimbergen and Juicy «crime passion» on tap; Chimay, Duvel, Chouffe, Orval and more in bottle.",
              price:"€3.30 to €7" }
      },
      modal: {
        fr: { title:"Bières belges", italic:"Au fût et en bouteille, la grande tradition brassicole, du blonde au triple." },
        en: { title:"Belgian beers", italic:"On tap and bottled, the great brewing tradition, from blonde to tripel." }
      },
      groups: [
        { t:{fr:"Au fût",en:"Draft"}, cols:["33cl","50cl",""], items:[
          {n:"Cristal 5,2°", p:["3,30 €","5,40 €",""]},
          {n:"Blanche de Bruges 4,8°", p:["3,90 €","6,40 €",""]},
          {n:"Grimbergen blonde 6,7°", p:["4,00 €","7,00 €",""]},
          {n:"Juicy «crime passion» 7,2°", p:["4,50 €","7,50 €",""]}
        ]},
        { t:{fr:"En bouteille",en:"Bottled"}, items:[
          {n:"Cristal 0° Sans Alcool", p:"4,00 €"},
          {n:"Kriek mort subite lambic 4,3°", p:"5,00 €"},
          {n:"Carlsberg blonde 5,5°", p:"5,00 €"},
          {n:"Chouffe Cherry 8°", p:"5,50 €"},
          {n:"Desperados original 5,5°", p:"5,50 €"},
          {n:"Vedett IPA blonde 6°", p:"5,50 €"},
          {n:"Chimay bleue brune 9°", p:"5,50 €"},
          {n:"Triple d'Anvers", p:"5,50 €"},
          {n:"Duvel blonde 8,5°", p:"5,50 €"},
          {n:"Chouffe blonde 8,5°", p:"5,50 €"},
          {n:"Saint Hubertus Triple Hop 8,5°", p:"6,50 €"},
          {n:"Orval ambrée 6,2°", p:"7,00 €"}
        ]}
      ]
    },

    /* ============ 2. FOOD / CUISINE ============ */
    {
      key: "food",
      photo: "/photo-plat.webp",
      card: {
        fr: { title:"Cuisine", italic:"Du finger food au plat signature",
              desc:"Finger food, planches, pâtes, salades, viandes, poissons, burgers, pizzas et desserts maison.",
              price:"6,50 € à 26 €" },
        en: { title:"Food", italic:"From finger food to signature dishes",
              desc:"Finger food, boards, pasta, salads, meats, fish, burgers, pizzas and homemade desserts.",
              price:"€6.50 to €26" }
      },
      modal: {
        fr: { title:"Cuisine", italic:"Cuisine de passion, ouverte de 11h à 15h et de 17h à 22h, tous les jours. Produits frais, recettes généreuses." },
        en: { title:"Food", italic:"A kitchen with passion, open 11am to 3pm and 5pm to 10pm daily. Fresh produce, generous recipes." }
      },
      groups: [
        { t:{fr:"Finger food",en:"Finger food"},
          nb:{fr:"Suppléments : mayonnaise à la truffe 3,50 € · sauce aigre douce, tomate, tartare 2,50 €",
              en:"Extra: truffle mayonnaise €3.50 · sweet & sour, tomato, tartar €2.50"}, items:[
          {n:"Portion fromage / olive / charcuterie", d:{fr:"",en:"Cheese / olive / charcuterie portion"}, p:"8,00 €"},
          {n:"Portion mixte", d:{fr:"Fromage, olives, charcuterie",en:"Cheese, olives, charcuterie"}, p:"11,00 €"},
          {n:"Bâtonnets de mozzarella panés", d:{fr:"Sauce tomate",en:"Breaded mozzarella sticks, tomato sauce"}, p:"9,50 €"},
          {n:"Calamars frits", d:{fr:"Sauce tartare",en:"Fried squids, tartar sauce"}, p:"8,50 €"},
          {n:"Apéro frites", d:{fr:"",en:"French fries appetizer"}, p:"6,50 €"},
          {n:"Apéro patates douces", d:{fr:"",en:"Sweet potatoes appetizer"}, p:"8,50 €"},
          {n:"Chicken wings barbecue", d:{fr:"9 pcs / 12 pcs",en:"Barbecue chicken wings (9 pcs / 12 pcs)"}, p:"15,00 € / 17,00 €"},
          {n:"Onions rings", d:{fr:"Sauce aigre douce",en:"Onion rings, sweet & sour sauce"}, p:"6,50 €"},
          {n:"Nachos fromage fondu, jalapeños", d:{fr:"3 sauces : salsa, guacamole, fromage",en:"Cheesy nachos, jalapeños, 3 sauces: salsa, guacamole, cheese"}, p:"11,00 €"},
          {n:"Pain à l'ail mozzarella ou parmesan", d:{fr:"",en:"Garlic bread, mozzarella or parmesan"}, p:"7,50 €"}
        ]},
        { t:{fr:"Planches & planchettes",en:"Boards"},
          nt:{fr:"Small 15,50 € · Large 17,50 €",en:"Small €15.50 · Large €17.50"}, items:[
          {n:"Tour du monde", d:{fr:"Assortiment spécial «découverte»",en:"Special «discovery» assortment"}},
          {n:"Bœuf basilic", d:{fr:"Pain toasté au bœuf cru, basilic, copeaux de parmesan, huile d'olive",en:"Toast, raw beef with basil, parmesan shavings, olive oil"}},
          {n:"Vietnamienne", d:{fr:"Samosa, nems, salade de laitue, menthe fraîche, sauce aigre douce",en:"Samosa, nems, lettuce salad, fresh mint, sweet & sour sauce"}},
          {n:"Orientale", d:{fr:"Viande gyros, maïs, carottes, oignons, sauce fraîche yaourt-ail, pain pita",en:"Gyros meat, corn, carrot, onions, fresh garlic & yogurt sauce, pita bread"}},
          {n:"Gréco-romaine", d:{fr:"Calamars et scampis, 2 sauces (tsatsiki, tarama), piments, poivrons farcis",en:"Squid and scampi, 2 sauces (tsatsiki, tarama), peppers, stuffed paprika"}}
        ]},
        { t:{fr:"Entrées",en:"Starters"}, items:[
          {n:"Carpaccio de bœuf", d:{fr:"Salade roquette et crème balsamique",en:"Beef carpaccio, arugula and balsamic cream"}, p:"16,50 €"},
          {n:"Poêlée de scampis", d:{fr:"À l'ail ou à la diabolo",en:"Pan-fried scampi, garlic or diabolo"}, p:"16,50 €"}
        ]},
        { t:{fr:"Pâtes",en:"Pasta"},
          nb:{fr:"Suppléments : fromage râpé 1,00 € · Parmesan 1,50 €",en:"Extra: grated cheese €1.00 · Parmesan €1.50"}, items:[
          {n:"Spaghetti bolognaise", d:{fr:"",en:"Spaghetti bolognese"}, p:"16,50 €"},
          {n:"Spaghetti carbonara", d:{fr:"",en:"Spaghetti carbonara"}, p:"16,50 €"},
          {n:"Spaghetti scampis", d:{fr:"",en:"Spaghetti scampi"}, p:"18,00 €"}
        ]},
        { t:{fr:"Salades",en:"Salads"}, items:[
          {n:"César Roxi", d:{fr:"Émincé de poulet, salade, tomates, carottes, maïs, concombre, croûtons, œuf dur, sauce à l'ail",en:"Chicken breast, salad, tomatoes, carrots, corn, cucumber, croutons, boiled egg, garlic sauce"}, p:"22,00 €"},
          {n:"Salade de chèvre", d:{fr:"Chèvre frais au miel d'acacia, salade, pomme, raisins secs, cerneaux, tomates",en:"Fresh goat cheese with acacia honey, salad, apple, raisins, kernels, tomatoes"}, p:"22,00 €"}
        ]},
        { t:{fr:"Viandes",en:"Meats"},
          nb:{fr:"Sauces : poivre vert, béarnaise, archiduc, mayonnaise à la truffe 3,50 € · Suppléments : frites, pâtes, croquettes, pommes de terre 3,50 €",
              en:"Sauces: green peppercorns, béarnaise, archduke, truffle mayonnaise €3.50 · Extra: fries, pasta, croquettes, potatoes €3.50"}, items:[
          {n:"Steak de bœuf", d:{fr:"Frites, salade",en:"Beef steak, french fries, salad"}, p:"26,00 €"},
          {n:"Tartare de bœuf", d:{fr:"En kit ou préparé, frites, salade",en:"Beef tartar, kit or prepared, french fries, salad"}, p:"23,00 €"},
          {n:"Escalope de poulet pané", d:{fr:"Sauce tomate, spaghetti, parmesan",en:"Breaded chicken cutlets, tomato sauce, spaghetti, parmesan"}, p:"21,50 €"}
        ]},
        { t:{fr:"Poissons",en:"Fish"}, items:[
          {n:"Saumon frais grillé", d:{fr:"Légumes poêlés, pommes de terre grenaille",en:"Grilled fresh salmon, pan-fried vegetables, new potatoes"}, p:"24,00 €"}
        ]},
        { t:{fr:"Burgers",en:"Burgers"},
          nt:{fr:"Servis avec frites et salade",en:"Served with french fries and salad"}, items:[
          {n:"Burger 100% Bœuf (250g)", d:{fr:"Cheddar, oignons, salade iceberg, cornichons, sauce burger, tomates",en:"Cheddar, onions, iceberg salad, gherkin, burger sauce, tomatoes"}, p:"18,00 €"},
          {n:"Beef Bacon Burger (250g)", d:{fr:"Bacon, cheddar, oignons, salade iceberg, cornichons, sauce burger, tomates",en:"Bacon, cheddar, onions, iceberg salad, gherkin, burger sauce, tomatoes"}, p:"18,50 €"},
          {n:"Chicken Burger", d:{fr:"Cheddar, oignons, salade iceberg, cornichons, sauce burger, tomates",en:"Cheddar, onions, iceberg salad, gherkin, burger sauce, tomatoes"}, p:"17,00 €"}
        ]},
        { t:{fr:"Pizza",en:"Pizza"},
          nb:{fr:"Suppléments : jambon, chèvre frais, thon, chorizo 3,00 € · champignons, aubergines, courgettes, poivrons, roquette, parmesan, olives 1,50 €",
              en:"Extra: ham, fresh goat, tuna, chorizo €3.00 · mushrooms, eggplant, courgettes, paprika, arugula, parmesan, olives €1.50"}, items:[
          {n:"Margherita", d:{fr:"Mozzarella, tomates",en:"Mozzarella, tomatoes"}, p:"13,00 €"},
          {n:"La Roxi", d:{fr:"Tomates, jambon de parme, aubergines & courgettes grillées, roquette, parmesan, olives noires",en:"Tomatoes, parma ham, eggplant & grilled zucchini, arugula, parmesan, black olives"}, p:"16,50 €"},
          {n:"La Picante", d:{fr:"Mozzarella, tomates, chorizo, roquette, basilic, ail doux, piment vert, huile piquante, olives noires",en:"Mozzarella, tomatoes, chorizo, arugula, basil, sweet garlic, green peppers, spicy oil, black olives"}, p:"16,50 €"},
          {n:"La Scampis Ail", d:{fr:"Mozzarella, tomates, scampis, roquette, ail doux, olives noires",en:"Mozzarella, tomatoes, scampi, arugula, sweet garlic, black olives"}, p:"17,50 €"},
          {n:"La Regina", d:{fr:"Mozzarella, tomates, jambon, champignons, artichauts, olives, herbes de Provence",en:"Mozzarella, tomatoes, ham, mushrooms, artichoke, olives, herbs de Provence"}, p:"16,50 €"}
        ]},
        { t:{fr:"Desserts",en:"Desserts"}, items:[
          {n:"Fondant au chocolat noir", d:{fr:"Glace à la vanille",en:"Dark chocolate cake, vanilla ice cream"}, p:"9,00 €"},
          {n:"Tarte tatin chaude", d:{fr:"Glace vanille",en:"Hot tart tatin, vanilla ice cream"}, p:"9,50 €"},
          {n:"Crêpe aux pommes caramélisées", d:{fr:"Et sa glace vanille",en:"Caramelized apple crepe and vanilla ice cream"}, p:"11,50 €"},
          {n:"Crêpe au sucre brun", d:{fr:"",en:"Crepe with brown sugar"}, p:"8,00 €"},
          {n:"Crêpe mikado", d:{fr:"Chocolat chaud et glace vanille",en:"Mikado crepe, hot chocolate sauce and vanilla ice cream"}, p:"8,50 €"},
          {n:"Dame blanche ou dame noir", d:{fr:"",en:"Dame blanche or dame noir"}, p:"8,50 €"}
        ]},
        { t:{fr:"Menu Kids · 18,50 €",en:"Kids Menu · €18.50"}, items:[
          {n:"1 Plat", d:{fr:"Chicken nuggets, frites, salade OU spaghetti bolognaise",en:"Chicken nuggets, french fries, salad OR spaghetti bolognese"}},
          {n:"1 Boisson", d:{fr:"Uniquement en bouteille",en:"Drink, bottle only"}},
          {n:"1 Dessert", d:{fr:"1 boule de glace au choix OU 1 crêpe au sucre",en:"Choice of ice cream OR crepe with sugar"}}
        ]}
      ]
    },

    /* ============ 3. COCKTAILS ============ */
    {
      key: "cocktails",
      photo: "/cocktails-update.webp",
      card: {
        fr: { title:"Cocktails", italic:"Maison & créations signature",
              desc:"18 cocktails, 6 sans alcool et 4 créations « Roxi's Special », à base de fruits frais.",
              price:"10 € à 14,50 €" },
        en: { title:"Cocktails", italic:"House & signature creations",
              desc:"18 cocktails, 6 mocktails and 4 « Roxi's Special » creations, made with fresh fruit.",
              price:"€10 to €14.50" }
      },
      modal: {
        fr: { title:"Cocktails", italic:"Préparés maison, à base de fruits frais et d'alcools choisis." },
        en: { title:"Cocktails", italic:"Made in-house with fresh fruit and selected spirits." }
      },
      groups: [
        { t:{fr:"Cocktails",en:"Cocktails"}, items:[
          {n:"Mojito", d:{fr:"Rhum «Bacardi», citron vert, sucre de canne, menthe fraîche, soda, angostura",en:"Bacardi rum, lime, cane sugar, fresh mint, soda, angostura"}, p:"12,00 €"},
          {n:"Caïpirinha", d:{fr:"Cachaça, citron vert, sucre de canne",en:"Cachaça, lime, cane sugar"}, p:"12,00 €"},
          {n:"Cuba libre", d:{fr:"Rhum «Bacardi», citron vert, coca cola",en:"Bacardi rum, lime, coca cola"}, p:"11,00 €"},
          {n:"Piña Colada", d:{fr:"Rhum «Bacardi», crème de coco caraïbos, jus d'ananas, ananas frais",en:"Bacardi rum, caraibos coconut cream, pineapple juice, fresh pineapple"}, p:"13,00 €"},
          {n:"Pornstar Martini", d:{fr:"Vodka, jus de la passion, passoa, sirop de vanille, citron, + shot de champagne",en:"Vodka, passion juice, passoa, vanilla syrup, lemon, + champagne shot"}, p:"13,00 €"},
          {n:"Bloody mary", d:{fr:"Vodka «Eristoff», jus de tomate, jus de citron, épices",en:"Eristoff vodka, tomato juice, lemon juice, spices"}, p:"11,50 €"},
          {n:"Tequila sunrise", d:{fr:"Tequila Pistoleros, jus d'orange frais, grenadine",en:"Tequila Pistoleros, fresh orange juice, grenadine"}, p:"11,50 €"},
          {n:"Ti punch", d:{fr:"Rhum agricole ambrée, citron vert, sucre de canne",en:"Amber agricultural rum, lime, cane sugar"}, p:"12,50 €"},
          {n:"Long island ice tea", d:{fr:"Rhum, vodka, tequila, gin, Cointreau, jus de citron, coca cola",en:"Rum, vodka, tequila, gin, Cointreau, lemon juice, coca cola"}, p:"14,50 €"},
          {n:"Negroni", d:{fr:"Campari, gin, martini rouge",en:"Campari, gin, red martini"}, p:"12,50 €"},
          {n:"Margarita", d:{fr:"Tequila Pistoleros, Cointreau, jus de citron",en:"Tequila Pistoleros, Cointreau, lemon juice"}, p:"12,00 €"},
          {n:"Jack sour", d:{fr:"Whisky «Jack Daniel's», jus de citron, sucre de canne",en:"Jack Daniel's whiskey, lemon juice, cane sugar"}, p:"12,50 €"},
          {n:"Sex on the beach", d:{fr:"Vodka «Eristoff», liqueur de pêche, jus de cranberry, jus d'orange frais",en:"Eristoff vodka, peach liquor, cranberry juice, fresh orange juice"}, p:"12,00 €"},
          {n:"Pink", d:{fr:"Vodka «Eristoff», Passoa, jus de passion, sirop de framboise",en:"Eristoff vodka, Passoa, passion juice, raspberry syrup"}, p:"12,50 €"},
          {n:"Cosmopolitan", d:{fr:"Vodka «Eristoff», Cointreau, jus de cranberry, jus de citron",en:"Eristoff vodka, Cointreau, cranberry juice, lemon juice"}, p:"12,50 €"},
          {n:"Margarita Premium", d:{fr:"Tequila Patron, Cointreau, jus de citron",en:"Patron Tequila, Cointreau, lemon juice"}, p:"14,00 €"},
          {n:"Moscow Mule", d:{fr:"Vodka, citron vert, ginger beer",en:"Vodka, lime, ginger beer"}, p:"12,00 €"},
          {n:"Expresso Martini", d:{fr:"Vodka, kahlua, expresso, sucre de canne",en:"Vodka, kahlua, espresso, cane sugar"}, p:"12,50 €"}
        ]},
        { t:{fr:"Cocktails sans alcool",en:"Mocktails"}, items:[
          {n:"Mojito sans alcool", d:{fr:"Citron vert, menthe fraîche, sirop de gingembre, canada dry",en:"Lime, fresh mint, ginger syrup, canada dry"}, p:"10,00 €"},
          {n:"Summer Vibes", d:{fr:"Jus de fraise, jus de cranberry, sirop pastèque, jus de citron",en:"Strawberry juice, cranberry juice, watermelon syrup, lemon juice"}, p:"10,00 €"},
          {n:"Nuit active", d:{fr:"Ice tea pêche, sirop de mangue, orange et citron frais",en:"Peach ice tea, mango syrup, fresh orange and lemon"}, p:"10,00 €"},
          {n:"Piña sans alcool", d:{fr:"Jus d'ananas, crème de coco caraïbos, ananas frais",en:"Pineapple juice, caraibos coconut cream, fresh pineapple"}, p:"12,00 €"},
          {n:"Nuit douce", d:{fr:"Jus de fraises, ananas frais, jus de framboise, jus d'orange frais",en:"Fresh strawberry, fresh pineapple, raspberry juice, fresh orange juice"}, p:"12,00 €"},
          {n:"Sunny Roxi", d:{fr:"Jus de la passion, citron vert, jus de cranberry, sirop de mangue",en:"Passion juice, lime, cranberry juice, mango syrup"}, p:"10,00 €"}
        ]},
        { t:{fr:"Roxi's Special Cocktails",en:"Roxi's Special Cocktails"}, items:[
          {n:"Strong Caïpirinha", d:{fr:"Double dose de Rhum «Clément» 55°, citron vert, sucre de canne",en:"Double dose of 55° Clément rum, lime, cane sugar"}, p:"14,50 €"},
          {n:"Ti Punch passion frais", d:{fr:"Double dose de Rhum «Clément» 55°, fruit de la passion frais, sucre de canne",en:"Double dose of 55° Clément rum, fresh passion fruit, cane sugar"}, p:"14,50 €"},
          {n:"Ginger Power", d:{fr:"Vodka «Eristoff», sirop de gingembre, citron vert, canada dry",en:"Eristoff vodka, ginger syrup, lime, canada dry"}, p:"12,50 €"},
          {n:"Atomic bomb", d:{fr:"Vodka «Eristoff», Vodka Limskaya, citron vert, sucre de canne, Schweppes agrume",en:"Eristoff vodka, Limskaya vodka, lime, cane sugar, schweppes agrume"}, p:"12,50 €"}
        ]}
      ]
    },

    /* ============ 4. ALCOOL ============ */
    {
      key: "alcool",
      photo: "/alcool-soft.webp",
      card: {
        fr: { title:"Alcool", italic:"Apéritifs, spiritueux & digestifs",
              desc:"Apéritifs, rhums, vodkas, gins, whiskies, tequilas et digestifs servis au verre.",
              price:"6 € à 14,50 €" },
        en: { title:"Spirits", italic:"Aperitifs, spirits & digestifs",
              desc:"Aperitifs, rums, vodkas, gins, whiskies, tequilas and digestifs by the glass.",
              price:"€6 to €14.50" }
      },
      modal: {
        fr: { title:"Alcool", italic:"Apéritifs, spiritueux et digestifs, au verre ou à la bouteille." },
        en: { title:"Spirits", italic:"Aperitifs, spirits and digestifs, by the glass or bottle." }
      },
      groups: [
        { t:{fr:"Apéritif",en:"Aperitif"}, items:[
          {n:"Get 27", p:"6,00 €"}, {n:"Porto rouge ruby «Taylor's»", p:"6,00 €"},
          {n:"Martini Bianco, Rosso", p:"6,00 €"}, {n:"Campari", p:"6,50 €"},
          {n:"Passoa", p:"6,00 €"}, {n:"Malibu", p:"6,00 €"}, {n:"Pisang Ambon", p:"6,00 €"},
          {n:"Ricard", p:"6,00 €"}, {n:"Kir", d:{fr:"Pêche, Violette, Cassis",en:"Peach, Violet, Blackcurrant"}, p:"6,50 €"},
          {n:"Kir royal", d:{fr:"Pêche, Violette, Cassis",en:"Peach, Violet, Blackcurrant"}, p:"8,50 €"},
          {n:"Aperol Spritz", p:"10,00 €"}, {n:"Martini Spritz", p:"10,00 €"},
          {n:"Limoncello Spritz", p:"10,50 €"}, {n:"Campari Spritz", p:"10,50 €"},
          {n:"St Germain Spritz", p:"12,50 €"}
        ]},
        { t:{fr:"Rhum",en:"Rum"}, items:[
          {n:"Rhum Bacardi", p:"8,00 €"}, {n:"Rhum Bacardi 4 ans d'âge", p:"9,00 €"},
          {n:"Rhum Bacardi 8 ans d'âge", p:"9,50 €"}, {n:"Rhum Agricole Clément 55°", p:"10,00 €"},
          {n:"Rhum Clément V.O. Supérieur", p:"14,50 €"}
        ]},
        { t:{fr:"Vodka",en:"Vodka"}, items:[
          {n:"Vodka Eristoff Rouge", p:"7,00 €"}, {n:"Vodka Eristoff", p:"8,00 €"}, {n:"Vodka Belvedere", p:"13,00 €"}
        ]},
        { t:{fr:"Gin",en:"Gin"}, items:[
          {n:"Gin Bombay Saphir", p:"9,00 €"}, {n:"Gin Hendrick", p:"12,00 €"}
        ]},
        { t:{fr:"Tequila",en:"Tequila"}, items:[
          {n:"Tequila Pistoleros", p:"7,00 €"}, {n:"Tequila Patron", p:"10,00 €"}
        ]},
        { t:{fr:"Whisky",en:"Whisky"}, items:[
          {n:"Jack Daniel's", p:"9,00 €"}, {n:"Jack Daniel's Honey", p:"9,00 €"},
          {n:"Jack Daniel's Fire", p:"9,00 €"}, {n:"Jack Daniel's Apple", p:"9,00 €"}, {n:"Chivas Regal", p:"10,00 €"}
        ]},
        { t:{fr:"Digestifs",en:"Digestifs"}, items:[
          {n:"Disaronno Amaretto", p:"7,00 €"}, {n:"Baileys", p:"6,50 €"}, {n:"Limoncello", p:"6,50 €"},
          {n:"Sambucca", p:"6,50 €"}, {n:"Grappa", p:"6,50 €"}, {n:"Cointreau", p:"7,00 €"},
          {n:"Calvados", p:"8,00 €"}, {n:"Cognac", p:"8,50 €"}
        ]}
      ]
    },

    /* ============ 5. SOFT ============ */
    {
      key: "soft",
      photo: "/photo-soft.webp",
      card: {
        fr: { title:"Soft", italic:"Sodas, jus & limonade maison",
              desc:"Sodas, eaux, jus frais, thé glacé et limonade maison, Red Bull.",
              price:"3 € à 6 €" },
        en: { title:"Soft drinks", italic:"Sodas, juices & homemade lemonade",
              desc:"Sodas, waters, fresh juices, homemade iced tea and lemonade, Red Bull.",
              price:"€3 to €6" }
      },
      modal: {
        fr: { title:"Soft", italic:"Boissons sans alcool, sodas, jus, eaux et limonade maison." },
        en: { title:"Soft drinks", italic:"Alcohol-free drinks, sodas, juices, waters and homemade lemonade." }
      },
      groups: [
        { t:{fr:"Sodas",en:"Sodas"}, items:[
          {n:"Coca Cola / Zero sugar", p:"3,90 €"},
          {n:"Sprite", p:"3,90 €"},
          {n:"Fanta Orange", p:"3,90 €"},
          {n:"Fuze Tea Sparkling Lemon", p:"3,90 €"},
          {n:"Fuze Tea Peach Hibiscus", p:"4,00 €"},
          {n:"Canada dry", p:"3,90 €"},
          {n:"Schweppes", d:{fr:"Tonic, agrume",en:"Tonic, citrus"}, p:"3,90 €"},
          {n:"Schweppes premium", d:{fr:"Ginger beer",en:"Ginger beer"}, p:"4,00 €"},
          {n:"Red bull", p:"5,00 €"}
        ]},
        { t:{fr:"Jus & boissons fraîches",en:"Juices & fresh drinks"}, items:[
          {n:"Minute Maid", d:{fr:"Orange, Pomme, Tomate",en:"Orange, Apple, Tomato"}, p:"4,00 €"},
          {n:"Jus frais", d:{fr:"Créole, fraise, framboise, orange, citron",en:"Creole, strawberry, raspberry, orange, lemon"}, p:"5,50 €"},
          {n:"Thé glacé maison", d:{fr:"Saison estivale",en:"Homemade iced tea, summer season"}, p:"6,00 €"},
          {n:"Limonade maison", d:{fr:"",en:"Homemade lemonade"}, p:"5,50 €"}
        ]},
        { t:{fr:"Eaux",en:"Waters"}, items:[
          {n:"Bru pétillante 50cl", p:"5,00 €"},
          {n:"Bru pétillante 25cl", p:"3,00 €"},
          {n:"Bru plate 50cl", p:"5,00 €"},
          {n:"Bru plate 25cl", p:"3,00 €"}
        ]}
      ]
    },

    /* ============ 6. CAFÉ / BOISSONS CHAUDES ============ */
    {
      key: "cafe",
      photo: "/photo-cafe.webp",
      card: {
        fr: { title:"Café & boissons chaudes", italic:"Pour les après-midis posés",
              desc:"Expresso, cappuccino, lait russe, café frappé maison, thés, chocolat chaud, Irish coffee.",
              price:"3 € à 12,50 €" },
        en: { title:"Coffee & hot drinks", italic:"For laid-back afternoons",
              desc:"Espresso, cappuccino, latte, homemade iced coffee, teas, hot chocolate, Irish coffee.",
              price:"€3 to €12.50" }
      },
      modal: {
        fr: { title:"Café & boissons chaudes", italic:"Pour les après-midis posés en terrasse ou les soirées qui s'étirent." },
        en: { title:"Coffee & hot drinks", italic:"For laid-back afternoons on the terrace or long, easy evenings." }
      },
      groups: [
        { t:{fr:"Boissons chaudes",en:"Hot drinks"}, items:[
          {n:"Expresso", p:"3,00 €"}, {n:"Double expresso", p:"4,50 €"}, {n:"Café", p:"3,00 €"},
          {n:"Cappuccino", d:{fr:"Italien ou chantilly",en:"Italian or with cream"}, p:"4,50 €"},
          {n:"Lait russe", d:{fr:"",en:"Latte"}, p:"4,80 €"}, {n:"Décaféiné", d:{fr:"",en:"Decaf"}, p:"3,50 €"},
          {n:"Chocolat chaud maison", d:{fr:"",en:"Homemade hot chocolate"}, p:"6,50 €"},
          {n:"Café frappé maison au lait de soya", d:{fr:"1 sirop au choix : caramel ou vanille",en:"Homemade iced coffee with soy milk, 1 syrup: caramel or vanilla"}, p:"6,50 €"},
          {n:"Irish / French / Italian coffee", p:"12,50 €"},
          {n:"Grog", d:{fr:"Rhum, thé noir, citron pressé, miel",en:"Rum, black tea, fresh lemon, honey"}, p:"10,00 €"}
        ]},
        { t:{fr:"Thés",en:"Teas"}, items:[
          {n:"Thé à la menthe fraîche", d:{fr:"",en:"Fresh mint tea"}, p:"5,50 €"},
          {n:"Thé parfumé au jasmin", d:{fr:"",en:"Jasmine tea"}, p:"4,90 €"},
          {n:"Earl Grey nature", d:{fr:"",en:"Earl Grey"}, p:"4,90 €"},
          {n:"Thé vert", d:{fr:"",en:"Green tea"}, p:"4,90 €"},
          {n:"Thé Roïbos", d:{fr:"",en:"Rooibos"}, p:"4,90 €"},
          {n:"Baies des bois", d:{fr:"",en:"Wild berries"}, p:"4,90 €"}
        ]}
      ]
    },

    /* ============ 7. VINS & BULLES ============ */
    {
      key: "vins",
      wide: true,
      photo: "/vin-et-bulles.webp",
      card: {
        fr: { title:"Vins & bulles", italic:"Verre · demi · bouteille",
              desc:"Vins maison du Pays d'Oc, Alsace, Bordeaux, Côtes du Rhône, blancs bio. Cava, Prosecco, Champagnes.",
              price:"Verre 6 € · Btl 150 €" },
        en: { title:"Wines & sparkling", italic:"Glass · half · bottle",
              desc:"House wines from Pays d'Oc, Alsace, Bordeaux, Côtes du Rhône, organic whites. Cava, Prosecco, Champagnes.",
              price:"Glass €6 · Btl €150" }
      },
      modal: {
        fr: { title:"Vins & bulles", italic:"Au verre, en demi ou en bouteille. Bulles et champagnes." },
        en: { title:"Wines & sparkling", italic:"By the glass, half-litre or bottle. Bubbles and champagnes." }
      },
      groups: [
        { t:{fr:"Vins maison",en:"House wines"}, cols:["Bouteille","Demi","Verre"], items:[
          {n:"Vin Blanc · Terre dieu, Pays d'Oc", d:{fr:"Sauvignon blanc 12%",en:"White wine · Sauvignon blanc 12%"}, p:["27,50 €","19,50 €","6,00 €"]},
          {n:"Vin Rosé · Terre dieu, Pays d'Oc", d:{fr:"Grenache syrah 12,5%",en:"Rosé wine · Grenache syrah 12.5%"}, p:["27,50 €","19,50 €","6,00 €"]},
          {n:"Vin Rouge · Terre dieu, Pays d'Oc", d:{fr:"Cabernet Syrah Merlot 13%",en:"Red wine · Cabernet Syrah Merlot 13%"}, p:["27,50 €","19,50 €","6,00 €"]}
        ]},
        { t:{fr:"Vin rosé",en:"Rosé wine"}, cols:["Bouteille","","Verre"], items:[
          {n:"Gris Blanc, Gérard Bertrand, Languedoc Bio", p:["32,00 €","","7,00 €"]}
        ]},
        { t:{fr:"Vin rouge",en:"Red wine"}, cols:["Bouteille","Demi","Verre"], items:[
          {n:"Pinot noir d'Alsace", p:["29,00 €","21,00 €","6,50 €"]},
          {n:"Château les Aublines, Blaye Côtes de Bordeaux", p:["29,00 €","21,00 €","6,50 €"]},
          {n:"Côtes du Rhône «Samorèns», Ferraton Père & Fils", p:["29,00 €","21,00 €","6,50 €"]}
        ]},
        { t:{fr:"Vin blanc",en:"White wine"}, cols:["Bouteille","Demi","Verre"], items:[
          {n:"Pinot Blanc d'Alsace", p:["29,00 €","21,00 €","6,50 €"]},
          {n:"Chardonnay Obikwa, South-Africa", p:["29,00 €","21,00 €","6,50 €"]},
          {n:"Pouilly fumé Bio", p:["32,00 €","23,00 €",""]}
        ]},
        { t:{fr:"Bulles & Champagne",en:"Sparkling & Champagne"}, cols:["Bouteille","Flûte",""],
          nb:{fr:"Vin chaud maison (saison hivernale) 8,00 € · Sangria maison (saison estivale) 8,50 €",
              en:"Homemade mulled wine (winter) €8.00 · Homemade sangria (summer) €8.50"}, items:[
          {n:"Cava", p:["42,00 €","7,50 €",""]},
          {n:"Prosecco", p:["45,00 €","8,00 €",""]},
          {n:"Champagne Haton, Classic Blanc de Noirs Brut", p:["55,00 €","10,50 €",""]},
          {n:"Champagne Piper-Heidsieck «cuvée brut»", p:["75,00 €","13,50 €",""]},
          {n:"Champagne Taittinger «brut réserve»", p:["90,00 €","",""]},
          {n:"Champagne Ruinart «blanc de blanc»", p:["150,00 €","",""]}
        ]}
      ]
    }

  ]
};
