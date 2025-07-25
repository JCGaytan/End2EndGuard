# End2EndGuardApi

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

A high-security .NET 9 Web API backend for note-taking with comprehensive end-to-end encryption and user authentication. This API provides enterprise-grade security for protecting sensitive data by encrypting all HTTP requests and responses, making it impossible to inspect sensitive information through web console or network monitoring tools.

## 🔐 Core Security Features

### End-to-End Encryption Middleware

The API implements a sophisticated **EncryptionMiddleware** that provides maximum security by:

- **Mandatory Request Encryption**: All incoming requests with body content must be encrypted using AES-128 CBC encryption
- **Automatic Response Encryption**: All successful responses (200 OK, 201 Created) are automatically encrypted
- **Content-Type Enforcement**: Encrypted requests must use `application/octet-stream` content type
- **Web Console Protection**: Sensitive data is completely hidden from browser developer tools and network inspection
- **Binary Data Transfer**: All encrypted data is transferred as binary to prevent text-based interception

### How the Encryption Filter Works

1. **Request Processing**:
   - Intercepts incoming HTTP requests
   - Validates content type is `application/octet-stream` for encrypted data
   - Decrypts request body using AES-128 CBC with static key/IV (demo purposes)
   - Converts decrypted binary back to JSON for controller processing
   - Rejects unencrypted requests with 415 Unsupported Media Type

2. **Response Processing**:
   - Captures response data before sending to client
   - Encrypts successful responses (200/201 status codes) with non-empty bodies
   - Sets response content type to `application/octet-stream`
   - Sends encrypted binary data to client

3. **Security Benefits**:
   - **Network Sniffing Protection**: All sensitive data is encrypted in transit
   - **Developer Tools Protection**: Browser console cannot display readable sensitive information
   - **Proxy/Firewall Protection**: Intermediate systems cannot inspect actual data content
   - **Man-in-the-Middle Resistance**: Even if HTTPS is compromised, data remains encrypted

## 🚀 General Functionality

### User Management

- **Secure Registration**: Username validation with BCrypt password hashing and salting
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **User Isolation**: Each user can only access their own notes

### Note Management System

- **CRUD Operations**: Create, Read, Update, Delete notes with full encryption
- **Version History**: Automatic versioning system tracks all note modifications
- **User Association**: Notes are securely linked to authenticated users
- **Rich Content Support**: Supports title and content fields with timestamps

### Database Architecture

- **SQLite Integration**: Lightweight, file-based database with automatic creation
- **Entity Framework Core**: Modern ORM with relationship mapping
- **Auto-Migration**: Database and tables created automatically on first run
- **Foreign Key Constraints**: Maintains data integrity across user-note relationships

## 🛠 Technical Implementation

### Project Structure

```text
├── Controllers/
│   ├── AuthController.cs      # User registration and login endpoints
│   └── NotesController.cs     # CRUD operations for notes
├── Data/
│   └── AppDbContext.cs        # Entity Framework database context
├── Middleware/
│   └── EncryptionMiddleware.cs # Core encryption/decryption logic
├── Models/
│   ├── User.cs               # User entity model
│   ├── Note.cs               # Note entity model
│   └── NoteVersion.cs        # Note versioning model
└── Tools/
    └── AesEncryptor.cs       # Additional encryption utilities
```

### Key Technologies

- **.NET 9**: Latest framework with enhanced performance and security
- **Entity Framework Core**: Advanced ORM with SQLite provider
- **JWT Bearer Authentication**: Industry-standard token-based auth
- **AES-128 CBC Encryption**: Military-grade symmetric encryption
- **BCrypt**: Adaptive hashing function for password security
- **CORS Support**: Cross-origin resource sharing for web clients

## 🚀 Getting Started

### Prerequisites

- .NET 9 SDK installed
- Any REST client capable of handling binary data (Postman, custom client)

### Installation & Setup

1. **Clone and restore dependencies**:

   ```bash
   dotnet restore
   ```

2. **Run the application**:

   ```bash
   dotnet run
   ```

3. **Database Setup**:

   - SQLite database (`notes.db`) is created automatically in the application directory
   - All required tables are generated on first startup

### API Usage with Encryption

⚠️ **Important**: All API requests with body content must be encrypted. The middleware rejects unencrypted requests.

#### Authentication Endpoints

