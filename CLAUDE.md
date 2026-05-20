# ROXI — Instructions projet pour Claude Code

> **Lecture obligatoire à chaque session.** Ce fichier est le prompt système permanent du projet ROXI. Il fait référence à la ressource SEO externe `claude-seo-main` qui est une **dépendance permanente** du projet.

---

## 1. Dépendance externe : `claude-seo-main`

Chemin absolu :
`/Users/user/Desktop/Cours/Travail_Perso/Creation_Site/claude-seo-main/`

C'est le plugin open-source [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) (Claude Code skill Tier 4) téléchargé localement. **Il N'est PAS installé comme plugin Claude Code** — le `${CLAUDE_PLUGIN_ROOT}` du `hooks.json` natif n'est donc pas résolu.

### Ressources à consulter en priorité (chemins absolus)

| Besoin | Fichier |
|---|---|
| Règles Google officielles | `claude-seo-main/pdf/google-seo-reference.md` |
| On-page audit | `claude-seo-main/skills/seo-page/SKILL.md` |
| Technical audit | `claude-seo-main/skills/seo-technical/SKILL.md` |
| Schema.org (Restaurant, LocalBusiness, Menu) | `claude-seo-main/skills/seo-schema/SKILL.md` + `schema/templates.json` |
| **Local SEO (cœur ROXI)** | `claude-seo-main/skills/seo-local/SKILL.md` |
| Google Maps / GBP | `claude-seo-main/skills/seo-maps/SKILL.md` |
| Images / alt / formats | `claude-seo-main/skills/seo-images/SKILL.md` |
| Content E-E-A-T | `claude-seo-main/skills/seo-content/SKILL.md` |
| Schema validation hook (à activer) | `claude-seo-main/hooks/validate-schema.py` |

### Sub-skills à activer pour ROXI

✅ **Prioritaires** (à charger quand pertinent) :
`seo-local`, `seo-maps`, `seo-schema`, `seo-page`, `seo-technical`, `seo-images`, `seo-content`

