# GradeUp — API Documentation

**Base URL:** `https://mock-api-server-production-7f5d.up.railway.app/grade-up/api`

---

## Users (Studenti)

### Get all users
```
GET /users
```

### Get single user
```
GET /users/{id}
```
Restituisce dati profilo, livello, punti totali/settimanali, media voti, streak, badge count, statistiche quiz.

### Filter users
```
GET /users?schoolId=1
GET /users?classYear=3&classSection=B
GET /users?level=campione
GET /users?email=mirko.borra@student.edu
```

### Create user (registrazione)
```
POST /users
Content-Type: application/json

{
  "firstName": "Nome",
  "lastName": "Cognome",
  "username": "NomeUtente",
  "email": "email@student.edu",
  "password": "hashed_password",
  "birthDate": "2008-01-01",
  "schoolId": 1,
  "classYear": 3,
  "classSection": "B",
  "academicYear": "2025/26",
  "level": "novellino",
  "levelId": 1,
  "totalPoints": 0,
  "weeklyPoints": 0,
  "weeklyProgress": 0,
  "gradeAverage": 0,
  "improvementScore": 0,
  "consistencyStreak": 0,
  "totalGrades": 0,
  "badgeCount": 0,
  "quizCount": 0,
  "quizPoints": 0,
  "quizAccuracy": 0,
  "quizLevel": 1,
  "rankGlobal": null,
  "rankClass": null,
  "joinedAt": "2026-05-18"
}
```

### Update user
```
PATCH /users/{id}
Content-Type: application/json

{ "totalPoints": 1500, "level": "esperto", "levelId": 4 }
{ "weeklyPoints": 192, "weeklyProgress": 66 }
{ "quizCount": 49, "quizPoints": 350, "quizAccuracy": 83 }
{ "consistencyStreak": 8, "badgeCount": 5 }
```

### Delete user
```
DELETE /users/{id}
```

---

## Schools (Scuole)

### Get all schools
```
GET /schools
```

### Get single school
```
GET /schools/{id}
```

### Filter
```
GET /schools?city=Milano
GET /schools?gradeUpEnabled=true
```

---

## Subjects (Materie)

### Get all subjects
```
GET /subjects
```

### Get single subject
```
GET /subjects/{id}
```

Materie disponibili con i colori del design:

| id | name | color |
|---|---|---|
| 1 | Matematica | `#A855F7` (viola) |
| 2 | Italiano | `#FB923C` (arancione) |
| 3 | Scienze | `#D1D5DB` (grigio) |
| 4 | Fisica | `#F472B6` (rosa) |
| 5 | Arte | `#4ADE80` (verde) |
| 6 | Latino | `#60A5FA` (azzurro) |
| 7 | Filosofia | `#FDE047` (giallo) |
| 8 | Educazione Motoria | `#F87171` (rosso) |

---

## Grades (Voti)

### Get all grades
```
GET /grades
```

### Filter per studente, materia o quadrimestre
```
GET /grades?userId=3
GET /grades?subjectId=1
GET /grades?userId=3&subjectId=2
GET /grades?userId=3&semester=2
GET /grades?userId=3&_sort=date&_order=desc
```

### Get single grade
```
GET /grades/{id}
```

### Create grade
```
POST /grades
Content-Type: application/json

{
  "userId": 3,
  "subjectId": 1,
  "value": 8,
  "type": "Verifica scritta",
  "notes": "Ottima gestione del tempo",
  "date": "2026-05-18",
  "trend": 0.5,
  "semester": 2
}
```

Valori di `type`: `"Verifica scritta"`, `"Interrogazione"`, `"Compito"`, `"Compito a casa"`, `"Test"`, `"Test rapido"`, `"Quiz online"`, `"Tema"`.

Il campo `trend` indica la variazione rispetto al voto precedente nella stessa materia (es. `+0.5`, `-1.5`, `0`).

### Update grade
```
PATCH /grades/{id}
Content-Type: application/json

{ "value": 9, "trend": 1.0 }
```

