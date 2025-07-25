# End2EndGuardClient

<!-- Language Navigator -->
<p align="right">
  <b>Languages:</b>
  <a href="#en">EN</a> |
  <a href="#es">ES</a> |
  <a href="#fr">FR</a>
</p>

---

<a id="en"></a>
## 🌍 English

End2EndGuardClient is a secure note-taking Angular application that demonstrates end-to-end encryption, user authentication, and versioned note management. This client communicates with a .NET backend API and is designed for privacy and usability.

---

## Business Logic & Features

### 1. User Authentication
- **Login/Register:** Users must register and log in to access their notes. JWT tokens are used for authentication and are stored in local storage.
- **Session Management:** The app checks for a valid token on startup and redirects to login if not authenticated.

### 2. Notes Management
- **Create Note:** Users can create new notes. Each note requires a title and content.
- **Edit Note:** Users can edit existing notes. The editor loads the note by its numeric ID from the route.
- **Delete Note:** Users can delete notes. Deletion is confirmed via a dialog.
- **View Note:** Users can view a single note in detail.
- **List Notes:** The dashboard displays all notes for the logged-in user in a responsive grid.

### 3. Note Versioning
- Every time a note is updated, a new version is created and stored in the backend. This allows for future extension to view note history.

### 4. End-to-End Encryption
- **Content Encryption:** All note content is encrypted before being sent to the backend and decrypted on the client after retrieval.
- **Transport Security:** All API requests use HTTPS and include the JWT token for authentication.
- **ID Handling:** Note IDs are passed as plain numbers in URLs and API calls for reliability and to avoid encoding issues.

### 5. Error Handling & UX
- **Loading States:** Spinners are shown during API calls.
- **Error States:** User-friendly error messages are displayed for failed operations.
- **Optimistic UI:** The notes list refreshes automatically after create, update, or delete actions.

---

## How It Works

### Routing
- `/login` and `/register`: Authentication screens.
- `/notes`: Main dashboard showing all notes.
- `/notes/new`: Create a new note.
- `/notes/:id`: View a single note.
- `/notes/:id/edit`: Edit an existing note.

### Data Flow
- **Authentication:** On login/register, the JWT token is saved and attached to all API requests.
- **CRUD Operations:** All note operations (create, read, update, delete) are performed via the `ApiService`, which handles encryption/decryption and HTTP communication.
- **State Management:** The app uses RxJS Observables for notes lists and Angular Reactive Forms for note editing.

### Security
- **No Sensitive Data in URLs:** Only numeric IDs are used in routes; note content is never exposed.
- **Encryption:** All note content is encrypted using AES before being sent to the backend. Decryption happens only on the client.
- **Authorization:** The backend validates the JWT token and ensures users can only access their own notes.

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://github.com/angular/angular-cli) (v20+)
- The backend API running (see backend README for setup)

### Running the Development Server

```bash
ng serve
```

