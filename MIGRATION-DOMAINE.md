# 🔴 MIGRATION DOMAINE — Checklist du jour J

> Document de référence à exécuter le jour où ROXI passe de `client-roxi.vercel.app` au domaine custom (ex : `roxi.be`, `roxibar.be`, `roxi-officiel.be`…). Ne rien sauter, ne rien faire dans le désordre.

**Hypothèses** :
- Le domaine custom est enregistré et tu en es propriétaire / admin DNS
- Le compte Vercel est `elieblch` lié au repo `elieblch/client-roxi`
- Tu as accès à Google Search Console et Bing Webmaster Tools (avec le compte email du propriétaire)

**Convention dans ce document** :
- `NOUVEAU-DOMAINE` = à remplacer partout par ton vrai domaine final, **sans `https://` ni `/`** (ex : `roxi.be`)
- Toutes les commandes sont exécutées depuis `/Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi/`

---

## ⏱ Estimation totale : 45-90 min de travail + 24-72h de monitoring

---

## PHASE 0 — Pré-requis (J-1, la veille)

- [ ] **Backup** : copier tout le dossier `Roxi/` ailleurs (zip + cloud)
  ```bash
  cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site
  zip -r "Roxi-backup-pre-migration-$(date +%Y%m%d).zip" Roxi/ -x "Roxi/.git/*"
  ```
- [ ] **Branche git de safety** : créer une branche `pre-migration-backup` pointant sur le commit actuel
  ```bash
  cd Roxi
  git checkout main
  git pull origin main
  git branch pre-migration-backup
  git push origin pre-migration-backup
  ```
- [ ] **Repérer le commit de référence** (à noter ici pour rollback) : `git log -1 --format='%H %s'`
- [ ] **Vérifier la propriété du domaine** : connexion au registrar, accès aux DNS
- [ ] **Préparer les comptes Google** : compte Google associé à ROXI prêt à se connecter à GSC, GBP, Indexing API
- [ ] **Préparer le compte Microsoft** : pour Bing Webmaster Tools (alimente ChatGPT/Copilot)

---

## PHASE 1 — Configuration domaine sur Vercel (5-10 min)

- [ ] Aller sur https://vercel.com/dashboard
- [ ] Sélectionner le projet `client-roxi`
- [ ] **Settings → Domains → Add**
- [ ] Saisir `NOUVEAU-DOMAINE` (et éventuellement `www.NOUVEAU-DOMAINE` en alias)
- [ ] Vercel affiche les enregistrements DNS à créer (A record vers `76.76.21.21` ou CNAME vers `cname.vercel-dns.com`)
- [ ] **Aller chez le registrar** et créer les DNS correspondants
- [ ] Attendre la propagation DNS (5-30 min selon TTL) — Vercel cochera "Valid Configuration"
- [ ] Vercel auto-provisionne le certificat SSL Let's Encrypt (~2 min après validation DNS)
- [ ] **Test** : `curl -I https://NOUVEAU-DOMAINE` → attendu HTTP 200 + cert valide

---

## PHASE 2 — Mise à jour du code (sed, ~5 min)

⚠️ **Faire tous les `sed` dans le même commit pour cohérence**. Vérifier avant de pusher.

- [ ] **Remplacer le domaine partout** (HTML, sitemap, robots.txt, notes projet) :
  ```bash
  cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi
  grep -rln "client-roxi.vercel.app" . \
    --include='*.html' --include='*.xml' --include='*.txt' --include='*.md' \
    | xargs sed -i '' 's|client-roxi.vercel.app|NOUVEAU-DOMAINE|g'
  ```
  Remarque : on retire à la fois `https://client-roxi.vercel.app` et `client-roxi.vercel.app` nu.

- [ ] **Vérifier qu'il ne reste aucune occurrence** :
  ```bash
  grep -rn "client-roxi.vercel.app" . --include='*.html' --include='*.xml' --include='*.txt' --include='*.md'
  # Doit ne rien retourner.
  ```

- [ ] **Vérifier les fichiers touchés** :
  ```bash
  git diff --stat
  # Attendu : index.html, mentions-legales.html, politique-confidentialite.html,
  # robots.txt, sitemap.xml, CLAUDE.md, MIGRATION-DOMAINE.md
  ```

---

## PHASE 3 — Désactiver le `noindex` (5 min)

### 3.1 — Retirer la meta robots des 3 HTML

- [ ] **Une commande sed couvre les 3 fichiers** :
  ```bash
  cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi
  for f in index.html mentions-legales.html politique-confidentialite.html; do
    # Supprime la balise noindex + son commentaire HTML adjacent
    perl -i -0pe 's|<!--[^>]*PROVISOIRE[^>]*-->\s*\n\s*<meta name="robots" content="noindex, nofollow">\s*\n||gs' "$f"
  done
  ```