❌ **Désactivées** (hors scope ROXI) :
`seo-hreflang` (mono-langue FR), `seo-ecommerce` (pas de boutique), `seo-programmatic` (site one-page),
`seo-backlinks` (v2 éventuelle), `seo-cluster` / `seo-competitor-pages` (pas de blog/cluster pour l'instant)

### Hook `validate-schema.py`

Pour l'activer dans ce projet, créer `Roxi/.claude/settings.local.json` :
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"/Users/user/Desktop/Cours/Travail_Perso/Creation_Site/claude-seo-main/hooks/validate-schema.py\" \"$FILE_PATH\""
          }
        ]
      }
    ]
  }
}
```

Effet : à chaque édition d'un fichier `.html`, validation JSON-LD automatique. Exit code 2 = BLOQUE le commit si placeholder ou type déprécié détecté.

### Scripts utiles sans API key

- `parse_html.py <file>` — extracteur HTML pour audit on-page
- `fetch_page.py <url>` — récupération page avec rotation UA

### Scripts utiles avec API key (à fournir le moment venu)

- `pagespeed_check.py` + `crux_history.py` — Google API Key (gratuite, monitoring Core Web Vitals réels)
- `gsc_inspect.py` / `gsc_query.py` — OAuth Search Console (gratuit, dès vérification du domaine)

---

## 2. Spécifications ROXI (NAP + business)

### Identité

| Champ | Valeur |
|---|---|
| **Nom légal / commercial** | ROXI |
| **Type** | Restaurant + Bar à cocktails |
| **Schema.org primary type** | `Restaurant` (pas `LocalBusiness` générique) |
| **Catégorie GBP primaire recommandée** | "Restaurant" + secondaires : "Bar", "Cocktail Bar", "Belgian Restaurant" |
| **Date de reprise** | 2018 (nouvelle direction) |
| **Slogan** | Bar · Restaurant · Châtelain · depuis 2018 |

### NAP (Name · Address · Phone)

| | Valeur exacte |
|---|---|
| **Adresse** | Rue du Bailli 82, 1050 Ixelles, Bruxelles, Belgique |
| **Téléphone (E.164)** | `+3226461792` |
| **Téléphone affiché** | +32 2 646 17 92 |
| **Email** | theroxi2018@gmail.com |
| **Coordonnées géo** | Latitude 50.8256251, Longitude 4.3601542 (Nominatim/OSM, 7 décimales) |

⚠️ **Règle de cohérence absolue** : tout NAP affiché doit être strictement identique dans le HTML visible, le JSON-LD `Restaurant`, et la fiche Google Business Profile. Toute divergence = pénalité.

### Horaires

| Jour | Ouverture |
|---|---|
| Lundi–Jeudi | 10h30 — 01h00 |
| Vendredi–Samedi | 10h30 — 02h00 |
| Dimanche | 10h30 — 01h00 |
| **Cuisine** | non-stop midi → minuit, 7j/7 |
| **Happy hour** | 18h–19h en semaine |

Format `openingHoursSpecification` schema (à utiliser tel quel) :
```json
[
  {"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"10:30","closes":"01:00"},
  {"@type":"OpeningHoursSpecification","dayOfWeek":["Friday","Saturday"],"opens":"10:30","closes":"02:00"},
  {"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"10:30","closes":"01:00"}
]
```

### Zone cible (local SEO)

- **Quartier** : Châtelain
- **Commune** : Ixelles (1050)
- **Ville** : Bruxelles
- **Région** : Région de Bruxelles-Capitale
- **Pays** : BE

### Mots-clés prioritaires (intent local)

**Tête de longue traîne** (haute concurrence)
- restaurant Châtelain · restaurant Bailli · bar Ixelles · bar Châtelain · cocktails Ixelles

**Longue traîne (à privilégier)**
- restaurant rue du Bailli · bar à cocktails Châtelain · restaurant belge Châtelain ·
- terrasse Châtelain · happy hour Ixelles · burger Châtelain · pizza Bailli ·
- bar restaurant ouvert tard Ixelles · privatisation bar Bruxelles

**Branded**
- ROXI Bailli · ROXI Bruxelles · ROXI Ixelles · ROXI Châtelain

**Intent transactionnel**
- réserver restaurant Châtelain · privatiser bar Bruxelles · groupes restaurant Ixelles

### Specs Restaurant pour le schema

- `servesCuisine` : ["Belgian", "Mediterranean", "European"]
- `priceRange` : "€€" (plats 13–26€)
- `acceptsReservations` : true (par téléphone)
- `paymentAccepted` : à vérifier, probablement "Cash, Credit Card"
- `currenciesAccepted` : "EUR"
- Capacité : 40 places rez-de-chaussée + 40 places étage (privatisable)

---

## 3. Règles automatiques de Claude pour le projet ROXI

### Règle d'or — Audit SEO automatique à chaque modification HTML

> **À chaque modification HTML sur `index.html` (et tout nouveau fichier HTML du projet), Claude DOIT automatiquement vérifier les implications SEO sans attendre que l'utilisateur le demande**.

Checklist auto à chaque Edit/Write HTML :
1. Le title reste 50–60 caractères avec keyword local ? ✓
2. Meta description reste 150–160 caractères ? ✓
3. Pas plus d'un `<h1>` (visible ou `visually-hidden`) ? ✓
4. Tout nouvel `<img>` a-t-il `alt`, `width`, `height`, `loading` approprié, et un format moderne ? ✓
5. Toute nouvelle section sémantique → impact schema ? (ex : section concerts → `Event`, section menu → `Menu` + `MenuSection` + `MenuItem`, section reviews → `aggregateRating` + `Review`)
6. Liens externes (Instagram, Facebook…) — pas de `href="#"` placeholder ? ✓
7. Cohérence NAP — l'adresse, le téléphone, l'email affichés correspondent au schema JSON-LD ? ✓
8. JSON-LD présent et valide ? Si modifié, hook `validate-schema.py` doit passer ✓

### Règles de pattern à suivre

- **Section concerts/live** → ajouter `Event` schema avec `startDate`, `location`, `performer`, `eventStatus`
- **Section menu étendue** → ajouter `Menu` + `MenuSection` (par catégorie) + `MenuItem` (avec `name`, `description`, `offers.price`, `offers.priceCurrency:"EUR"`)
- **Section avis/témoignages** → si récupération vraie de Google Reviews, ajouter `aggregateRating` (mais PAS de self-serving review markup, Google ignore)
- **Nouvelle page** → ajouter `BreadcrumbList` si navigation hiérarchique apparaît, sinon skip
- **Section FAQ** → contenu OK pour AI citation, mais **NE PAS ajouter FAQPage schema** (restreint gov/healthcare seulement depuis août 2023)
- **Carrousel/galerie photo** → `ImageObject` schema sur chaque photo si vraie photo originale

### Garde-fous

- **JAMAIS** de schema `HowTo` (déprécié sept 2023), `FAQPage` (restreint), `SpecialAnnouncement` (déprécié juillet 2025)
- **JAMAIS** de placeholder text dans le JSON-LD (`[Business Name]`, `[Phone]`, etc.) — le hook bloque
- **JAMAIS** d'images PNG >500KB en production (convertir WebP)
- **JAMAIS** de `loading="lazy"` sur l'image LCP (hero) — au contraire, `fetchpriority="high"`
- **JAMAIS** de liens sociaux `href="#"` — soit l'URL réelle, soit retirer l'élément
- **JAMAIS** dupliquer du contenu entre les 3 versions sans `<link rel="canonical">` pointant vers `index.html`

### Single source of truth

Le site est **mono-page** : un seul `index.html` à la racine, palette unique vert sapin + rose poudré + or moutarde ponctuel, logo `Logos/roxi-logo-01-vert-rose.svg`. Les anciennes variantes (bordeaux, terracotta-v2, etc.) ont été supprimées le 18 mai 2026 — ne pas les recréer sans validation explicite.

### Domaine canonique (PROVISOIRE)

> ⚠️ **À MIGRER quand le client choisira un domaine custom.**

URL actuelle : `https://client-roxi.vercel.app`
Statut : URL preview Vercel par défaut. Acceptable en pré-production. **Doit être remplacée** dès qu'un nom de domaine est enregistré (ex : `roxi.be`, `roxibar.be`, `roxi-officiel.be`).

**Marqueur** : un commentaire HTML `@canonical-domain` est placé en haut de `index.seo.html` (et sera porté sur `index.html` à la bascule).

**Commande de migration en une fois** (à exécuter depuis la racine du projet ROXI) :
```bash
grep -rln "client-roxi.vercel.app" . \
  --include='*.html' --include='*.xml' --include='*.txt' --include='*.md' \
  | xargs sed -i '' 's|https://client-roxi.vercel.app|https://NOUVEAU-DOMAINE|g'
```

**Endroits affectés** (à vérifier après migration) :
| Fichier | Occurrences |
|---|---|
| `index.html` (ou `index.seo.html` avant bascule) | `<link rel="canonical">`, `og:url`, JSON-LD `@id` × 3, `url` × 2, `logo`, `image` × 2 = ~10 |
| `sitemap.xml` (créé bloc 3) | `<loc>` |
| `robots.txt` (créé bloc 3) | `Sitemap:` |
| `CLAUDE.md` (ce fichier) | les exemples dans cette section |

**Après migration**, soumettre le nouveau sitemap dans Google Search Console + Bing Webmaster + utiliser l'Indexing API si urgence.

---

## 4. Workflow standard pour ce projet

1. **Toute modif HTML** → checklist auto + suggestion proactive des schemas concernés
2. **Ajout d'images** → recommander conversion WebP + propose la commande exacte (`cwebp -q 82 …`)
3. **Avant tout commit** → vérifier que le hook `validate-schema.py` passe (si configuré)
4. **Push vers main** → Vercel redéploie automatiquement
5. **Après mise en ligne** → recommander : (a) vérifier GBP, (b) inscrire Apple Business Connect + Bing Places, (c) soumettre sitemap à Search Console

---

## 5. Référence rapide aux commandes du plugin

Si l'utilisateur demande un audit complet, suggérer de lancer (en exécutant le script Python correspondant ou en suivant la SKILL.md à la main) :

| Tâche | Sub-skill | Commande équivalente |
|---|---|---|
| Audit complet | `seo-audit` | suivre `skills/seo-audit/SKILL.md` |
| Single page | `seo-page` | suivre `skills/seo-page/SKILL.md` |
| Technical | `seo-technical` | suivre `skills/seo-technical/SKILL.md` |
| Schema | `seo-schema` | suivre `skills/seo-schema/SKILL.md` |
| Local | `seo-local` | suivre `skills/seo-local/SKILL.md` |
| Maps | `seo-maps` | suivre `skills/seo-maps/SKILL.md` |

(Le slash command natif `/seo …` ne fonctionne PAS ici car le plugin n'est pas installé — il faut suivre les SKILL.md à la main.)

---

### Favicon — limite connue

Le SVG `Logos/roxi-logo-01-vert-rose.svg` contient le texte "ROXI" + "— BAILLI —" dans un cercle vert. **À 16×16 px (favicon onglet)**, le texte devient illisible — seule la silhouette vert + rose reste reconnaissable. Les `favicon-16.png` et `favicon-32.png` à la racine sont des downscales Lanczos du SVG, ce qui est le mieux possible sans repartir d'un design simplifié.

**Recommandation design (hors scope SEO)** : si le client veut un favicon lisible à toutes tailles, créer un `Logos/roxi-logo-mark.svg` simplifié (cercle vert + juste un "R" majuscule rose, ou monogramme), puis remplacer la référence dans le HTML. La taille de fichier reste anecdotique.

---

## 6. TODOs restants (action user / patron)

Le site est **prêt à pousser en prod** mais quelques éléments nécessitent une intervention humaine pour atteindre l'optimum SEO local. Ils sont marqués `<!-- TODO -->` ou `🔴` dans le code, grep-ables :

```bash
grep -rn "TODO\|🔴" /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi/ \
  --include='*.html' --include='*.txt' --include='*.md'
```

### 🔴 PRIORITÉ ABSOLUE — LE JOUR DE LA BASCULE DOMAINE

**Désactiver le `noindex` provisoire** mis en place pour la phase preview Vercel. Sans cette action, le site sur le vrai domaine restera **invisible à Google** :

1. **3 fichiers HTML** — retirer (ou changer en `index, follow`) la balise :
   ```html
   <meta name="robots" content="noindex, nofollow">
   ```
   Présente en haut du `<head>` de : `index.html`, `mentions-legales.html`, `politique-confidentialite.html`.

2. **`robots.txt`** — remplacer le contenu actuel (`Disallow: /`) par la **version production** :
   ```
   # ─── Crawlers de recherche classiques ───
   User-agent: *
   Allow: /

   # ─── AI crawlers : autorisés (citabilité ChatGPT, Claude, Perplexity, Gemini) ───
   User-agent: GPTBot
   Allow: /
   User-agent: ChatGPT-User
   Allow: /
   User-agent: ClaudeBot
   Allow: /
   User-agent: Claude-Web
   Allow: /
   User-agent: PerplexityBot
   Allow: /
   User-agent: Google-Extended
   Allow: /
   User-agent: Bytespider
   Allow: /
   User-agent: CCBot
   Allow: /
   User-agent: Applebot-Extended
   Allow: /

   Sitemap: https://NOUVEAU-DOMAINE/sitemap.xml
   ```

3. **Vérification post-bascule** :
   - Tester sur https://www.google.com/search?q=site:NOUVEAU-DOMAINE (au bout de 48-72h)
   - Soumettre `sitemap.xml` dans Google Search Console
   - Demander un "Live test" sur l'URL principale dans GSC pour forcer le recrawl

### 🔴 Priorité haute — à faire avec le patron

1. **Domaine de production custom** — actuellement `https://client-roxi.vercel.app/`. Quand un domaine `.be` est enregistré (ex : roxibar.be), suivre la procédure section "Domaine canonique (PROVISOIRE)" ci-dessus. Concerne : `index.html`, `mentions-legales.html`, `politique-confidentialite.html`, `robots.txt`, `sitemap.xml`.

2. **Vraies URLs Instagram + Facebook** ROXI — actuellement les liens du header et footer pointent vers les pages d'accueil génériques `https://www.instagram.com/` et `https://www.facebook.com/`. Quand les vraies URLs sont connues :
   - Remplacer `href="https://www.instagram.com/"` (×1) et `href="https://www.facebook.com/"` (×1) dans `index.html`
   - Ajouter au schema JSON-LD : `"sameAs": ["https://instagram.com/...", "https://facebook.com/...", "https://maps.google.com/?cid=...", "https://www.tripadvisor.com/..."]`

3. **place_id Google Business Profile** — actuellement l'iframe Google Maps cherche par adresse. Pour pointer sur la fiche GBP réelle avec ses avis :
   - Récupérer le `place_id` ou l'URL embed officielle depuis https://www.google.com/business/ (compte ROXI) ou Google Maps → bouton "Partager" → "Intégrer une carte"
   - Remplacer l'URL `src` de l'iframe dans `index.html` (section #find-us)

4. **Infos légales obligatoires** — marquées `<span class="todo">À COMPLÉTER PAR LE PROPRIÉTAIRE</span>` dans `mentions-legales.html` et `politique-confidentialite.html` :
   - Forme juridique (SRL / personne physique)
   - N° d'entreprise (BCE)
   - N° TVA
   - Responsable de la publication
   - Représentant légal (politique-confidentialite.html)

### 🟡 Priorité moyenne — à faire après mise en ligne réelle

5. **Vraies photos** — remplacer les 4 placeholders dans `assets/` :
   - `placeholder-about-gens.{jpg,webp}` → photo salle principale / ambiance / clientèle
   - `placeholder-biere.{jpg,webp}` → photo bière belge pression
   - `placeholder-cafe.{jpg,webp}` → photo café/cappuccino terrasse
   - `placeholder-vins.{jpg,webp}` → photo verre de vin / cave

   Workflow : ajouter les nouveaux JPG, puis pour chacun :
   ```bash
   cwebp -q 82 -metadata all photo-XX.jpg -o photo-XX.webp
   ```

   **Bonus SEO** : injecter les métadonnées IPTC (Creator, Copyright) via `exiftool` pour rich results Google Images.

6. **Google API Key** pour activer le monitoring Core Web Vitals réel :
   - Créer une clé sur https://console.cloud.google.com/apis/credentials
   - Activer les APIs : PageSpeed Insights API + CrUX API
   - Sauvegarder dans `~/.config/claude-seo/google-api.json`
   - Permettra `python3 claude-seo-main/scripts/pagespeed_check.py <url>` et `crux_history.py`

7. **Google Search Console** — verifier le domaine + soumettre `sitemap.xml`

8. **Inscriptions plateformes locales** (cœur du local SEO, en dehors du HTML) :
   - **Google Business Profile** : claim / optimisation (catégorie primaire "Restaurant" + secondaires "Bar", "Cocktail Bar")
   - **Apple Business Connect** : claim sur https://businessconnect.apple.com (27% d'usage iOS — Apple Maps)
   - **Bing Places** : claim sur https://www.bingplaces.com (alimente ChatGPT, Copilot, Alexa)
   - **TripAdvisor**, **TheFork** : claim
   - **Soumission data aggregators** : Data Axle, Foursquare, Neustar

### 🟢 Priorité basse — v2 éventuelle

9. **Favicon mark simplifié** — un design "R" rose sur cercle vert pour favicon lisible à 16×16 (voir section "Favicon — limite connue")
10. **Page dédiée "Privatisation / Groupes"** — pour ranker sur "privatiser bar Bruxelles" (casse le one-page, choix produit)
11. **Section avis Google** intégrée à la homepage avec widget tiers ou statique
12. **Évènements** — quand des concerts/afterworks réguliers sont publiés, ajouter un schema `Event` par occurrence

---

*Dernière mise à jour : 2026-05-20 (LCP optimisé < 2.5s médiane sur 5 runs, srcset responsive WebP 600w/1200w, preload as=image, fonts async, noindex preview Vercel temporaire)*
