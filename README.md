<div align="center">

# 📚 NextRead

**Organise ta bibliothèque personnelle, ne perds plus le fil de tes lectures.**

Une application locale, colorée et ludique pour suivre les livres lus / à lire (informatique, échecs, développement personnel...), prioriser selon ton centre d'intérêt du moment, et te motiver à lire davantage.

</div>

---

## ✨ Fonctionnalités

- **Bibliothèque visuelle** - chaque livre est une couverture colorée par catégorie, organisée en grille
- **Suivi de statut** - à lire → en cours → lu, en un clic
- **Focus de lecture** - choisis ta catégorie du moment, l'appli adapte ses recommandations
- **Prochain livre à lire** - calculé automatiquement (focus + priorité), mis en avant sur le tableau de bord
- **Priorité en étoiles** - note chaque livre de 1 à 5 ⭐
- **Petites célébrations** - un toast 🎉 à chaque livre terminé, pour entretenir la motivation
- **Tableau de bord** - compteurs (à lire / en cours / lus cette année) en un coup d'œil

## 🛠️ Stack technique

| Côté | Techno |
|---|---|
| Backend | Spring Boot 3.2 (Java 17, Maven), Spring Data JPA |
| Base de données | H2 en fichier local (`~/nextread-data/nextread`) — aucun serveur à gérer |
| Frontend | Angular 17 (standalone components), design system maison (pas de framework CSS) |
| Polices | Fredoka (titres) + Nunito (texte), Google Fonts |

## 🚀 Démarrage rapide

```bash
./start.sh
```

| Service | URL |
|---|---|
| Frontend | http://localhost:4209 |
| Backend (API) | http://localhost:8089 |
| Console H2 | http://localhost:8089/h2-console (JDBC : `jdbc:h2:file:~/nextread-data/nextread`) |

## 🧑‍💻 Démarrage manuel

```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend (dans un autre terminal)
cd frontend && npm install && npm start
```

## 📂 Structure du projet

```
nextread/
├── backend/   # API Spring Boot (REST, JPA, H2)
├── frontend/  # Application Angular (standalone components)
└── start.sh   # Lance les deux serveurs en parallèle
```

## 🗺️ Pistes d'évolution

- Scan ISBN / récupération automatique des couvertures
- Statistiques de lecture avancées (rythme, séries, pages)
- Recommandations basées sur l'historique de lecture

## 💾 Données

Les données sont stockées **localement uniquement** dans un fichier H2 (`~/nextread-data/nextread.mv.db`). Elles persistent entre les redémarrages, sans dépendance à un serveur de base de données externe.

---

<div align="center">

Projet personnel de Riadh MNASRI - Tech Lead Freelance

</div>