- [ ] **Vérifier qu'aucune meta robots noindex ne traîne** :
  ```bash
  grep -n 'noindex' *.html
  # Doit ne rien retourner (sauf éventuellement des commentaires inoffensifs).
  ```

- [ ] **Option alternative** : si tu veux garder `mentions-legales.html` et `politique-confidentialite.html` en `noindex` (pratique courante pour les pages légales sans valeur SEO), remplacer dans ces 2 fichiers UNIQUEMENT par `<meta name="robots" content="noindex, follow">`. La home doit absolument être indexable.

### 3.2 — Réécrire le `robots.txt` en version production

- [ ] **Écraser le fichier avec la version production** :
  ```bash
  cat > /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi/robots.txt <<'EOF'
  # robots.txt — ROXI Bar & Restaurant
  # Châtelain, Ixelles · Bruxelles
  # Production · Last updated: [DATE-DU-JOUR]

  # ─── Crawlers de recherche classiques ───
  User-agent: *
  Allow: /

  # ─── AI crawlers : autorisés (citabilité ChatGPT, Claude, Perplexity, Gemini) ───
  # 45% des recommandations locales viennent désormais d'assistants AI.

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

  # ─── Sitemap ───
  Sitemap: https://NOUVEAU-DOMAINE/sitemap.xml
  EOF
  ```
  Puis remplacer `NOUVEAU-DOMAINE` et `[DATE-DU-JOUR]` :
  ```bash
  sed -i '' "s|NOUVEAU-DOMAINE|$NOUVEAU_DOMAINE|g; s|\\[DATE-DU-JOUR\\]|$(date +%Y-%m-%d)|g" robots.txt
  ```

- [ ] **Lire le résultat à l'œil** :
  ```bash
  cat robots.txt
  ```

---

## PHASE 4 — Mise à jour des notes projet (2 min)

