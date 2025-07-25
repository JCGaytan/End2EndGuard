# End2EndGuard

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

**End2EndGuard** is a comprehensive secure note-taking system that demonstrates enterprise-grade end-to-end encryption, user authentication, and data protection. The solution consists of two main components:

- **[End2EndGuardApi](./End2EndGuardApi/README.md)** - A .NET 9 Web API backend with advanced encryption middleware
- **[End2EndGuardClient](./End2EndGuardClient/README.md)** - An Angular frontend with client-side encryption capabilities

## 🔐 Key Security Features

### End-to-End Encryption
- **AES-128 CBC Encryption**: Military-grade symmetric encryption for all sensitive data
- **Request/Response Encryption**: All HTTP communications with body content are encrypted
- **Binary Data Transfer**: Encrypted data is transferred as binary to prevent text-based interception
- **Web Console Protection**: Sensitive information is completely hidden from browser developer tools

### Authentication & Authorization
- **JWT Token-based Authentication**: Stateless authentication using JSON Web Tokens
- **BCrypt Password Hashing**: Adaptive hashing with salt for secure password storage
- **User Isolation**: Each user can only access their own data
- **Session Management**: Automatic token validation and redirect handling

### Data Protection
- **Content-Type Enforcement**: Encrypted requests must use `application/octet-stream`
- **Automatic Response Encryption**: All successful responses are encrypted before transmission
- **Network Sniffing Protection**: Data remains secure even if network traffic is intercepted
- **Proxy/Firewall Protection**: Intermediate systems cannot inspect actual data content

## 🏗️ Architecture Overview

### Backend (End2EndGuardApi)
```
├── Controllers/           # API endpoints for authentication and notes
├── Data/                 # Entity Framework database context
├── Middleware/           # Custom encryption middleware
├── Models/              # Entity models (User, Note, NoteVersion)
└── Tools/               # Encryption utilities
```

**Technologies:**
- .NET 9 with Entity Framework Core
- SQLite database with auto-migration
- JWT Bearer authentication
- Custom AES encryption middleware
- CORS support for cross-origin requests

### Frontend (End2EndGuardClient)
```
├── src/app/components/   # Angular components (auth, notes, editor)
├── src/app/services/     # API and encryption services
├── src/app/models/       # TypeScript interfaces
├── src/app/guards/       # Route protection
└── src/environments/     # Environment configuration
```

**Technologies:**
- Angular 20+ with TypeScript
- RxJS for reactive programming
- Angular Reactive Forms
- Tailwind CSS for styling
- Client-side AES encryption

## 🚀 Features

### Note Management
- **CRUD Operations**: Create, read, update, and delete notes with full encryption
- **Version History**: Automatic versioning system tracks all note modifications
- **Rich Content Support**: Title and content fields with timestamps
- **Real-time Updates**: Optimistic UI with automatic list refresh

### User Experience
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages for failed operations
- **Secure Routing**: Protected routes with authentication guards

### Developer Experience
- **Modern Stack**: Latest versions of .NET and Angular
- **Clean Architecture**: Well-organized code structure with separation of concerns
- **Comprehensive Documentation**: Detailed setup and usage instructions
- **Development Tools**: Hot reload, testing frameworks, and debugging support

## 🛠️ Quick Start

### Prerequisites
- .NET 9 SDK
- Node.js (v18+)
- Angular CLI (v20+)

### Backend Setup
```bash
cd End2EndGuardApi
dotnet restore
dotnet run
```

### Frontend Setup
```bash
cd End2EndGuardClient
npm install
ng serve
```

The backend will be available at `https://localhost:7295` and the frontend at `http://localhost:4200`.

## 📖 Documentation

- **[API Documentation](./End2EndGuardApi/README.md)** - Complete backend setup, configuration, and API reference
- **[Client Documentation](./End2EndGuardClient/README.md)** - Frontend development guide and component documentation

## 🔒 Security Considerations

This project is designed for **demonstration and educational purposes**. For production use, consider:

- Using dynamic encryption keys with proper key management
- Implementing certificate pinning for additional transport security
- Adding rate limiting and request throttling
- Implementing proper audit logging
- Using environment-specific configuration management
- Adding input validation and sanitization
- Implementing proper error handling without information disclosure

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<a id="es"></a>
## 🌍 Español

**End2EndGuard** es un sistema integral de toma de notas seguro que demuestra cifrado de extremo a extremo de nivel empresarial, autenticación de usuarios y protección de datos. La solución consta de dos componentes principales:

- **[End2EndGuardApi](./End2EndGuardApi/README.md)** - Un backend Web API de .NET 9 con middleware de cifrado avanzado
- **[End2EndGuardClient](./End2EndGuardClient/README.md)** - Un frontend Angular con capacidades de cifrado del lado del cliente

## 🔐 Características de Seguridad Clave

### Cifrado de Extremo a Extremo
- **Cifrado AES-128 CBC**: Cifrado simétrico de grado militar para todos los datos sensibles
- **Cifrado de Petición/Respuesta**: Todas las comunicaciones HTTP con contenido corporal están cifradas
- **Transferencia de Datos Binarios**: Los datos cifrados se transfieren como binarios para prevenir interceptación basada en texto
- **Protección de Consola Web**: La información sensible está completamente oculta de las herramientas de desarrollador del navegador