### Delete grade
```
DELETE /grades/{id}
```

---

## Levels (Livelli)

### Get all levels
```
GET /levels
```

### Get single level
```
GET /levels/{id}
```

### Filter
```
GET /levels?slug=esperto
```

| id | slug | name | Punti richiesti |
|---|---|---|---|
| 1 | novellino | Novellino | 0 – 99 |
| 2 | principiante | Principiante | 100 – 499 |
| 3 | studioso | Studioso | 500 – 999 |
| 4 | esperto | Esperto | 1000 – 1999 |
| 5 | campione | Campione | 2000+ |

---

## Badges (Catalogo Badge)

### Get all badges
```
GET /badges
```

### Get single badge
```
GET /badges/{id}
```

### Filter per categoria o stato di blocco
```
GET /badges?category=quiz
GET /badges?category=costanza
GET /badges?category=materia
GET /badges?category=classifica
GET /badges?category=voti
GET /badges?category=speciale
GET /badges?locked=false
```

Badge disponibili nel design:

| id | name | condition | category |
|---|---|---|---|
| 1 | Prima Luce | 1° accesso | speciale |
| 2 | Studioso | 7gg streak | costanza |
| 3 | Top 10% | Top 10% Matematica | classifica |
| 4 | Velocista | Quiz 30s | quiz |
| 5 | Genio | Tutti 10 in una materia | quiz |
| 6 | Esperto | 100 quiz completati | quiz |
| 7 | Precisione | Correttezza ≥ 90% in una materia | materia |
| 8 | Costanza | 14gg quiz streak | costanza |
| 9 | Eccellenza | Media ≥ 9 per un quadrimestre | voti |
| 10 | Velocità | 10 quiz veloci | quiz |

---

## User Badges (Badge guadagnati)

### Get badge di uno studente
```
GET /user_badges?userId=3
GET /user_badges?userId=3&_sort=earnedAt&_order=desc
```

### Get single user badge
```
GET /user_badges/{id}
```

### Assegna badge
```
POST /user_badges
Content-Type: application/json

{
  "userId": 3,
  "badgeId": 4,
  "badgeName": "Velocista",
  "earnedAt": "2026-05-18"
}
```

### Delete user badge
```
DELETE /user_badges/{id}
```

---

## Quizzes (Catalogo Quiz)

### Get all quizzes
```
GET /quizzes
```

### Filter per materia o difficoltà
```
GET /quizzes?subjectId=1
GET /quizzes?subjectName=Matematica
GET /quizzes?difficulty=Facile
GET /quizzes?difficulty=Media
GET /quizzes?difficulty=Difficile
GET /quizzes?available=true
GET /quizzes?subjectId=1&difficulty=Media
```

### Get single quiz
```
GET /quizzes/{id}
```

### Cerca per titolo
```
GET /quizzes?title_like=equazioni
```

### Create quiz
```
POST /quizzes
Content-Type: application/json

{
  "title": "Titolo Quiz",
  "subjectId": 1,
  "subjectName": "Matematica",
  "questionCount": 10,
  "difficulty": "Media",
  "estimatedMinutes": 8,
  "pointsOnCompletion": 40,
  "description": "Descrizione del quiz",
  "available": true
}
```

### Update quiz
```
PATCH /quizzes/{id}
Content-Type: application/json

{ "available": false }
```

---

## Quiz Attempts (Tentativi Quiz)

### Get tentativi di uno studente
```
GET /quiz_attempts?userId=3
GET /quiz_attempts?userId=3&_sort=completedAt&_order=desc
GET /quiz_attempts?userId=3&subjectId=1
GET /quiz_attempts?quizId=5
```

### Get single attempt
```
GET /quiz_attempts/{id}
```

