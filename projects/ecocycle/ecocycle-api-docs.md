# EcoCycle — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/ecocycle/api`

---

## Users (Utenti)

### Get all users
```
GET /users
```

### Get single user
```
GET /users/{id}
```
Restituisce profilo, ruolo, punti, livello e preferenze di riciclo.

### Filter users
```
GET /users?role=eco-hero
GET /users?role=operator
GET /users?role=admin
GET /users?email=stefan.codneau@email.com
```

Valori di `role`: `"eco-pilot"`, `"eco-hero"`, `"ecobuddy"`, `"admin"`, `"operator"`.

### Create user (registrazione)
```
POST /users
Content-Type: application/json

{
  "firstName": "Nome",
  "lastName": "Cognome",
  "username": "nomeutente",
  "email": "email@email.com",
  "password": "hashed_password",
  "phone": "+39 333 0000000",
  "birthDate": "2000-01-01",
  "country": "Italia",
  "role": "eco-pilot",
  "points": 0,
  "level": 1,
  "levelName": "Eco Pilot",
  "ecoPreferences": ["Plastica", "Vetro"],
  "notifications": true,
  "joinedAt": "2026-05-18"
}
```

Valori di `ecoPreferences`: `"Plastica"`, `"Vetro"`, `"Organico"`, `"Indifferenziato"`, `"Abbigliamento"`, `"Elettronica"`, `"Altro"`.

### Update user
```
PATCH /users/{id}
Content-Type: application/json

{ "points": 2900, "level": 4 }
{ "role": "eco-hero" }
{ "ecoPreferences": ["Plastica", "Organico"] }
{ "notifications": false }
```

### Delete user
```
DELETE /users/{id}
```

---

## Bins (Cassonetti)

### Get all bins
```
GET /bins
```

### Get single bin
```
GET /bins/{id}
```

### Filter per zona, tipo o stato
```
GET /bins?zone=Centro
GET /bins?type=Plastica
GET /bins?type=Vetro
GET /bins?type=Organico
GET /bins?type=Indifferenziato
GET /bins?status=critico
GET /bins?status=quasi_pieno
GET /bins?status=normale
GET /bins?status=in_manutenzione
GET /bins?isActive=true
GET /bins?zone=Centro&type=Plastica
GET /bins?status=critico&isActive=true
```

Valori di `status`: `"normale"`, `"quasi_pieno"`, `"critico"`, `"in_manutenzione"`, `"fuori_servizio"`.

### Filter per capacità (cassonetti da svuotare)
```
GET /bins?capacity_gte=75
GET /bins?_sort=capacity&_order=desc
GET /bins?_sort=capacity&_order=desc&_limit=5
```

### Sort e paginazione
```
GET /bins?_sort=capacity&_order=desc
GET /bins?_sort=temperature&_order=desc
GET /bins?_page=1&_limit=10
```

### Create bin
```
POST /bins
Content-Type: application/json

{
  "code": "EC-013",
  "type": "Plastica",
  "address": "Via Manzoni 10",
  "city": "Milano",
  "zone": "Brera",
  "lat": 45.4710,
  "lng": 9.1880,
  "capacity": 0,
  "temperature": 20.0,
  "status": "normale",
  "lastEmptied": "2026-05-18",
  "nextMaintenance": "2026-07-01",
  "isActive": true
}
```

### Update bin (aggiorna capacità / stato)
```
PATCH /bins/{id}
Content-Type: application/json

{ "capacity": 85, "status": "critico" }
{ "temperature": 29.5 }
{ "lastEmptied": "2026-05-18", "capacity": 5, "status": "normale" }
{ "isActive": false, "status": "in_manutenzione" }
```

### Delete bin
```
DELETE /bins/{id}
```

