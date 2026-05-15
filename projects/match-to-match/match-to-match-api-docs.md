# Match to Match — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/match-to-match`

---

## Users

### Get all users
```
GET /users
```

### Get single user (profilo dettaglio)
```
GET /users/{id}
```
Restituisce tutti i dati del profilo: info personali, attività, rating, matchCount.

### Filter users
```
GET /users?city=Torino
GET /users?activities_like=16
```

### Create user
```
POST /users
Content-Type: application/json

{
  "firstName": "Nome",
  "lastName": "Cognome",
  "email": "email@email.it",
  "password": "hashed_password",
  "avatar": "https://...",
  "age": 25,
  "city": "Torino",
  "bio": "Breve descrizione",
  "activities": [1, 3, 14],
  "joinedAt": "2026-05-15",
  "rating": 0,
  "matchCount": 0
}
```

### Update user
```
PATCH /users/{id}
Content-Type: application/json

{ "bio": "Nuova bio", "city": "Milano" }
```

### Delete user
```
DELETE /users/{id}
```

---

## Categories

### Get all categories
```
GET /categories
```

### Get single category
```
GET /categories/{id}
```

---

## Activities

### Get all activities
```
GET /activities
```

### Filter by category
```
GET /activities?categoryId=1
GET /activities?categoryId=5
```

### Get single activity
```
GET /activities/{id}
```

---

## Match Requests

Gestisce le richieste di match (swipe accetta/rifiuta).

### Get all requests
```
GET /match_requests
```

### Filter by user e stato
```
GET /match_requests?fromUserId=1
GET /match_requests?toUserId=1
GET /match_requests?toUserId=1&status=pending
GET /match_requests?fromUserId=1&status=accepted
```

### Create request (swipe)
```
POST /match_requests
Content-Type: application/json

{
  "fromUserId": 1,
  "toUserId": 7,
  "status": "pending",
  "createdAt": "2026-05-15"
}
```

### Update request (accetta o rifiuta)
```
PATCH /match_requests/{id}
Content-Type: application/json

{ "status": "accepted" }
```
```
PATCH /match_requests/{id}
Content-Type: application/json

{ "status": "rejected" }
```

---

## Matches

Partite/incontri confermati tra due utenti.

### Get all matches
```
GET /matches
```

### Get single match
```
GET /matches/{id}
```

### Filter matches (per calendario)
```
GET /matches?user1Id=1
GET /matches?user2Id=1
GET /matches?date=2026-05-18
GET /matches?status=confirmed
```

### Create match
```
POST /matches
Content-Type: application/json

{
  "user1Id": 1,
  "user2Id": 4,
  "activityId": 3,
  "date": "2026-05-25",
  "time": "18:00",
  "location": "Campo Sportivo, Torino",
  "status": "confirmed",
  "notes": ""
}
```

### Update match
```
PATCH /matches/{id}
Content-Type: application/json

{ "status": "cancelled" }
```

### Delete match
```
DELETE /matches/{id}
```

---

## Reviews

### Get all reviews
```
GET /reviews
```

### Filter reviews
```
GET /reviews?toUserId=1
GET /reviews?fromUserId=2
GET /reviews?matchId=3
```

### Create review
```
POST /reviews
Content-Type: application/json

{
  "matchId": 1,
  "fromUserId": 2,
  "toUserId": 1,
  "rating": 5,
  "comment": "Ottima esperienza!",
  "createdAt": "2026-05-15"
}
```

### Delete review
```
DELETE /reviews/{id}
```

---

## Pagina Profilo Utente

Per costruire la pagina dettaglio di un utente, combina queste chiamate:

```
GET /users/{id}                            → dati profilo
GET /activities                            → per mostrare le attività per nome
GET /reviews?toUserId={id}                → recensioni ricevute
GET /matches?user1Id={id}                 → match come organizzatore
GET /matches?user2Id={id}                 → match come partecipante
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- Filtri combinabili con `&`
- Ordinamento: `?_sort=date&_order=asc`
- Paginazione: `?_page=1&_limit=10`