### Create attempt (al completamento del quiz)
```
POST /quiz_attempts
Content-Type: application/json

{
  "userId": 3,
  "quizId": 1,
  "quizTitle": "Equazioni di 2° grado",
  "subjectId": 1,
  "score": 12,
  "correctAnswers": 12,
  "totalQuestions": 15,
  "percentage": 80,
  "pointsEarned": 40,
  "timeSeconds": 480,
  "completedAt": "2026-05-18"
}
```

---

## User Subjects (Statistiche per materia)

Ogni record rappresenta la performance di uno studente in una specifica materia: media voti, punti accumulati, livello materia e avanzamento quiz.

### Get statistiche per uno studente
```
GET /user_subjects?userId=3
```

### Get statistiche di una materia specifica per uno studente
```
GET /user_subjects?userId=3&subjectId=2
```

### Get tutti gli studenti in una materia
```
GET /user_subjects?subjectId=1&_sort=average&_order=desc
```

### Get single record
```
GET /user_subjects/{id}
```

### Create record
```
POST /user_subjects
Content-Type: application/json

{
  "userId": 3,
  "subjectId": 5,
  "subjectName": "Arte",
  "average": 0,
  "subjectPoints": 0,
  "subjectLevel": 1,
  "subjectLevelName": "Base",
  "quizCompleted": 0,
  "quizTotal": 10
}
```

### Update statistiche materia
```
PATCH /user_subjects/{id}
Content-Type: application/json

{ "average": 7.8, "subjectPoints": 360, "quizCompleted": 15 }
{ "subjectLevel": 3, "subjectLevelName": "Studente Avanzato" }
```

---

## Weekly Rewards (Premi Settimanali)

### Get all weekly rewards
```
GET /weekly_rewards
```

### Get single reward
```
GET /weekly_rewards/{id}
```

Premi settimanali disponibili:

| id | title | pointsReward |
|---|---|---|
| 1 | Top della settimana | +50 pt |
| 2 | 5 quiz completati | +20 pt |
| 3 | Media sopra 8 | +15 pt |
| 4 | Streak 7 giorni | +30 pt |

---

## Upcoming Events (Prossimi eventi)

### Get eventi di uno studente
```
GET /upcoming_events?userId=3
GET /upcoming_events?userId=3&_sort=scheduledFor&_order=asc
GET /upcoming_events?userId=3&type=quiz
GET /upcoming_events?userId=3&type=verifica
```

Valori di `type`: `"quiz"`, `"verifica"`, `"interrogazione"`, `"compito"`.

### Get single event
```
GET /upcoming_events/{id}
```

### Create event
```
POST /upcoming_events
Content-Type: application/json

{
  "userId": 3,
  "title": "Verifica Scienze",
  "subjectId": 3,
  "subjectName": "Scienze",
  "type": "verifica",
  "scheduledFor": "2026-05-25",
  "scheduledLabel": "25 Mag"
}
```

### Update event
```
PATCH /upcoming_events/{id}
Content-Type: application/json

{ "scheduledFor": "2026-05-26", "scheduledLabel": "26 Mag" }
```

### Delete event
```
DELETE /upcoming_events/{id}
```

---

## Rewards (Premi)

### Get all rewards
```
GET /rewards?available=true
GET /rewards?category=scolastico
GET /rewards?category=formativo
GET /rewards?category=viaggi
GET /rewards?featured=true
GET /rewards?minLevelId=4
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
  "category": "formativo",
  "description": "Descrizione del premio",
  "pointsRequired": 700,
  "minLevel": "studioso",
  "minLevelId": 3,
  "available": true,
  "totalSlots": 10,
  "claimedSlots": 0,
  "expiresAt": "2026-12-31",
  "provider": "Nome Sponsor",
  "featured": false
}
```

### Update reward
```
PATCH /rewards/{id}
Content-Type: application/json

{ "available": false }
{ "claimedSlots": 3 }
```

---

## Reward Claims (Richieste Premio)

### Get richieste di uno studente
```
GET /reward_claims?userId=3
GET /reward_claims?userId=3&status=approvato
```