**Struttura bin:**
| Campo | Significato |
|---|---|
| `code` | Codice identificativo (es. EC-001) |
| `type` | Tipo rifiuto: Plastica, Vetro, Organico, Indifferenziato |
| `capacity` | Percentuale di riempimento (0–100) |
| `temperature` | Temperatura interna in °C |
| `status` | Stato operativo del cassonetto |
| `lastEmptied` | Data dell'ultimo svuotamento |
| `nextMaintenance` | Data prossima manutenzione pianificata |
| `isActive` | `false` se fuori servizio o in riparazione |

---

## Reports (Segnalazioni)

### Get all reports
```
GET /reports
```

### Filter per utente, cassonetto o stato
```
GET /reports?userId=1
GET /reports?binId=4
GET /reports?status=in_attesa
GET /reports?status=in_lavorazione
GET /reports?status=risolto
GET /reports?userId=1&_sort=createdAt&_order=desc
```

Valori di `status`: `"in_attesa"`, `"in_lavorazione"`, `"risolto"`, `"chiuso"`.

### Get single report
```
GET /reports/{id}
```

### Create report (segnala un problema)
```
POST /reports
Content-Type: application/json

{
  "userId": 1,
  "binId": 4,
  "binCode": "EC-004",
  "type": "Cassonetto stracolmo",
  "description": "Il cassonetto trabocca.",
  "photoUrl": null,
  "position": "Via Roma 12, Milano",
  "status": "in_attesa",
  "assignedTo": null,
  "createdAt": "2026-05-18",
  "resolvedAt": null
}
```

Valori di `type`: `"Cassonetto danneggiato"`, `"Cassonetto stracolmo"`, `"Odore gas / fumo"`, `"Cassonetto fuori uso"`, `"Cassonetto quasi pieno"`.

### Update report (assegna / risolvi)
```
PATCH /reports/{id}
Content-Type: application/json

{ "status": "in_lavorazione", "assignedTo": 6 }
{ "status": "risolto", "resolvedAt": "2026-05-19" }
```

---

## Rewards (Premi)

### Get all rewards
```
GET /rewards?available=true
GET /rewards?category=spesa
GET /rewards?category=trasporti
GET /rewards?category=natura
GET /rewards?category=gadget
GET /rewards?category=shopping
GET /rewards?category=cultura
GET /rewards?featured=true
GET /rewards?_sort=pointsRequired&_order=asc
```

### Get single reward
```
GET /rewards/{id}
```

### Create reward
```
POST /rewards
Content-Type: application/json

{
  "title": "Titolo Premio",
  "description": "Descrizione",
  "pointsRequired": 500,
  "category": "spesa",
  "available": true,
  "totalSlots": 50,
  "claimedSlots": 0,
  "expiresAt": "2026-12-31",
  "provider": "Nome Partner",
  "featured": false
}
```

### Update reward
```
PATCH /rewards/{id}
Content-Type: application/json

{ "available": false }
{ "claimedSlots": 35 }
```

---

## User Rewards (Premi riscattati)

### Get premi di un utente
```
GET /user_rewards?userId=1
GET /user_rewards?userId=1&status=consegnato
GET /user_rewards?userId=1&_sort=claimedAt&_order=desc
```

Valori di `status`: `"in_attesa"`, `"consegnato"`.

### Get single user reward
```
GET /user_rewards/{id}
```

### Riscatta un premio
```
POST /user_rewards
Content-Type: application/json

{
  "userId": 1,
  "rewardId": 1,
  "rewardTitle": "Buono Esselunga 5€",
  "pointsSpent": 500,
  "status": "in_attesa",
  "claimedAt": "2026-05-18",
  "deliveredAt": null
}
```

### Update stato consegna
```
PATCH /user_rewards/{id}
Content-Type: application/json

{ "status": "consegnato", "deliveredAt": "2026-05-20" }
```

---

## Weekly Stats (Statistiche settimanali)

### Get statistiche per zona e settimana
```
GET /weekly_stats?zone=Centro
GET /weekly_stats?week=2026-W18
GET /weekly_stats?zone=Centro&week=2026-W18
GET /weekly_stats?zone=Centro&_sort=week&_order=desc
GET /weekly_stats?_sort=avgCapacity&_order=desc
```