### Autenticación y Autorización
- **Autenticación Basada en Tokens JWT**: Autenticación sin estado usando JSON Web Tokens
- **Hash de Contraseñas BCrypt**: Hash adaptativo con sal para almacenamiento seguro de contraseñas
- **Aislamiento de Usuario**: Cada usuario solo puede acceder a sus propios datos
- **Gestión de Sesiones**: Validación automática de tokens y manejo de redirección

### Protección de Datos
- **Aplicación de Content-Type**: Las peticiones cifradas deben usar `application/octet-stream`
- **Cifrado Automático de Respuestas**: Todas las respuestas exitosas se cifran antes de la transmisión
- **Protección contra Espionaje de Red**: Los datos permanecen seguros incluso si el tráfico de red es interceptado
- **Protección de Proxy/Firewall**: Los sistemas intermedios no pueden inspeccionar el contenido real de los datos

## 🏗️ Visión General de la Arquitectura

### Backend (End2EndGuardApi)
```
├── Controllers/           # Endpoints API para autenticación y notas
├── Data/                 # Contexto de base de datos Entity Framework
├── Middleware/           # Middleware de cifrado personalizado
├── Models/              # Modelos de entidad (User, Note, NoteVersion)
└── Tools/               # Utilidades de cifrado
```

**Tecnologías:**
- .NET 9 con Entity Framework Core
- Base de datos SQLite con auto-migración
- Autenticación JWT Bearer
- Middleware de cifrado AES personalizado
- Soporte CORS para peticiones cross-origin

### Frontend (End2EndGuardClient)
```
├── src/app/components/   # Componentes Angular (auth, notas, editor)
├── src/app/services/     # Servicios de API y cifrado
├── src/app/models/       # Interfaces TypeScript
├── src/app/guards/       # Protección de rutas
└── src/environments/     # Configuración de entorno
```

**Tecnologías:**
- Angular 20+ con TypeScript
- RxJS para programación reactiva
- Angular Reactive Forms
- Tailwind CSS para estilos
- Cifrado AES del lado del cliente

## 🚀 Características

### Gestión de Notas
- **Operaciones CRUD**: Crear, leer, actualizar y eliminar notas con cifrado completo
- **Historial de Versiones**: Sistema de versionado automático que rastrea todas las modificaciones de notas
- **Soporte de Contenido Rico**: Campos de título y contenido con marcas de tiempo
- **Actualizaciones en Tiempo Real**: UI optimista con actualización automática de lista

### Experiencia de Usuario
- **Diseño Responsivo**: Funciona perfectamente en dispositivos de escritorio y móviles
- **Estados de Carga**: Retroalimentación visual durante operaciones API
- **Manejo de Errores**: Mensajes de error amigables para operaciones fallidas
- **Enrutamiento Seguro**: Rutas protegidas con guardias de autenticación

### Experiencia de Desarrollador
- **Stack Moderno**: Últimas versiones de .NET y Angular
- **Arquitectura Limpia**: Estructura de código bien organizada con separación de responsabilidades
- **Documentación Integral**: Instrucciones detalladas de configuración y uso
- **Herramientas de Desarrollo**: Recarga en caliente, frameworks de prueba y soporte de depuración

## 🛠️ Inicio Rápido

### Prerrequisitos
- .NET 9 SDK
- Node.js (v18+)
- Angular CLI (v20+)

### Configuración del Backend
```bash
cd End2EndGuardApi
dotnet restore
dotnet run
```

### Configuración del Frontend
```bash
cd End2EndGuardClient
npm install
ng serve
```

El backend estará disponible en `https://localhost:7295` y el frontend en `http://localhost:4200`.

## 📖 Documentación

- **[Documentación de API](./End2EndGuardApi/README.md)** - Configuración completa del backend, configuración y referencia de API
- **[Documentación del Cliente](./End2EndGuardClient/README.md)** - Guía de desarrollo frontend y documentación de componentes

## 🔒 Consideraciones de Seguridad

Este proyecto está diseñado para **propósitos de demostración y educación**. Para uso en producción, considera:

- Usar claves de cifrado dinámicas con gestión adecuada de claves
- Implementar certificate pinning para seguridad de transporte adicional
- Agregar limitación de velocidad y throttling de peticiones
- Implementar registro de auditoría adecuado
- Usar gestión de configuración específica del entorno
- Agregar validación y sanitización de entrada
- Implementar manejo adecuado de errores sin divulgación de información

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

<a id="fr"></a>
## 🌍 Français

**End2EndGuard** est un système complet de prise de notes sécurisé qui démontre le chiffrement de bout en bout de niveau entreprise, l'authentification des utilisateurs et la protection des données. La solution se compose de deux composants principaux :

- **[End2EndGuardApi](./End2EndGuardApi/README.md)** - Un backend Web API .NET 9 avec middleware de chiffrement avancé
- **[End2EndGuardClient](./End2EndGuardClient/README.md)** - Un frontend Angular avec capacités de chiffrement côté client

