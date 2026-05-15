# GameBuster — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/gamebuster`

---

## Plans (Abbonamenti)

### Get all plans
```
GET /plans
```

### Get single plan
```
GET /plans/{id}
```

Valori di `id`: `1` = Standard, `2` = Premium, `3` = Ultra.

---

## Users

### Get all users
```
GET /users
```

### Get single user
```
GET /users/{id}
```
Restituisce dati profilo, piano attivo, riepilogo attività (`totalOrders`, `wishlistCount`, `activeSales`, `tradeInCredit`).

### Filter users
```
GET /users?email=mario.rossi@email.com
GET /users?subscriptionPlan=ultra
```

### Create user (registrazione)
```
POST /users
Content-Type: application/json

{
  "firstName": "Nome",
  "lastName": "Cognome",
  "username": "NomeUtente",
  "email": "email@email.com",
  "password": "hashed_password",
  "birthDate": "1995-06-15",
  "shippingAddress": "Via ...",
  "subscriptionPlan": "standard",
  "subscriptionRenewal": null,
  "joinedAt": "2026-05-15",
  "totalOrders": 0,
  "wishlistCount": 0,
  "activeSales": 0,
  "tradeInCredit": 0
}
```

### Update user (profilo / cambio piano)
```
PATCH /users/{id}
Content-Type: application/json

{ "shippingAddress": "Nuovo indirizzo" }
{ "subscriptionPlan": "ultra", "subscriptionRenewal": "2026-06-15" }
```

### Delete user
```
DELETE /users/{id}
```

---

## Games (Catalogo E-Commerce)

### Get all games
```
GET /games
```

### Get single game
```
GET /games/{id}
```

### Filter per piattaforma, genere, formato
```
GET /games?platform=PS5
GET /games?platform=Xbox Series X
GET /games?platform=Nintendo Switch 2
GET /games?platform=PC
GET /games?genre=RPG
GET /games?genre=Sport
GET /games?featured=true
GET /games?heroFeatured=true
GET /games?platform=PS5&genre=FPS
```

### Cerca per titolo
```
GET /games?title_like=Shadow
GET /games?title_like=dragon
```

### Giochi con cloud gaming disponibile
```
GET /games?cloudPlan=premium
GET /games?cloudPlan=ultra
```

### Sort e paginazione
```
GET /games?_sort=rating&_order=desc
GET /games?_sort=priceFisico&_order=asc
GET /games?_page=1&_limit=12
GET /games?platform=PS5&_page=1&_limit=12
```

### Create game
```
POST /games
Content-Type: application/json

{
  "title": "Titolo Gioco",
  "platform": "PS5",
  "genre": "Azione",
  "studio": "Studio Name",
  "formats": ["Fisico", "Digitale"],
  "priceFisico": 59.99,
  "priceDigitale": 49.99,
  "priceUsed": 34.99,
  "priceBundle": null,
  "featured": false,
  "heroFeatured": false,
  "description": "Descrizione del gioco...",
  "releaseDate": "2025-06-01",
  "rating": 0,
  "reviewCount": 0,
  "cloudPlan": null
}
```

### Update game
```
PATCH /games/{id}
Content-Type: application/json

{ "featured": true }
```

### Delete game
```
DELETE /games/{id}
```

**Struttura prezzi:**
| Campo | Significato |
|---|---|
| `priceFisico` | Prezzo versione fisica nuova |
| `priceDigitale` | Prezzo chiave digitale |
| `priceUsed` | Prezzo versione fisica usata |
| `priceBundle` | Prezzo Bundle/Collector (null se non disponibile) |
| `cloudPlan` | Piano richiesto per giocare in cloud (`null`, `"premium"`, `"ultra"`) |

---

## Cloud Games (Libreria Cloud Gaming)

### Get all cloud games
```
GET /cloud_games
```

### Filter per piano
```
GET /cloud_games?plan=premium
GET /cloud_games?plan=ultra
```
Utenti Premium vedono `plan=premium`. Utenti Ultra vedono tutto (`plan=premium` + `plan=ultra`).