Il campo `week` usa il formato ISO `YYYY-Www` (es. `2026-W18`).

### Get single stat
```
GET /weekly_stats/{id}
```

### Create stat
```
POST /weekly_stats
Content-Type: application/json

{
  "binId": null,
  "zone": "Centro",
  "week": "2026-W19",
  "plastica": 40,
  "vetro": 68,
  "organico": 55,
  "indifferenziato": 77,
  "avgCapacity": 60,
  "avgTemperature": 25.0,
  "collectionsCount": 7
}
```

---

## Maintenance (Manutenzioni)

### Get all maintenance
```
GET /maintenance
```

### Filter per cassonetto, stato o tecnico
```
GET /maintenance?binId=11
GET /maintenance?status=pianificata
GET /maintenance?status=in_corso
GET /maintenance?status=completata
GET /maintenance?technicianId=6
GET /maintenance?_sort=scheduledFor&_order=asc
```

Valori di `status`: `"pianificata"`, `"in_corso"`, `"completata"`, `"annullata"`.

Valori di `type`: `"Manutenzione ordinaria"`, `"Riparazione"`, `"Riparazione sensore"`, `"Svuotamento"`, `"Svuotamento urgente"`.

### Get single maintenance
```
GET /maintenance/{id}
```

### Create manutenzione
```
POST /maintenance
Content-Type: application/json

{
  "binId": 4,
  "binCode": "EC-004",
  "type": "Svuotamento urgente",
  "description": "Cassonetto critico.",
  "scheduledFor": "2026-05-19",
  "status": "pianificata",
  "technicianName": "Roberto Sala",
  "technicianId": 6,
  "completedAt": null,
  "notes": null
}
```

### Update manutenzione
```
PATCH /maintenance/{id}
Content-Type: application/json

{ "status": "in_corso" }
{ "status": "completata", "completedAt": "2026-05-19", "notes": "Completato." }
```

---

## Collections (Raccolte)

### Get all collections
```
GET /collections
```

### Filter per cassonetto, tipo o operatore
```
GET /collections?binId=1
GET /collections?type=Plastica
GET /collections?zone=Centro
GET /collections?operatorId=6
GET /collections?_sort=collectedAt&_order=desc
GET /collections?zone=Centro&_sort=collectedAt&_order=desc
```

### Get single collection
```
GET /collections/{id}
```

### Create raccolta (registra svuotamento)
```
POST /collections
Content-Type: application/json

{
  "binId": 7,
  "binCode": "EC-007",
  "type": "Organico",
  "zone": "Duomo",
  "amountKg": 55.0,
  "operatorId": 6,
  "collectedAt": "2026-05-18"
}
```

---

## Dashboard Stats (Statistiche Admin)

### Get statistiche globali
```
GET /dashboard_stats
GET /dashboard_stats/1
```

### Update statistiche
```
PATCH /dashboard_stats/1
Content-Type: application/json

{ "avgCapacity": 70, "criticalBins": 3, "updatedAt": "2026-05-18" }
```

---

## Notifications (Notifiche)

### Get notifiche di un utente
```
GET /notifications?userId=1
GET /notifications?userId=1&read=false
GET /notifications?userId=1&type=alert
GET /notifications?userId=1&_sort=createdAt&_order=desc
```

Valori di `type`: `"alert"`, `"report"`, `"reward"`, `"points"`.

### Segna come letta
```
PATCH /notifications/{id}
Content-Type: application/json

{ "read": true }
```

### Create notifica
```
POST /notifications
Content-Type: application/json

{
  "userId": 6,
  "type": "alert",
  "title": "Cassonetto critico",
  "message": "EC-007 ha raggiunto il 92%.",
  "read": false,
  "createdAt": "2026-05-18"
}
```

---

## Combinazioni per pagina