Navigate to [http://localhost:4200/](http://localhost:4200/). The app will reload if you change any source files.

### Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

See all schematics:

```bash
ng generate --help
```

### Building

Build the project:

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

### Running Unit Tests

Run unit tests with [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Running End-to-End Tests

For e2e testing:

```bash
ng e2e
```

You may need to set up an e2e framework (e.g., Cypress or Protractor).

---

## File Structure

- `src/app/components/`: Angular components (notes list, editor, view, auth, etc.)
- `src/app/services/`: API and encryption services
- `src/app/models/`: TypeScript interfaces for data models
- `src/environments/`: Environment configuration

---

## Extending the App

- **Note Version History:** The backend stores all versions; you can add a UI to browse previous versions.
- **Search & Filter:** Add search functionality to the notes list.
- **Rich Text:** Extend the editor for rich text or markdown support.
- **Sharing:** Implement note sharing with other users (requires backend support).

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Docs](https://angular.dev/)
- [RxJS Documentation](https://rxjs.dev/)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<a id="es"></a>
## 🌍 Español

End2EndGuardClient es una aplicación Angular segura para tomar notas que demuestra cifrado de extremo a extremo, autenticación de usuarios y gestión de versiones de notas. Este cliente se comunica con una API backend de .NET y está diseñado para privacidad y usabilidad.

---

## Lógica de Negocio y Características

### 1. Autenticación de Usuario
- **Login/Register:** Los usuarios deben registrarse e iniciar sesión para acceder a sus notas. Los tokens JWT se usan para autenticación y se almacenan en localStorage.
- **Gestión de Sesiones:** La aplicación verifica un token válido al inicio y redirige al login si no está autenticado.

### 2. Gestión de Notas
- **Crear Nota:** Los usuarios pueden crear nuevas notas. Cada nota requiere un título y contenido.
- **Editar Nota:** Los usuarios pueden editar notas existentes. El editor carga la nota por su ID numérico desde la ruta.
- **Eliminar Nota:** Los usuarios pueden eliminar notas. La eliminación se confirma mediante un diálogo.
- **Ver Nota:** Los usuarios pueden ver una nota en detalle.
- **Listar Notas:** El dashboard muestra todas las notas del usuario autenticado en una cuadrícula responsiva.

### 3. Versionado de Notas
- Cada vez que se actualiza una nota, se crea y almacena una nueva versión en el backend. Esto permite extensión futura para ver el historial de notas.

### 4. Cifrado de Extremo a Extremo
- **Cifrado de Contenido:** Todo el contenido de las notas se cifra antes de enviarse al backend y se descifra en el cliente después de la recuperación.
- **Seguridad de Transporte:** Todas las peticiones API usan HTTPS e incluyen el token JWT para autenticación.
- **Manejo de ID:** Los IDs de las notas se pasan como números simples en URLs y llamadas API para confiabilidad y evitar problemas de codificación.

### 5. Manejo de Errores y UX
- **Estados de Carga:** Se muestran spinners durante las llamadas API.
- **Estados de Error:** Se muestran mensajes de error amigables para operaciones fallidas.
- **UI Optimista:** La lista de notas se actualiza automáticamente después de acciones de crear, actualizar o eliminar.

---

## Cómo Funciona

### Enrutamiento
- `/login` y `/register`: Pantallas de autenticación.
- `/notes`: Dashboard principal que muestra todas las notas.
- `/notes/new`: Crear una nueva nota.
- `/notes/:id`: Ver una nota individual.
- `/notes/:id/edit`: Editar una nota existente.

### Flujo de Datos
- **Autenticación:** En login/register, el token JWT se guarda y se adjunta a todas las peticiones API.
- **Operaciones CRUD:** Todas las operaciones de notas (crear, leer, actualizar, eliminar) se realizan a través del `ApiService`, que maneja cifrado/descifrado y comunicación HTTP.
- **Gestión de Estado:** La aplicación usa RxJS Observables para listas de notas y Angular Reactive Forms para edición de notas.

### Seguridad
- **No Datos Sensibles en URLs:** Solo se usan IDs numéricos en rutas; el contenido de las notas nunca se expone.
- **Cifrado:** Todo el contenido de las notas se cifra usando AES antes de enviarse al backend. El descifrado ocurre solo en el cliente.
- **Autorización:** El backend valida el token JWT y asegura que los usuarios solo puedan acceder a sus propias notas.

---

## Desarrollo

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- [Angular CLI](https://github.com/angular/angular-cli) (v20+)
- La API backend ejecutándose (ver README del backend para configuración)

### Ejecutar el Servidor de Desarrollo

```bash
ng serve
```

Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará si cambias algún archivo fuente.

### Scaffolding de Código

Generar un nuevo componente:

```bash
ng generate component component-name
```

Ver todos los esquemas:

```bash
ng generate --help
```

### Construcción

Construir el proyecto:

```bash
ng build
```

Los artefactos de construcción se almacenan en el directorio `dist/`.

### Ejecutar Pruebas Unitarias

Ejecutar pruebas unitarias con [Karma](https://karma-runner.github.io):

```bash
ng test
```

### Ejecutar Pruebas End-to-End

Para pruebas e2e:

```bash
ng e2e
```

Puede que necesites configurar un framework e2e (ej., Cypress o Protractor).

---

## Estructura de Archivos

- `src/app/components/`: Componentes Angular (lista de notas, editor, vista, auth, etc.)
- `src/app/services/`: Servicios de API y cifrado
- `src/app/models/`: Interfaces TypeScript para modelos de datos
- `src/environments/`: Configuración de entorno

---

## Extender la Aplicación

- **Historial de Versiones de Notas:** El backend almacena todas las versiones; puedes agregar una UI para navegar versiones anteriores.
- **Búsqueda y Filtro:** Agregar funcionalidad de búsqueda a la lista de notas.
- **Texto Enriquecido:** Extender el editor para soporte de texto enriquecido o markdown.
- **Compartir:** Implementar compartir notas con otros usuarios (requiere soporte del backend).

---

## Recursos Adicionales

- [Documentación Angular CLI](https://angular.dev/tools/cli)
- [Documentación Oficial de Angular](https://angular.dev/)
- [Documentación RxJS](https://rxjs.dev/)

---

<a id="fr"></a>
## 🌍 Français

End2EndGuardClient est une application Angular sécurisée de prise de notes qui démontre le chiffrement de bout en bout, l'authentification des utilisateurs et la gestion versionnée des notes. Ce client communique avec une API backend .NET et est conçu pour la confidentialité et l'utilisabilité.

---

## Logique Métier et Fonctionnalités

### 1. Authentification Utilisateur
- **Login/Register :** Les utilisateurs doivent s'inscrire et se connecter pour accéder à leurs notes. Les tokens JWT sont utilisés pour l'authentification et stockés dans localStorage.
- **Gestion de Session :** L'application vérifie un token valide au démarrage et redirige vers la connexion si non authentifié.

### 2. Gestion des Notes
- **Créer une Note :** Les utilisateurs peuvent créer de nouvelles notes. Chaque note nécessite un titre et du contenu.
- **Modifier une Note :** Les utilisateurs peuvent modifier des notes existantes. L'éditeur charge la note par son ID numérique depuis la route.
- **Supprimer une Note :** Les utilisateurs peuvent supprimer des notes. La suppression est confirmée via un dialogue.
- **Voir une Note :** Les utilisateurs peuvent voir une note en détail.
- **Lister les Notes :** Le tableau de bord affiche toutes les notes de l'utilisateur connecté dans une grille responsive.

### 3. Versioning des Notes
- Chaque fois qu'une note est mise à jour, une nouvelle version est créée et stockée dans le backend. Cela permet une extension future pour voir l'historique des notes.

### 4. Chiffrement de Bout en Bout
- **Chiffrement du Contenu :** Tout le contenu des notes est chiffré avant d'être envoyé au backend et déchiffré sur le client après récupération.
- **Sécurité du Transport :** Toutes les requêtes API utilisent HTTPS et incluent le token JWT pour l'authentification.
- **Gestion des ID :** Les IDs des notes sont passés comme nombres simples dans les URLs et appels API pour la fiabilité et éviter les problèmes d'encodage.

### 5. Gestion d'Erreurs et UX
- **États de Chargement :** Des spinners sont affichés pendant les appels API.
- **États d'Erreur :** Des messages d'erreur conviviaux sont affichés pour les opérations échouées.
- **UI Optimiste :** La liste des notes se rafraîchit automatiquement après les actions de création, mise à jour ou suppression.

---

## Comment Ça Fonctionne

### Routage
- `/login` et `/register` : Écrans d'authentification.
- `/notes` : Tableau de bord principal montrant toutes les notes.
- `/notes/new` : Créer une nouvelle note.
- `/notes/:id` : Voir une note individuelle.
- `/notes/:id/edit` : Modifier une note existante.

### Flux de Données
- **Authentification :** Lors du login/register, le token JWT est sauvegardé et attaché à toutes les requêtes API.
- **Opérations CRUD :** Toutes les opérations de notes (créer, lire, mettre à jour, supprimer) sont effectuées via l'`ApiService`, qui gère le chiffrement/déchiffrement et la communication HTTP.
- **Gestion d'État :** L'application utilise les RxJS Observables pour les listes de notes et Angular Reactive Forms pour l'édition de notes.

### Sécurité
- **Pas de Données Sensibles dans les URLs :** Seuls les IDs numériques sont utilisés dans les routes ; le contenu des notes n'est jamais exposé.
- **Chiffrement :** Tout le contenu des notes est chiffré avec AES avant d'être envoyé au backend. Le déchiffrement se produit uniquement sur le client.
- **Autorisation :** Le backend valide le token JWT et s'assure que les utilisateurs ne peuvent accéder qu'à leurs propres notes.

---

## Développement

### Prérequis

- [Node.js](https://nodejs.org/) (v18+ recommandé)
- [Angular CLI](https://github.com/angular/angular-cli) (v20+)
- L'API backend en cours d'exécution (voir le README du backend pour la configuration)

### Exécuter le Serveur de Développement

```bash
ng serve
```

Naviguez vers [http://localhost:4200/](http://localhost:4200/). L'application se rechargera si vous modifiez des fichiers source.

### Scaffolding de Code

Générer un nouveau composant :

```bash
ng generate component component-name
```

Voir tous les schémas :

```bash
ng generate --help
```

### Construction

Construire le projet :

```bash
ng build
```

Les artefacts de construction sont stockés dans le répertoire `dist/`.

### Exécuter les Tests Unitaires

Exécuter les tests unitaires avec [Karma](https://karma-runner.github.io) :

```bash
ng test
```

### Exécuter les Tests End-to-End

Pour les tests e2e :

```bash
ng e2e
```

Vous pourriez avoir besoin de configurer un framework e2e (par ex., Cypress ou Protractor).

---

## Structure des Fichiers

- `src/app/components/` : Composants Angular (liste de notes, éditeur, vue, auth, etc.)
- `src/app/services/` : Services API et de chiffrement
- `src/app/models/` : Interfaces TypeScript pour les modèles de données
- `src/environments/` : Configuration d'environnement

---

## Étendre l'Application

- **Historique des Versions de Notes :** Le backend stocke toutes les versions ; vous pouvez ajouter une UI pour naviguer dans les versions précédentes.
- **Recherche et Filtre :** Ajouter une fonctionnalité de recherche à la liste des notes.
- **Texte Riche :** Étendre l'éditeur pour le support de texte riche ou markdown.
- **Partage :** Implémenter le partage de notes avec d'autres utilisateurs (nécessite le support du backend).

---

## Ressources Supplémentaires

- [Documentation Angular CLI](https://angular.dev/tools/cli)
- [Documentation Officielle Angular](https://angular.dev/)
- [Documentation RxJS](https://rxjs.dev/)

---

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.
