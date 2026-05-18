# Health-Shield — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/health-shield/api`

---

## Users

### Get all users
```
GET /users
```
**Response:** lista di tutti gli utenti

---

### Get single user
```
GET /users/{id}
```
**Esempio:** `GET /users/1`

---

### Create user
```
POST /users
Content-Type: application/json

{
  "firstName": "Sara",
  "lastName": "Martini",
  "email": "sara.martini@email.it",
  "birthDate": "1995-04-20",
  "password": "hashed_password"
}
```

---

### Update user
```
PUT /users/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /users/1
Content-Type: application/json

{ "email": "nuova.email@email.it" }
```

---

### Delete user
```
DELETE /users/1
```

---

## Medications

### Get all medications
```
GET /medications
```

---

### Get single medication
```
GET /medications/{id}
```
**Esempio:** `GET /medications/2`

---

### Filter medications
```
GET /medications?category=Antibiotico
GET /medications?prescriptionRequired=true
GET /medications?form=Compressa
```

---

### Create medication
```
POST /medications
Content-Type: application/json

{
  "name": "Brufen",
  "activeIngredient": "Ibuprofene",
  "category": "Antinfiammatorio",
  "dosage": "400mg",
  "form": "Compressa",
  "prescriptionRequired": false
}
```

---

### Update medication
```
PUT /medications/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /medications/1
Content-Type: application/json

{ "prescriptionRequired": true }
```

---

### Delete medication
```
DELETE /medications/1
```

---

## Therapies

### Get all therapies
```
GET /therapies
```

---

### Get single therapy
```
GET /therapies/{id}
```
**Esempio:** `GET /therapies/1`

---

### Filter therapies
```
GET /therapies?userId=1
GET /therapies?medicationId=3
GET /therapies?active=true
GET /therapies?userId=1&active=true
```

---

### Create therapy
```
POST /therapies
Content-Type: application/json

{
  "userId": 1,
  "medicationId": 2,
  "medicationName": "Tachipirina",
  "dose": "1 compressa",
  "frequency": "ogni 8 ore",
  "schedule": ["08:00", "14:00", "20:00"],
  "startDate": "2026-05-15",
  "endDate": "2026-05-22",
  "notes": "Solo se febbre > 38°",
  "active": true
}
```

---

### Update therapy
```
PUT /therapies/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /therapies/1
Content-Type: application/json

{ "active": false }
```

---

### Delete therapy
```
DELETE /therapies/1
```

---

## Intakes

### Get all intakes
```
GET /intakes
```

---

### Get single intake
```
GET /intakes/{id}
```
**Esempio:** `GET /intakes/3`

---

### Filter intakes
```
GET /intakes?userId=1
GET /intakes?therapyId=2
GET /intakes?status=assunta
GET /intakes?userId=1&status=saltata
```

---

### Log an intake
```
POST /intakes
Content-Type: application/json

{
  "therapyId": 1,
  "userId": 1,
  "medicationId": 3,
  "scheduledAt": "2026-05-16T08:00:00",
  "takenAt": "2026-05-16T08:10:00",
  "status": "assunta"
}
```
**Valori status:** `assunta` | `saltata` | `in attesa`

---

### Update intake
```
PATCH /intakes/1
Content-Type: application/json

{ "status": "saltata", "takenAt": null }
```

---

### Delete intake
```
DELETE /intakes/1
```

---

## Facilities

### Get all facilities
```
GET /facilities
```

---

### Get single facility
```
GET /facilities/{id}
```
**Esempio:** `GET /facilities/3`

---

### Filter facilities
```
GET /facilities?type=farmacia
GET /facilities?type=ospedale
GET /facilities?isOpen=true
```

---

### Create facility
```
POST /facilities
Content-Type: application/json

{
  "type": "farmacia",
  "name": "Farmacia Brera",
  "address": "Via Brera 10, Milano",
  "lat": 45.4724,
  "lng": 9.1861,
  "phone": "02 1111111",
  "email": "info@farmaciabrera.it",
  "openingHours": {
    "monday": "08:30-19:30",
    "tuesday": "08:30-19:30",
    "wednesday": "08:30-19:30",
    "thursday": "08:30-19:30",
    "friday": "08:30-19:30",
    "saturday": "09:00-13:00",
    "sunday": "chiuso"
  },
  "services": ["Misurazione pressione"],
  "isOpen": true
}
```