### Get single cloud game
```
GET /cloud_games/{id}
```

---

## Reviews (Recensioni)

### Get all reviews
```
GET /reviews
```

### Filter per gioco o utente
```
GET /reviews?gameId=1
GET /reviews?userId=2
```

### Get single review
```
GET /reviews/{id}
```

### Create review
```
POST /reviews
Content-Type: application/json

{
  "gameId": 1,
  "userId": 1,
  "username": "MarioR",
  "rating": 5,
  "comment": "Gioco fantastico!",
  "createdAt": "2026-05-15"
}
```

### Delete review
```
DELETE /reviews/{id}
```

---

## Orders (Ordini)

### Get all orders
```
GET /orders
```

### Filter per utente
```
GET /orders?userId=1
GET /orders?userId=1&status=consegnato
GET /orders?userId=1&_sort=createdAt&_order=desc
```

Valori di `status`: `"consegnato"`, `"in spedizione"`, `"in elaborazione"`, `"annullato"`.

### Get single order
```
GET /orders/{id}
```

### Create order (checkout)
```
POST /orders
Content-Type: application/json

{
  "userId": 1,
  "items": [
    { "gameId": 1, "title": "Shadow Realm: Awakening", "format": "Digitale", "condition": "Nuovo", "price": 59.99 }
  ],
  "subtotal": 59.99,
  "discount": 6.00,
  "total": 53.99,
  "shippingAddress": "Via Roma 12, Milano",
  "paymentMethod": "Carta di credito",
  "status": "in elaborazione",
  "createdAt": "2026-05-15"
}
```

### Update order status
```
PATCH /orders/{id}
Content-Type: application/json

{ "status": "annullato" }
```

---

## Cart Items (Carrello)

### Get cart items per utente
```
GET /cart_items?userId=1
```

### Add item to cart
```
POST /cart_items
Content-Type: application/json

{
  "userId": 1,
  "gameId": 4,
  "title": "Celestial Odyssey",
  "platform": "PS5",
  "format": "Fisico",
  "condition": "Nuovo",
  "price": 69.99,
  "addedAt": "2026-05-15"
}
```

### Update item (cambia formato/condizione)
```
PATCH /cart_items/{id}
Content-Type: application/json

{ "format": "Digitale", "price": 59.99 }
```

### Remove item from cart
```
DELETE /cart_items/{id}
```

**Nota:** Per svuotare il carrello dopo il checkout, eliminare tutti gli item con `DELETE /cart_items/{id}` per ciascun item dell'utente.

---

## Wishlist Items

### Get wishlist per utente
```
GET /wishlist_items?userId=1
```

### Add to wishlist
```
POST /wishlist_items
Content-Type: application/json

{
  "userId": 1,
  "gameId": 5,
  "title": "Iron Fortress",
  "priceFisico": 64.99,
  "addedAt": "2026-05-15"
}
```

### Remove from wishlist
```
DELETE /wishlist_items/{id}
```

---

## Marketplace Listings (Compravendita Utente)

### Get all listings
```
GET /marketplace_listings
```

### Filter per venditore o stato
```
GET /marketplace_listings?sellerId=1
GET /marketplace_listings?sellerId=1&status=attivo
GET /marketplace_listings?status=attivo
GET /marketplace_listings?platform=PS5
```

Valori di `status`: `"attivo"`, `"venduto"`, `"ritirato"`.

### Get single listing
```
GET /marketplace_listings/{id}
```

### Create listing
```
POST /marketplace_listings
Content-Type: application/json

{
  "sellerId": 1,
  "gameId": 7,
  "title": "Chrono Knights",
  "platform": "Nintendo Switch 2",
  "condition": "Usato",
  "price": 30,
  "description": "Condizioni ottime.",
  "status": "attivo",
  "offerCount": 0,
  "hasNewOffer": false,
  "createdAt": "2026-05-15"
}
```

