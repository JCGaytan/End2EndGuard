/**
 * TypeScript interfaces defining the data models used throughout the application.
 * These interfaces ensure type safety and provide clear contracts for API communication.
 */

/**
 * User login request payload.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Successful login response from the backend.
 */
export interface LoginResponse {
  /** JWT token for authenticating subsequent requests */
  token: string;
  /** User's email address */
  email: string;
}

/**
 * User registration request payload.
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Complete note object as returned from the backend.
 */
export interface Note {
  /** Unique identifier for the note */
  id: number;
  /** Note title (encrypted in transit) */
  title: string;
  /** Note content (encrypted in transit) */
  content: string;
  /** ISO timestamp when the note was created */
  createdAt: string;
  /** ID of the user who owns this note */
  userId: number;
}

/**
 * Payload for creating a new note.
 */
export interface CreateNoteRequest {
  /** Note title (will be encrypted before transmission) */
  title: string;
  /** Note content (will be encrypted before transmission) */
  content: string;
}

/**
 * Payload for updating an existing note.
 */
export interface UpdateNoteRequest {
  /** ID of the note to update */
  id: number;
  /** Updated note title (will be encrypted before transmission) */
  title: string;
  /** Updated note content (will be encrypted before transmission) */
  content: string;
}