- `POST /api/auth/register` - User registration (encrypted)
- `POST /api/auth/login` - User login (encrypted)

#### Notes Endpoints (Requires JWT Authorization)

- `GET /api/notes` - Get user's notes (response encrypted)
- `GET /api/notes/{id}` - Get specific note (response encrypted)  
- `POST /api/notes` - Create note (request/response encrypted)
- `PUT /api/notes/{id}` - Update note (request/response encrypted)
- `DELETE /api/notes/{id}` - Delete note

### Configuration

JWT settings can be configured in `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "End2EndGuardApi",
    "Audience": "End2EndGuardApiUsers"
  }
}
```

## 🔒 Security Considerations

- **Demo Encryption Keys**: Current implementation uses static keys for demonstration. In production, implement secure key exchange mechanisms.
- **HTTPS Required**: Always use HTTPS in production for additional transport security.
- **JWT Secret**: Use a strong, random JWT signing key in production.
- **Key Rotation**: Implement regular key rotation policies for enhanced security.

## 🔧 Development Notes

The encryption middleware provides comprehensive logging for debugging purposes, showing:

- Request encryption status and content types
- Decryption process details
- Response encryption operations
- Security violation attempts

This makes it easy to monitor security events and troubleshoot encryption issues during development.

---

**Security Warning**: This implementation prioritizes data confidentiality by making sensitive information completely invisible in web consoles and network inspection tools. Ensure proper key management practices in production environments.


---

<a id="es"></a>
## 🌍 Español

# End2EndGuardApi

Una API backend de .NET 9 de alta seguridad para tomar notas con cifrado integral de extremo a extremo y autenticación de usuarios. Esta API proporciona seguridad de nivel empresarial para proteger datos sensibles mediante el cifrado de todas las solicitudes y respuestas HTTP, haciendo imposible inspeccionar información sensible a través de la consola web o herramientas de monitoreo de red.

## 🔐 Características de Seguridad Principales

### End-to-End Encryption Middleware

La API implementa un sofisticado **EncryptionMiddleware** que proporciona máxima seguridad mediante:

- **Cifrado Obligatorio de Solicitudes**: Todas las solicitudes entrantes con contenido del cuerpo deben estar cifradas usando cifrado AES-128 CBC
- **Cifrado Automático de Respuestas**: Todas las respuestas exitosas (200 OK, 201 Created) se cifran automáticamente
- **Aplicación de Content-Type**: Las solicitudes cifradas deben usar el tipo de contenido `application/octet-stream`
- **Protección de Consola Web**: Los datos sensibles están completamente ocultos de las herramientas de desarrollo del navegador y la inspección de red
- **Transferencia de Datos Binarios**: Todos los datos cifrados se transfieren como binarios para prevenir interceptación basada en texto

### Cómo Funciona el Filtro de Cifrado

1. **Procesamiento de Solicitudes**:
   - Intercepta las solicitudes HTTP entrantes
   - Valida que el tipo de contenido sea `application/octet-stream` para datos cifrados
   - Descifra el cuerpo de la solicitud usando AES-128 CBC con key/IV estático (propósitos de demostración)
   - Convierte el binario descifrado de vuelta a JSON para procesamiento del controlador
   - Rechaza solicitudes no cifradas con 415 Unsupported Media Type

2. **Procesamiento de Respuestas**:
   - Captura los datos de respuesta antes de enviar al cliente
   - Cifra respuestas exitosas (códigos de estado 200/201) con cuerpos no vacíos
   - Establece el tipo de contenido de respuesta a `application/octet-stream`
   - Envía datos binarios cifrados al cliente

3. **Beneficios de Seguridad**:
   - **Protección contra Sniffing de Red**: Todos los datos sensibles están cifrados en tránsito
   - **Protección de Herramientas de Desarrollo**: La consola del navegador no puede mostrar información sensible legible
   - **Protección de Proxy/Firewall**: Los sistemas intermedios no pueden inspeccionar el contenido real de los datos
   - **Resistencia a Man-in-the-Middle**: Incluso si HTTPS está comprometido, los datos permanecen cifrados

## 🚀 Funcionalidad General

### Gestión de Usuarios

- **Registro Seguro**: Validación de nombre de usuario con hashing y salting de contraseñas BCrypt
- **Autenticación JWT**: Autenticación sin estado usando JSON Web Tokens
- **Aislamiento de Usuarios**: Cada usuario solo puede acceder a sus propias notas

