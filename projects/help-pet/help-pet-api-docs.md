# Help-Pet — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/help-pet/api`

---

## Shelters

### Get all shelters
```
GET /shelters
```
**Response:** lista di tutti i rifugi

---

### Get single shelter
```
GET /shelters/{id}
```
**Esempio:** `GET /shelters/IT01`

---

### Filter shelters
```
GET /shelters?città=Torino
GET /shelters?disponibilità=affido
```

---

### Create shelter
```
POST /shelters
Content-Type: application/json

{
  "id": "IT06",
  "nome": "Rifugio del Sole",
  "città": "Napoli",
  "via": "Via Toledo 22",
  "distanza": 600,
  "contatto": "081 123 4567",
  "disponibilità": ["adozione"]
}
```

---

### Update shelter
```
PUT /shelters/IT01
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /shelters/IT01
Content-Type: application/json

{ "contatto": "011 000 1111" }
```

---

### Delete shelter
```
DELETE /shelters/IT01
```

---

## Animals

### Get all animals
```
GET /animals
```

---

### Get single animal
```
GET /animals/{id}
```
**Esempio:** `GET /animals/3`

---

### Filter animals
```
GET /animals?tipo=cane
GET /animals?canile=IT02
GET /animals?tipo=gatto&canile=IT03
```

---

### Create animal
```
POST /animals
Content-Type: application/json

{
  "nome": "Birba",
  "tipo": "cane",
  "anni": 3,
  "canile": "IT01",
  "foto": "https://images.dog.ceo/breeds/..."
}
```

---

### Update animal
```
PUT /animals/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /animals/1
Content-Type: application/json

{ "canile": "IT03" }
```

---

### Delete animal
```
DELETE /animals/1
```

---

## Missing

### Get all missing animals
```
GET /missing
```

---

### Get single missing animal
```
GET /missing/{id}
```
**Esempio:** `GET /missing/2`

---

### Filter missing animals
```
GET /missing?tipo=cane
GET /missing?tipo=gatto
```

---

### Report missing animal
```
POST /missing
Content-Type: application/json

{
  "nome": "Pippo",
  "tipo": "cane",
  "anni": 3,
  "foto": "https://images.dog.ceo/breeds/...",
  "descrizione": "golden retriever, pelo lungo, con collare rosso",
  "ultimaPosizione": "Via Rossi, Torino",
  "contatto": "+39 333 000 1111",
  "dataSegnalazione": "2026-05-15"
}
```

---

### Update missing report
```
PUT /missing/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /missing/1
Content-Type: application/json

{ "ultimaPosizione": "Via Verdi, Torino" }
```

---

### Delete missing report
```
DELETE /missing/1
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- I filtri si combinano con `&`: `?tipo=cane&canile=IT01`
- Ordinamento: `?_sort=anni&_order=asc`
- Paginazione: `?_page=1&_limit=10`
