# SkillSwap — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/skillswap/api`

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

### Create user
```
POST /users
Content-Type: application/json

{
  "username": "nuovo_utente",
  "firstName": "Nome",
  "lastName": "Cognome",
  "email": "email@email.it",
  "avatar": "https://...",
  "bio": "Descrizione",
  "rating": 0,
  "reviewCount": 0,
  "joinedAt": "2026-05-15"
}
```

### Update user
```
PATCH /users/{id}
Content-Type: application/json

{ "bio": "Nuova bio" }
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

## Subcategories

### Get all subcategories
```
GET /subcategories
```

### Filter by category
```
GET /subcategories?categoryId=1
```
**Esempio:** tutte le sottocategorie di Informatica → `?categoryId=1`

---

## Services

### Get all services
```
GET /services
```

### Get single service
```
GET /services/{id}
```

### Filter services
```
GET /services?categoryId=1
GET /services?subcategoryId=4
GET /services?userId=2
GET /services?categoryId=2&subcategoryId=7
```

### Sort e paginazione
```
GET /services?_sort=rating&_order=desc
GET /services?_page=1&_limit=12
```

### Create service
```
POST /services
Content-Type: application/json

{
  "userId": 1,
  "title": "Titolo del servizio",
  "description": "Descrizione dettagliata...",
  "categoryId": 1,
  "subcategoryId": 4,
  "images": ["https://..."],
  "cerca": ["Arte", "Musica"],
  "rating": 0,
  "reviewCount": 0,
  "createdAt": "2026-05-15"
}
```

### Update service
```
PUT /services/{id}
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /services/{id}
Content-Type: application/json

{ "title": "Nuovo titolo" }
```

### Delete service
```
DELETE /services/{id}
```

---

## Reviews

### Get all reviews
```
GET /reviews
```

### Get single review
```
GET /reviews/{id}
```

### Filter reviews
```
GET /reviews?serviceId=1
GET /reviews?userId=2
```

### Create review
```
POST /reviews
Content-Type: application/json

{
  "serviceId": 1,
  "userId": 3,
  "rating": 5,
  "comment": "Esperienza fantastica!",
  "createdAt": "2026-05-15"
}
```

### Delete review
```
DELETE /reviews/{id}
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- Filtri combinabili con `&`: `?categoryId=1&subcategoryId=4`
- Ordinamento: `?_sort=rating&_order=desc`
- Paginazione: `?_page=1&_limit=12`