### Sistema de Gestión de Notas

- **Operaciones CRUD**: Crear, Leer, Actualizar, Eliminar notas con cifrado completo
- **Historial de Versiones**: Sistema de versionado automático que rastrea todas las modificaciones de notas
- **Asociación de Usuarios**: Las notas están vinculadas de forma segura a usuarios autenticados
- **Soporte de Contenido Rico**: Soporta campos de título y contenido con marcas de tiempo

### Arquitectura de Base de Datos

- **Integración SQLite**: Base de datos ligera basada en archivos con creación automática
- **Entity Framework Core**: ORM moderno con mapeo de relaciones
- **Auto-Migración**: Base de datos y tablas creadas automáticamente en la primera ejecución
- **Restricciones de Clave Foránea**: Mantiene la integridad de datos a través de relaciones usuario-nota

## 🛠 Implementación Técnica

### Estructura del Proyecto

```text
├── Controllers/
│   ├── AuthController.cs      # Endpoints de registro y login de usuarios
│   └── NotesController.cs     # Operaciones CRUD para notas
├── Data/
│   └── AppDbContext.cs        # Contexto de base de datos Entity Framework
├── Middleware/
│   └── EncryptionMiddleware.cs # Lógica central de cifrado/descifrado
├── Models/
│   ├── User.cs               # Modelo de entidad de usuario
│   ├── Note.cs               # Modelo de entidad de nota
│   └── NoteVersion.cs        # Modelo de versionado de notas
└── Tools/
    └── AesEncryptor.cs       # Utilidades adicionales de cifrado
```

### Tecnologías Clave

- **.NET 9**: Framework más reciente con rendimiento y seguridad mejorados
- **Entity Framework Core**: ORM avanzado con proveedor SQLite
- **JWT Bearer Authentication**: Autenticación basada en tokens estándar de la industria
- **AES-128 CBC Encryption**: Cifrado simétrico de grado militar
- **BCrypt**: Función de hashing adaptativa para seguridad de contraseñas
- **CORS Support**: Compartición de recursos de origen cruzado para clientes web

## 🚀 Primeros Pasos

### Prerrequisitos

- .NET 9 SDK instalado
- Cualquier cliente REST capaz de manejar datos binarios (Postman, cliente personalizado)

### Instalación y Configuración

1. **Clonar y restaurar dependencias**:

   ```bash
   dotnet restore
   ```

2. **Ejecutar la aplicación**:

   ```bash
   dotnet run
   ```

3. **Configuración de Base de Datos**:

   - La base de datos SQLite (`notes.db`) se crea automáticamente en el directorio de la aplicación
   - Todas las tablas requeridas se generan en el primer inicio

### Uso de API con Cifrado

⚠️ **Importante**: Todas las solicitudes de API con contenido del cuerpo deben estar cifradas. El middleware rechaza solicitudes no cifradas.

#### Endpoints de Autenticación

- `POST /api/auth/register` - Registro de usuario (cifrado)
- `POST /api/auth/login` - Login de usuario (cifrado)

#### Endpoints de Notas (Requiere Autorización JWT)

- `GET /api/notes` - Obtener notas del usuario (respuesta cifrada)
- `GET /api/notes/{id}` - Obtener nota específica (respuesta cifrada)  
- `POST /api/notes` - Crear nota (solicitud/respuesta cifrada)
- `PUT /api/notes/{id}` - Actualizar nota (solicitud/respuesta cifrada)
- `DELETE /api/notes/{id}` - Eliminar nota

### Configuración

La configuración JWT se puede configurar en `appsettings.json`:

```json
{
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "End2EndGuardApi",
    "Audience": "End2EndGuardApiUsers"
  }
}
```

## 🔒 Consideraciones de Seguridad

- **Claves de Cifrado de Demostración**: La implementación actual usa claves estáticas para demostración. En producción, implemente mecanismos seguros de intercambio de claves.
- **HTTPS Requerido**: Siempre use HTTPS en producción para seguridad de transporte adicional.
- **Secreto JWT**: Use una clave de firma JWT fuerte y aleatoria en producción.
- **Rotación de Claves**: Implemente políticas regulares de rotación de claves para seguridad mejorada.

## 🔧 Notas de Desarrollo