- [ ] **CLAUDE.md** : retirer la section "🔴 PRIORITÉ ABSOLUE — LE JOUR DE LA BASCULE DOMAINE" (devenue obsolète) et la section "Domaine canonique (PROVISOIRE)" (le domaine n'est plus provisoire). Mettre à jour la date en bas.
- [ ] **MIGRATION-DOMAINE.md** : ajouter une note en haut → `> ✅ Migration effectuée le [date]. Domaine final : NOUVEAU-DOMAINE. Ce document devient un historique.`

---

## PHASE 5 — Tests locaux avant push (5 min)

- [ ] **Lancer le serveur local** et tester les 3 pages :
  ```bash
  cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi
  python3 -m http.server 8765 &
  SERVER_PID=$!
  sleep 1
  for u in index.html mentions-legales.html politique-confidentialite.html robots.txt sitemap.xml; do
    echo "$u : $(curl -s -o /dev/null -w 'HTTP %{http_code}' http://localhost:8765/$u)"
  done
  kill $SERVER_PID
  ```

- [ ] **Vérifier qu'aucune meta noindex ne subsiste sur index.html** :
  ```bash
  grep -i 'noindex' index.html && echo "⚠ noindex encore présent" || echo "✓ propre"
  ```

- [ ] **Vérifier que les URLs absolues dans le JSON-LD pointent vers le nouveau domaine** :
  ```bash
  grep -E '(href|content|"url"|"@id"|"image")' index.html | grep -iE 'http' | head -20
  ```

---

## PHASE 6 — Commit + push (3 min)

- [ ] **Stage + commit** :
  ```bash
  cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi
  git add -A
  git status
  git commit -m "Migration vers domaine custom NOUVEAU-DOMAINE

  - Domaine canonique passé de client-roxi.vercel.app à NOUVEAU-DOMAINE
    (canonical, og:url, JSON-LD @id/url/image)
  - Retrait du noindex sur index.html (page publiquement indexable)
  - robots.txt remis en mode production (Allow: / + 9 AI crawlers explicites)
  - sitemap.xml URLs migrées"
  ```

- [ ] **Push** (avec buffer http si gros) :
  ```bash
  git -c http.postBuffer=524288000 push origin main
  ```

- [ ] **Attendre 30-60s** que Vercel redéploie

---

## PHASE 7 — Vérifications post-déploiement (10-15 min)

### 7.1 — Tests HTTP

- [ ] **HTTP 200 sur les 5 URLs publiques** :
  ```bash
  for u in / /mentions-legales.html /politique-confidentialite.html /robots.txt /sitemap.xml; do
    echo "$u : $(curl -s -o /dev/null -w 'HTTP %{http_code} · %{time_total}s' -L https://NOUVEAU-DOMAINE$u)"
  done
  ```

- [ ] **HTTPS forcé** : `curl -I http://NOUVEAU-DOMAINE/` doit retourner un 301 vers https.

- [ ] **CLAUDE.md et MIGRATION-DOMAINE.md retournent 404** (`.vercelignore` actif) :
  ```bash
  for f in CLAUDE.md MIGRATION-DOMAINE.md; do
    echo "$f : $(curl -s -o /dev/null -w 'HTTP %{http_code}' https://NOUVEAU-DOMAINE/$f)"
  done
  ```

### 7.2 — Google Rich Results Test

- [ ] Aller sur https://search.google.com/test/rich-results
- [ ] Onglet **"URL"** → saisir `https://NOUVEAU-DOMAINE/`
- [ ] Cliquer "Tester l'URL"
- [ ] **Vérifier que ces 3 entités sont détectées sans erreur** :
  - [ ] `Restaurant` (avec toutes les sous-propriétés)
  - [ ] `Menu`
  - [ ] `WebSite`
- [ ] **0 erreur bloquante** ; warnings facultatifs OK (aggregateRating, sameAs, etc.)

### 7.3 — Lighthouse mobile post-migration

- [ ] **Lancer Lighthouse 3 fois** depuis local :
  ```bash
  for i in 1 2 3; do
    lighthouse https://NOUVEAU-DOMAINE/ \
      --output=json --output-path=/tmp/lh-postmig-$i.json \
      --only-categories=performance,seo,accessibility,best-practices \
      --form-factor=mobile --screenEmulation.disabled \
      --chrome-flags="--headless --no-sandbox" --quiet
  done
  ```
- [ ] **Cibles attendues** (médianes) :
  - Performance ≥ 90 (sur Vercel HTTP/2 + CDN, attendu plus haut qu'en local)
  - **SEO = 100** (le noindex a été retiré, donc remonte à 100)
  - Best Practices ≥ 95
  - Accessibility ≥ 95
  - **LCP < 2,5 s** ✓ (devrait être autour de 1,5-2 s sur Vercel)
  - CLS < 0,1
  - TBT < 200 ms

### 7.4 — Open Graph preview

- [ ] Tester le partage sur https://www.opengraph.xyz/url/https%3A%2F%2FNOUVEAU-DOMAINE/
- [ ] Aperçu Facebook : https://developers.facebook.com/tools/debug/?q=https://NOUVEAU-DOMAINE/ + cliquer "Scrape Again" pour invalider le cache
- [ ] Aperçu LinkedIn : https://www.linkedin.com/post-inspector/inspect/https:%2F%2FNOUVEAU-DOMAINE
- [ ] **Vérifier** que l'image og-image.jpg 1200×630 s'affiche, titre + description OK

---

## PHASE 8 — Référencement Google + Bing (15-20 min)

### 8.1 — Google Search Console

- [ ] https://search.google.com/search-console/ → **Add property** → "URL prefix" → `https://NOUVEAU-DOMAINE/`
- [ ] Vérification : récupérer la balise meta de vérification et l'ajouter dans le `<head>` de `index.html` :
  ```html
  <meta name="google-site-verification" content="VALEUR-DONNEE-PAR-GSC">
  ```
- [ ] Push de la balise (`git add index.html && git commit -m "feat: GSC verification" && git push`)
- [ ] Attendre le redéploiement Vercel, puis cliquer "Verify" dans GSC
- [ ] **Sitemaps → Add a new sitemap** → `sitemap.xml` → Submit
- [ ] **Inspection URL** → coller `https://NOUVEAU-DOMAINE/` → "Test live URL" → "Request indexing"

### 8.2 — Bing Webmaster Tools

- [ ] https://www.bing.com/webmasters → Add a site → `https://NOUVEAU-DOMAINE/`
- [ ] Possibilité d'importer directement depuis Google Search Console (1 clic)
- [ ] Soumettre `sitemap.xml`
- [ ] Bing alimente ChatGPT, Copilot, Alexa → critique pour AI visibility

### 8.3 — Google Business Profile (à part, si pas déjà fait)

- [ ] https://business.google.com → claim "ROXI" (Rue du Bailli 82, Ixelles)
- [ ] Catégorie primaire : **"Restaurant"**
- [ ] Catégories secondaires : "Bar", "Cocktail Bar", "Belgian Restaurant", "Restaurant français"
- [ ] Renseigner les horaires exactes (Lundi-Jeudi 10h30-01h00, Vendredi-Samedi 10h30-02h00, Dimanche 10h30-01h00)
- [ ] Ajouter photos (intérieur, plats, cocktails, façade)
- [ ] Lier le site web : `https://NOUVEAU-DOMAINE/`

### 8.4 — Apple Business Connect

- [ ] https://businessconnect.apple.com → claim ROXI
- [ ] Renseigner NAP + URL site
- [ ] (Atteint Apple Maps + Siri)

---

## PHASE 9 — Monitoring J+1 à J+7 (passif)

### J+1

- [ ] GSC → **Pages → Why pages aren't indexed** : vérifier qu'aucune page n'est en "Excluded by noindex" (si oui, le noindex est encore présent quelque part)
- [ ] GSC → **Page Indexing report** : la home doit apparaître en "Indexed"

### J+2 à J+3

- [ ] Google : `site:NOUVEAU-DOMAINE` → doit retourner au moins la home
- [ ] Test : `roxi bailli` ou `restaurant roxi ixelles` → vérifier si le site apparaît dans la SERP (peut prendre jusqu'à 7-14 jours)
- [ ] Vérifier que l'ancien domaine `client-roxi.vercel.app` ne crée pas de duplicate content : aller sur Vercel Settings → Domains → vérifier qu'il est encore listé ; si oui, **ajouter une redirection 301 vers le nouveau domaine** dans `vercel.json` :
  ```json
  {
    "redirects": [
      {
        "source": "/(.*)",
        "destination": "https://NOUVEAU-DOMAINE/$1",
        "permanent": true,
        "has": [{ "type": "host", "value": "client-roxi.vercel.app" }]
      }
    ]
  }
  ```

### J+7

- [ ] GSC → **Performance** : vérifier les premières impressions
- [ ] CrUX (si plus de 1k visites) : Core Web Vitals terrain via https://pagespeed.web.dev/?url=https://NOUVEAU-DOMAINE/

---

## 🆘 PLAN DE ROLLBACK — si quelque chose casse

### Symptôme A : Site répond 404/500 sur le nouveau domaine

1. Vérifier dans Vercel → Deployments si le dernier build a réussi
2. Si oui : c'est un problème DNS → vérifier les enregistrements chez le registrar
3. Si non : `git revert HEAD && git push` pour rollback au commit précédent

### Symptôme B : Google indexe encore client-roxi.vercel.app (duplicate content)

1. Ajouter la redirection 301 dans `vercel.json` (voir §J+3 ci-dessus)
2. Dans GSC ancien projet : Settings → "Remove URL prefix property" et l'ajouter en mode redirection
3. Attendre 2-4 semaines pour que Google bouge les URLs indexées

### Symptôme C : LCP > 2,5 s en production

1. Vérifier que Vercel sert bien en HTTP/2 + Brotli : `curl -I -H "Accept-Encoding: br" https://NOUVEAU-DOMAINE/photo-cocktail.webp` → attendu `content-encoding: br` + `vary: Accept-Encoding`
2. Vérifier que le `<link rel="preload" as="image">` est toujours dans le `<head>` (`curl -s https://NOUVEAU-DOMAINE/ | grep preload`)
3. Tester depuis pagespeed.web.dev avec un autre point géo (l'edge Vercel le plus proche de toi peut être lent en local)

### Symptôme D : Rollback complet vers la version pre-migration

```bash
cd /Users/user/Desktop/Cours/Travail_Perso/Creation_Site/Roxi
git checkout pre-migration-backup
git push origin pre-migration-backup:main --force-with-lease
```

⚠️ Le `--force-with-lease` push écrase `main` mais préserve les commits intermédiaires si d'autres ont pushé entretemps. **À utiliser SEULEMENT** si tu es certain qu'aucun autre changement n'a été poussé depuis le backup.

Après rollback : aller dans Vercel → Settings → Domains → retirer le nouveau domaine, le site reste sur `client-roxi.vercel.app`.

---

## 📋 Récapitulatif des fichiers modifiés ce jour-là

À la fin de la migration, ces fichiers auront changé par rapport à l'état actuel :

| Fichier | Changement |
|---|---|
| `index.html` | `client-roxi.vercel.app` → nouveau domaine (canonical + OG + JSON-LD), retrait noindex |
| `mentions-legales.html` | Domaine + (optionnel) retrait noindex |
| `politique-confidentialite.html` | Domaine + (optionnel) retrait noindex |
| `robots.txt` | Réécrit en version production (Allow: / + AI crawlers) |
| `sitemap.xml` | URLs migrées |
| `CLAUDE.md` | Sections obsolètes retirées, date mise à jour |
| `MIGRATION-DOMAINE.md` (ce fichier) | Note d'exécution en haut |
| (nouveau) `vercel.json` | Redirection 301 depuis client-roxi.vercel.app (si applicable) |

---

*Document créé le 2026-05-20. À utiliser le jour J et ensuite archiver (mais conserver dans le repo pour traçabilité).*