## 🔐 Fonctionnalités de Sécurité Clés

### Chiffrement de Bout en Bout
- **Chiffrement AES-128 CBC** : Chiffrement symétrique de grade militaire pour toutes les données sensibles
- **Chiffrement Requête/Réponse** : Toutes les communications HTTP avec contenu corporel sont chiffrées
- **Transfert de Données Binaires** : Les données chiffrées sont transférées en binaire pour prévenir l'interception basée sur le texte
- **Protection Console Web** : Les informations sensibles sont complètement cachées des outils de développeur du navigateur

### Authentification et Autorisation
- **Authentification Basée sur Tokens JWT** : Authentification sans état utilisant les JSON Web Tokens
- **Hachage de Mots de Passe BCrypt** : Hachage adaptatif avec sel pour stockage sécurisé des mots de passe
- **Isolation Utilisateur** : Chaque utilisateur ne peut accéder qu'à ses propres données
- **Gestion de Session** : Validation automatique de tokens et gestion de redirection

### Protection des Données
- **Application Content-Type** : Les requêtes chiffrées doivent utiliser `application/octet-stream`
- **Chiffrement Automatique des Réponses** : Toutes les réponses réussies sont chiffrées avant transmission
- **Protection contre l'Espionnage Réseau** : Les données restent sécurisées même si le trafic réseau est intercepté
- **Protection Proxy/Pare-feu** : Les systèmes intermédiaires ne peuvent pas inspecter le contenu réel des données

## 🏗️ Aperçu de l'Architecture

### Backend (End2EndGuardApi)
```
├── Controllers/           # Points de terminaison API pour authentification et notes
├── Data/                 # Contexte de base de données Entity Framework
├── Middleware/           # Middleware de chiffrement personnalisé
├── Models/              # Modèles d'entité (User, Note, NoteVersion)
└── Tools/               # Utilitaires de chiffrement
```

**Technologies :**
- .NET 9 avec Entity Framework Core
- Base de données SQLite avec auto-migration
- Authentification JWT Bearer
- Middleware de chiffrement AES personnalisé
- Support CORS pour requêtes cross-origin

### Frontend (End2EndGuardClient)
```
├── src/app/components/   # Composants Angular (auth, notes, éditeur)
├── src/app/services/     # Services API et de chiffrement
├── src/app/models/       # Interfaces TypeScript
├── src/app/guards/       # Protection de routes
└── src/environments/     # Configuration d'environnement
```

**Technologies :**
- Angular 20+ avec TypeScript
- RxJS pour programmation réactive
- Angular Reactive Forms
- Tailwind CSS pour les styles
- Chiffrement AES côté client

## 🚀 Fonctionnalités

### Gestion des Notes
- **Opérations CRUD** : Créer, lire, mettre à jour et supprimer des notes avec chiffrement complet
- **Historique des Versions** : Système de versioning automatique qui suit toutes les modifications de notes
- **Support de Contenu Riche** : Champs titre et contenu avec horodatage
- **Mises à Jour Temps Réel** : UI optimiste avec actualisation automatique de liste

### Expérience Utilisateur
- **Design Responsive** : Fonctionne parfaitement sur ordinateurs de bureau et appareils mobiles
- **États de Chargement** : Retour visuel pendant les opérations API
- **Gestion d'Erreurs** : Messages d'erreur conviviaux pour opérations échouées
- **Routage Sécurisé** : Routes protégées avec gardes d'authentification

### Expérience Développeur
- **Stack Moderne** : Dernières versions de .NET et Angular
- **Architecture Propre** : Structure de code bien organisée avec séparation des préoccupations
- **Documentation Complète** : Instructions détaillées de configuration et d'utilisation
- **Outils de Développement** : Rechargement à chaud, frameworks de test et support de débogage

## 🛠️ Démarrage Rapide

### Prérequis
- .NET 9 SDK
- Node.js (v18+)
- Angular CLI (v20+)

### Configuration Backend
```bash
cd End2EndGuardApi
dotnet restore
dotnet run
```

### Configuration Frontend
```bash
cd End2EndGuardClient
npm install
ng serve
```

Le backend sera disponible à `https://localhost:7295` et le frontend à `http://localhost:4200`.

## 📖 Documentation

- **[Documentation API](./End2EndGuardApi/README.md)** - Configuration complète du backend, configuration et référence API
- **[Documentation Client](./End2EndGuardClient/README.md)** - Guide de développement frontend et documentation des composants

## 🔒 Considérations de Sécurité

Ce projet est conçu à des **fins de démonstration et d'éducation**. Pour un usage en production, considérez :

- Utiliser des clés de chiffrement dynamiques avec gestion appropriée des clés
- Implémenter le certificate pinning pour sécurité de transport supplémentaire
- Ajouter limitation de débit et throttling des requêtes
- Implémenter journalisation d'audit appropriée
- Utiliser gestion de configuration spécifique à l'environnement
- Ajouter validation et assainissement des entrées
- Implémenter gestion d'erreurs appropriée sans divulgation d'informations

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.