El encryption middleware proporciona logging comprehensivo para propósitos de depuración, mostrando:

- Estado de cifrado de solicitudes y tipos de contenido
- Detalles del proceso de descifrado
- Operaciones de cifrado de respuestas
- Intentos de violación de seguridad

Esto facilita el monitoreo de eventos de seguridad y la resolución de problemas de cifrado durante el desarrollo.

---

**Advertencia de Seguridad**: Esta implementación prioriza la confidencialidad de datos haciendo que la información sensible sea completamente invisible en las consolas web y herramientas de inspección de red. Asegúrese de seguir prácticas adecuadas de gestión de claves en entornos de producción.

---

<a id="fr"></a>
## 🌍 Français

# End2EndGuardApi

Une API backend .NET 9 haute sécurité pour la prise de notes avec chiffrement intégral de bout en bout et authentification des utilisateurs. Cette API fournit une sécurité de niveau entreprise pour protéger les données sensibles en chiffrant toutes les requêtes et réponses HTTP, rendant impossible l'inspection d'informations sensibles via la console web ou les outils de surveillance réseau.

## 🔐 Fonctionnalités de Sécurité Principales

### End-to-End Encryption Middleware

L'API implémente un **EncryptionMiddleware** sophistiqué qui fournit une sécurité maximale par :

- **Chiffrement Obligatoire des Requêtes** : Toutes les requêtes entrantes avec contenu de corps doivent être chiffrées en utilisant le chiffrement AES-128 CBC
- **Chiffrement Automatique des Réponses** : Toutes les réponses réussies (200 OK, 201 Created) sont automatiquement chiffrées
- **Application du Content-Type** : Les requêtes chiffrées doivent utiliser le type de contenu `application/octet-stream`
- **Protection de Console Web** : Les données sensibles sont complètement cachées des outils de développement du navigateur et de l'inspection réseau
- **Transfert de Données Binaires** : Toutes les données chiffrées sont transférées en binaire pour prévenir l'interception basée sur le texte

### Comment Fonctionne le Filtre de Chiffrement

1. **Traitement des Requêtes** :
   - Intercepte les requêtes HTTP entrantes
   - Valide que le type de contenu est `application/octet-stream` pour les données chiffrées
   - Déchiffre le corps de la requête en utilisant AES-128 CBC avec key/IV statique (à des fins de démonstration)
   - Convertit le binaire déchiffré en JSON pour le traitement du contrôleur
   - Rejette les requêtes non chiffrées avec 415 Unsupported Media Type

2. **Traitement des Réponses** :
   - Capture les données de réponse avant l'envoi au client
   - Chiffre les réponses réussies (codes de statut 200/201) avec corps non vides
   - Définit le type de contenu de réponse à `application/octet-stream`
   - Envoie des données binaires chiffrées au client

3. **Avantages de Sécurité** :
   - **Protection contre le Sniffing Réseau** : Toutes les données sensibles sont chiffrées en transit
   - **Protection des Outils de Développement** : La console du navigateur ne peut pas afficher d'informations sensibles lisibles
   - **Protection Proxy/Firewall** : Les systèmes intermédiaires ne peuvent pas inspecter le contenu réel des données
   - **Résistance Man-in-the-Middle** : Même si HTTPS est compromis, les données restent chiffrées

## 🚀 Fonctionnalité Générale

### Gestion des Utilisateurs

- **Inscription Sécurisée** : Validation du nom d'utilisateur avec hachage et salage des mots de passe BCrypt
- **Authentification JWT** : Authentification sans état utilisant JSON Web Tokens
- **Isolation des Utilisateurs** : Chaque utilisateur ne peut accéder qu'à ses propres notes

### Système de Gestion des Notes

- **Opérations CRUD** : Créer, Lire, Mettre à jour, Supprimer des notes avec chiffrement complet
- **Historique des Versions** : Système de versioning automatique qui suit toutes les modifications de notes
- **Association d'Utilisateurs** : Les notes sont liées de manière sécurisée aux utilisateurs authentifiés
- **Support de Contenu Riche** : Supporte les champs titre et contenu avec horodatage

### Architecture de Base de Données

- **Intégration SQLite** : Base de données légère basée sur fichier avec création automatique
- **Entity Framework Core** : ORM moderne avec mappage de relations
- **Auto-Migration** : Base de données et tables créées automatiquement au premier démarrage
- **Contraintes de Clé Étrangère** : Maintient l'intégrité des données à travers les relations utilisateur-note