---

### Update facility
```
PUT /facilities/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /facilities/1
Content-Type: application/json

{ "isOpen": false }
```

---

### Delete facility
```
DELETE /facilities/1
```

---

## Availability

### Get all availability records
```
GET /availability
```

---

### Get single record
```
GET /availability/{id}
```
**Esempio:** `GET /availability/1`

---

### Filter availability
```
GET /availability?pharmacyId=1
GET /availability?medicationId=2
GET /availability?available=true
GET /availability?pharmacyId=1&medicationId=2
```

---

### Create availability record
```
POST /availability
Content-Type: application/json

{
  "pharmacyId": 2,
  "medicationId": 4,
  "available": true,
  "quantity": 10
}
```

---

### Update availability
```
PATCH /availability/1
Content-Type: application/json

{ "available": false, "quantity": 0 }
```

---

### Delete availability record
```
DELETE /availability/1
```

---

## Appointments

### Get all appointments
```
GET /appointments
```

---

### Get single appointment
```
GET /appointments/{id}
```
**Esempio:** `GET /appointments/2`

---

### Filter appointments
```
GET /appointments?userId=1
GET /appointments?facilityId=3
GET /appointments?status=confermato
GET /appointments?userId=1&status=confermato
```

---

### Create appointment
```
POST /appointments
Content-Type: application/json

{
  "userId": 2,
  "facilityId": 4,
  "type": "Visita neurologica",
  "date": "2026-06-10",
  "time": "14:00",
  "doctor": "Dr. Paolo Ricci",
  "notes": "Portare esami precedenti",
  "status": "in attesa"
}
```
**Valori status:** `in attesa` | `confermato` | `completato` | `annullato`

---

### Update appointment
```
PUT /appointments/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /appointments/1
Content-Type: application/json

{ "status": "annullato" }
```

---

### Delete appointment
```
DELETE /appointments/1
```

---

## Wellness Plans

### Get all wellness plans
```
GET /wellness_plans
```

---

### Get single wellness plan
```
GET /wellness_plans/{id}
```
**Esempio:** `GET /wellness_plans/1`

---

### Filter wellness plans
```
GET /wellness_plans?userId=1
GET /wellness_plans?category=dieta
GET /wellness_plans?active=true
GET /wellness_plans?userId=1&category=esercizio
```

---

### Create wellness plan
```
POST /wellness_plans
Content-Type: application/json

{
  "userId": 2,
  "title": "Piano di meditazione quotidiana",
  "category": "benessere mentale",
  "description": "10 minuti di meditazione ogni mattina",
  "activities": [
    { "day": "ogni giorno", "activity": "Meditazione 10 min", "completed": false }
  ],
  "createdAt": "2026-05-15",
  "active": true
}
```

---

### Update wellness plan
```
PUT /wellness_plans/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /wellness_plans/1
Content-Type: application/json

{ "active": false }
```

---

### Delete wellness plan
```
DELETE /wellness_plans/1
```

---

## Health Tips

### Get all health tips
```
GET /health_tips
```

---

### Get single health tip
```
GET /health_tips/{id}
```
**Esempio:** `GET /health_tips/1`

---

### Filter health tips
```
GET /health_tips?userId=1
GET /health_tips?category=monitoraggio
GET /health_tips?userId=3&category=terapia
```

---

### Create health tip
```
POST /health_tips
Content-Type: application/json

{
  "userId": 2,
  "title": "Riposa almeno 8 ore",
  "body": "Il riposo adeguato supporta il sistema immunitario durante la terapia antibiotica.",
  "category": "stile di vita",
  "createdAt": "2026-05-15"
}
```

---

### Update health tip
```
PUT /health_tips/1
Content-Type: application/json

{ ...oggetto completo aggiornato... }
```

```
PATCH /health_tips/1
Content-Type: application/json

{ "category": "terapia" }
```

---

### Delete health tip
```
DELETE /health_tips/1
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- I filtri si combinano con `&`: `?userId=1&active=true`
- Ordinamento: `?_sort=date&_order=desc`
- Paginazione: `?_page=1&_limit=10`
- Le risorse `availability` e `wellness_plans` usano l'underscore nell'URL (`/wellness_plans`, `/health_tips`)