### Home mobile (mappa cassonetti vicini)
```
GET /bins?isActive=true                                      → tutti i cassonetti attivi con posizione
GET /bins?zone=Centro&isActive=true                          → filtro per zona
GET /bins?type=Plastica                                      → filtro per tipo
GET /bins?status=critico                                     → cassonetti critici da evidenziare
```

### Dashboard utente mobile (I miei punti)
```
GET /users/{id}                                              → punti, livello, nome
GET /rewards?available=true&_limit=3                         → premi disponibili (preview)
GET /weekly_stats?zone=Centro&_sort=week&_order=desc&_limit=4 → andamento settimanale
GET /bins?zone=Centro                                        → capacità cassonetti vicini (media)
GET /notifications?userId={id}&read=false                    → notifiche non lette
```

### Pagina Capacità (mobile)
```
GET /bins?zone=Centro&isActive=true                          → capacità per tipo (Plastica, Vetro, Organico, Indiff.)
GET /weekly_stats?zone=Centro&_sort=week&_order=desc&_limit=6 → grafico andamento settimanale
```

### Segnala un problema (mobile)
```
GET /bins?isActive=true                                      → lista cassonetti selezionabili
POST /reports                                                → invia segnalazione
PATCH /users/{id}                                            → aggiorna punti utente (+50 per segnalazione)
```

### Profilo utente (mobile)
```
GET /users/{id}                                              → dati profilo
GET /user_rewards?userId={id}                                → storico premi
GET /reports?userId={id}&_sort=createdAt&_order=desc         → segnalazioni inviate
```

### Premi (mobile)
```
GET /rewards?available=true                                  → tutti i premi disponibili
GET /rewards?featured=true                                   → premi in evidenza
GET /users/{id}                                              → punti utente per verificare idoneità
GET /user_rewards?userId={id}                                → premi già riscattati
POST /user_rewards                                           → riscatta un premio
PATCH /users/{id}                                            → scala i punti usati
```

### Dashboard Admin (web)
```
GET /dashboard_stats/1                                       → riepilogo numerico (totale, avgCapacity, critici)
GET /bins?isActive=true                                      → tutti i cassonetti per la mappa
GET /bins?status=critico                                     → cassonetti critici (lista laterale)
GET /maintenance?status=pianificata&_sort=scheduledFor&_order=asc → manutenzioni programmate
GET /collections?_sort=collectedAt&_order=desc&_limit=10     → ultime raccolte
GET /weekly_stats?_sort=week&_order=desc&_limit=5            → grafico andamento
```

### Gestione cassonetti (Admin)
```
GET /bins?_sort=capacity&_order=desc                         → tutti ordinati per riempimento
GET /bins?zone=Centro                                        → filtro per zona
GET /bins?status=critico                                     → solo critici
GET /bins?type=Organico                                      → per tipo
PATCH /bins/{id}                                             → aggiorna stato / capacità
```

### Gestione segnalazioni (Admin / Operatore)
```
GET /reports?status=in_attesa                                → nuove segnalazioni
GET /reports?status=in_lavorazione                           → in gestione
GET /reports?assignedTo={operatorId}                         → segnalazioni di un operatore
PATCH /reports/{id}                                          → aggiorna stato / assegna operatore
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- Filtri combinabili con `&`: `?zone=Centro&type=Plastica`
- Ordinamento: `?_sort=capacity&_order=desc`
- Paginazione: `?_page=1&_limit=10`
- La `capacity` è una percentuale (0–100); un cassonetto è considerato **critico** quando supera **80%**
- Lo `status` del bin va aggiornato manualmente via PATCH quando cambia la `capacity`
- Dopo ogni raccolta (`POST /collections`) aggiornare anche il bin: `capacity` → 5–10%, `lastEmptied` → oggi, `status` → `"normale"`
- I punti utente vanno scalati manualmente via `PATCH /users/{id}` al momento del riscatto premio