## 🛠 Implémentation Technique

### Structure du Projet

```text
├── Controllers/
│   ├── AuthController.cs      # Endpoints d'inscription et connexion utilisateur
│   └── NotesController.cs     # Opérations CRUD pour les notes
├── Data/
│   └── AppDbContext.cs        # Contexte de base de données Entity Framework
├── Middleware/
│   └── EncryptionMiddleware.cs # Logique centrale de chiffrement/déchiffrement
├── Models/
│   ├── User.cs               # Modèle d'entité utilisateur
│   ├── Note.cs               # Modèle d'entité note
│   └── NoteVersion.cs        # Modèle de versioning des notes
└── Tools/
    └── AesEncryptor.cs       # Utilitaires de chiffrement supplémentaires
```

### Technologies Clés

- **.NET 9** : Framework le plus récent avec performance et sécurité améliorées
- **Entity Framework Core** : ORM avancé avec fournisseur SQLite
- **JWT Bearer Authentication** : Authentification basée sur tokens standard de l'industrie
- **AES-128 CBC Encryption** : Chiffrement symétrique de grade militaire
- **BCrypt** : Fonction de hachage adaptatif pour la sécurité des mots de passe
- **CORS Support** : Partage de ressources d'origine croisée pour clients web

## 🚀 Premiers Pas

### Prérequis

- .NET 9 SDK installé
- N'importe quel client REST capable de gérer des données binaires (Postman, client personnalisé)

### Installation et Configuration

1. **Cloner et restaurer les dépendances** :

   ```bash
   dotnet restore
   ```

2. **Exécuter l'application** :

   ```bash
   dotnet run
   ```

3. **Configuration de Base de Données** :

   - La base de données SQLite (`notes.db`) est créée automatiquement dans le répertoire de l'application
   - Toutes les tables requises sont générées au premier démarrage

### Utilisation de l'API avec Chiffrement

⚠️ **Important** : Toutes les requêtes API avec contenu de corps doivent être chiffrées. Le middleware rejette les requêtes non chiffrées.

#### Endpoints d'Authentification

- `POST /api/auth/register` - Inscription utilisateur (chiffré)
- `POST /api/auth/login` - Connexion utilisateur (chiffré)

#### Endpoints des Notes (Nécessite Autorisation JWT)

- `GET /api/notes` - Obtenir les notes de l'utilisateur (réponse chiffrée)
- `GET /api/notes/{id}` - Obtenir une note spécifique (réponse chiffrée)  
- `POST /api/notes` - Créer une note (requête/réponse chiffrée)
- `PUT /api/notes/{id}` - Mettre à jour une note (requête/réponse chiffrée)
- `DELETE /api/notes/{id}` - Supprimer une note

### Configuration

Les paramètres JWT peuvent être configurés dans `appsettings.json` :

```json
{
  "Jwt": {
    "Key": "your-secret-key-here",
    "Issuer": "End2EndGuardApi",
    "Audience": "End2EndGuardApiUsers"
  }
}
```

## 🔒 Considérations de Sécurité

- **Clés de Chiffrement de Démonstration** : L'implémentation actuelle utilise des clés statiques pour la démonstration. En production, implémentez des mécanismes sécurisés d'échange de clés.
- **HTTPS Requis** : Utilisez toujours HTTPS en production pour une sécurité de transport supplémentaire.
- **Secret JWT** : Utilisez une clé de signature JWT forte et aléatoire en production.
- **Rotation des Clés** : Implémentez des politiques régulières de rotation des clés pour une sécurité renforcée.

## 🔧 Notes de Développement

Le encryption middleware fournit un logging complet à des fins de débogage, montrant :

- État de chiffrement des requêtes et types de contenu
- Détails du processus de déchiffrement
- Opérations de chiffrement des réponses
- Tentatives de violation de sécurité

Cela facilite la surveillance des événements de sécurité et le dépannage des problèmes de chiffrement pendant le développement.

---

**Avertissement de Sécurité** : Cette implémentation priorise la confidentialité des données en rendant les informations sensibles complètement invisibles dans les consoles web et les outils d'inspection réseau. Assurez-vous de suivre les bonnes pratiques de gestion des clés dans les environnements de production.