Valori di `status`: `"in_attesa"`, `"approvato"`, `"rifiutato"`.

### Create richiesta
```
POST /reward_claims
Content-Type: application/json

{
  "userId": 3,
  "rewardId": 4,
  "rewardTitle": "Corso Udemy a scelta",
  "category": "formativo",
  "pointsSpent": 600,
  "status": "in_attesa",
  "claimedAt": "2026-05-18",
  "approvedAt": null,
  "notes": null
}
```

### Update stato richiesta
```
PATCH /reward_claims/{id}
Content-Type: application/json

{ "status": "approvato", "approvedAt": "2026-05-20" }
```

---

## Notifications (Notifiche)

### Get notifiche di uno studente
```
GET /notifications?userId=3
GET /notifications?userId=3&read=false
GET /notifications?userId=3&_sort=createdAt&_order=desc
```

Valori di `type`: `"badge"`, `"level_up"`, `"reward"`, `"quiz"`, `"weekly"`, `"grade"`.

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
  "userId": 3,
  "type": "badge",
  "title": "Badge sbloccato!",
  "message": "Hai guadagnato il badge Velocista!",
  "read": false,
  "createdAt": "2026-05-18"
}
```

---

## Combinazioni per pagina

### Home (Dashboard)
```
GET /users/{id}                                                     → punti, livello, streak, weeklyProgress
GET /upcoming_events?userId={id}&_sort=scheduledFor&_order=asc      → Prossimi Quiz
GET /user_subjects?userId={id}                                      → Le tue Materie (card colorate)
GET /notifications?userId={id}&read=false                           → notifiche non lette
```

### Pagina Quiz
```
GET /quizzes?available=true                                         → Quiz Disponibili
GET /quizzes?subjectId={id}                                         → filtro per materia
GET /quizzes?difficulty=Media                                       → filtro per difficoltà
GET /quiz_attempts?userId={id}&_sort=completedAt&_order=desc&_limit=1 → Ultimo Tentativo
GET /users?_sort=weeklyPoints&_order=desc&_limit=3                  → Classifica Settimanale (top 3)
GET /users/{id}                                                     → stats quiz (quizCount, quizPoints, quizAccuracy, quizLevel)
```

### Pagina Materia (dettaglio singola materia)
```
GET /user_subjects?userId={id}&subjectId={id}                       → media, puntiMateria, livello, quizCompletati
GET /grades?userId={id}&subjectId={id}&_sort=date&_order=desc       → Voti Recenti (con trend e note)
GET /badges?category=materia                                        → Badge Disponibili per la materia
```

### Pagina Badge
```
GET /users/{id}                                                     → totalPoints, badgeCount, levelId, weeklyProgress
GET /user_badges?userId={id}                                        → badge già ottenuti
GET /badges                                                         → Badge Speciali (tutti, per mostrare locked/unlocked)
GET /weekly_rewards                                                 → Premi Settimanali
```

### Pagina Profilo
```
GET /users/{id}                                                     → dati anagrafici, punti, badge, quiz
GET /grades?userId={id}&_sort=date&_order=desc&_limit=6             → Ultime Valutazioni (con trend)
GET /user_badges?userId={id}&_limit=4                               → Badge Ottenuti (preview)
```

---

## Note

- `GET /risorsa` restituisce sempre un array
- `GET /risorsa/{id}` restituisce un singolo oggetto o `404` se non trovato
- Filtri combinabili con `&`: `?userId=3&subjectId=1`
- Ordinamento: `?_sort=date&_order=desc`
- Paginazione: `?_page=1&_limit=10`
- Ricerca parziale: `?title_like=equazioni` (case-insensitive)
- Il campo `trend` sui voti è la variazione rispetto al voto precedente della stessa materia (calcolato lato client o inserito manualmente)
- `weeklyProgress` è un valore 0–100 che rappresenta il progresso settimanale dell'utente
- Il `quizLevel` (1–5) è il livello quiz indipendente dal livello generale dell'utente