### Update listing (aggiorna prezzo / segna venduto)
```
PATCH /marketplace_listings/{id}
Content-Type: application/json

{ "price": 25 }
{ "status": "venduto" }
{ "offerCount": 3, "hasNewOffer": true }
```

### Delete listing
```
DELETE /marketplace_listings/{id}
```

---

## Trade-in Catalog

Catalogo dei giochi accettati per il trade-in con valore stimato in buoni spesa.

### Cerca nel catalogo trade-in
```
GET /trade_in_catalog
GET /trade_in_catalog?title_like=dragon
GET /trade_in_catalog?platform=PS5
GET /trade_in_catalog?title_like=soccer&platform=PS5
```

### Get single item
```
GET /trade_in_catalog/{id}
```

---

## Trade-in Requests

### Get richieste per utente
```
GET /trade_in_requests?userId=1
GET /trade_in_requests?userId=1&status=completato
```

Valori di `status`: `"in lavorazione"`, `"completato"`, `"rifiutato"`.

### Create trade-in request
```
POST /trade_in_requests
Content-Type: application/json

{
  "userId": 1,
  "catalogItemId": 3,
  "title": "Dragon Legacy",
  "platform": "PS5",
  "condition": "Usato",
  "estimatedValue": 16,
  "status": "in lavorazione",
  "creditApplied": false,
  "createdAt": "2026-05-15"
}
```

### Update request status
```
PATCH /trade_in_requests/{id}
Content-Type: application/json

{ "status": "completato", "creditApplied": true }
```

---

## Reports (Segnalazioni)

### Get all reports
```
GET /reports
```

### Create report
```
POST /reports
Content-Type: application/json

{
  "userId": 1,
  "email": "mario.rossi@email.com",
  "description": "Descrizione del problema (max 100 caratteri)",
  "createdAt": "2026-05-15"
}
```

---

## Combinazioni per pagina

### Home page (ospite)
```
GET /games?featured=true                  → sezione "In evidenza"
GET /plans                                → sezione piani abbonamento
GET /games?heroFeatured=true              → gioco hero in evidenza
```

### Home page (utente loggato)
```
GET /users/{id}                           → dati utente e piano attivo
GET /games?featured=true                  → giochi consigliati
GET /wishlist_items?userId={id}           → la tua wishlist
GET /marketplace_listings?sellerId={id}&status=attivo  → le tue vendite attive
```

### Catalogo giochi (con filtri)
```
GET /games?platform=PS5&_page=1&_limit=12
GET /games?platform=PS5&genre=FPS
GET /games?_sort=rating&_order=desc&_page=1&_limit=12
```

### Scheda prodotto
```
GET /games/{id}                           → dati gioco
GET /reviews?gameId={id}                  → recensioni del gioco
```

### Libreria Cloud Gaming
```
GET /cloud_games                          → tutti i giochi cloud
GET /cloud_games?plan=premium             → solo giochi Premium
GET /cloud_games?plan=ultra               → solo giochi Ultra
```

### Carrello
```
GET /cart_items?userId={id}               → articoli nel carrello
GET /users/{id}                           → piano utente (per calcolare sconti)
```

### Profilo utente
```
GET /users/{id}                           → dati personali e riepilogo attività
GET /orders?userId={id}&_sort=createdAt&_order=desc  → storico ordini
GET /wishlist_items?userId={id}           → wishlist
GET /marketplace_listings?sellerId={id}  → vendite attive e concluse
GET /trade_in_requests?userId={id}        → storico trade-in
```

### Trade-in
```
GET /trade_in_catalog?title_like={query}  → cerca giochi accettati
GET /trade_in_requests?userId={id}        → richieste in corso
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- Filtri combinabili con `&`: `?platform=PS5&genre=FPS`
- Ordinamento: `?_sort=rating&_order=desc`
- Paginazione: `?_page=1&_limit=12`
- Ricerca parziale sul testo: `?title_like=shadow` (case-insensitive)
- Lo sconto Ultra (10%) va applicato lato client sui giochi AAA (`cloudPlan` non null)
