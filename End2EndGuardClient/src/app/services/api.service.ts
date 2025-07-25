import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { EncryptionService } from './encryption.service';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  Note, 
  CreateNoteRequest, 
  UpdateNoteRequest 
} from '../models/models';

/**
 * Service responsible for all HTTP communication with the backend API.
 * Handles authentication, CRUD operations for notes, and automatic encryption/decryption
 * of sensitive data before transmission.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Encrypts data and sends it via HTTP POST request.
   * Used for login, register, and note creation operations.
   * @param endpoint - API endpoint (e.g., '/auth/login')
   * @param data - Data to encrypt and send
   * @returns Promise of Observable containing the decrypted response
   */
  private async encryptedPost<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const encrypted = await this.encryptionService.encrypt(JSON.stringify(data));
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post(`${this.baseUrl}${endpoint}`, encrypted, { 
      headers, 
      responseType: 'arraybuffer' 
    }).pipe(
      switchMap(async (response: ArrayBuffer) => {
        const decrypted = await this.encryptionService.decrypt(response);
        return JSON.parse(decrypted) as T;
      })
    );
  }

  /**
   * Encrypts data and sends it via HTTP PUT request.
   * Used for updating existing notes.
   * @param endpoint - API endpoint (e.g., '/notes/123')
   * @param data - Data to encrypt and send
   * @returns Promise of Observable containing the decrypted response
   */
  private async encryptedPut<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const encrypted = await this.encryptionService.encrypt(JSON.stringify(data));
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.put(`${this.baseUrl}${endpoint}`, encrypted, { 
      headers, 
      responseType: 'arraybuffer' 
    }).pipe(
      switchMap(async (response: ArrayBuffer) => {
        const decrypted = await this.encryptionService.decrypt(response);
        return JSON.parse(decrypted) as T;
      })
    );
  }

  /**
   * Sends HTTP DELETE request with proper authentication headers.
   * @param endpoint - API endpoint (e.g., '/notes/123')
   * @returns Observable for the delete operation
   */
  private encryptedDelete<T>(endpoint: string): Observable<T> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.delete(`${this.baseUrl}${endpoint}`, { headers, observe: 'response', responseType: 'arraybuffer' }).pipe(
      switchMap(async (response: any) => {
        // If response is empty (204 No Content), return null
        if (!response.body || response.body.byteLength === 0) {
          return null as T;
        }
        // Try to decrypt if content-type is octet-stream
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/octet-stream')) {
          const decrypted = await this.encryptionService.decrypt(response.body as ArrayBuffer);
          return JSON.parse(decrypted) as T;
        } else {
          // Fallback for plain JSON response
          const text = new TextDecoder().decode(response.body as ArrayBuffer);
          try {
            return JSON.parse(text) as T;
          } catch {
            // If not JSON, just return the text
            return text as unknown as T;
          }
        }
      })
    );
  }

  /**
   * Authenticates user with username and password.
   * @param credentials - User login credentials
   * @returns Observable containing JWT token and user info
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return from(this.encryptedPost<LoginResponse>('/auth/login', credentials)).pipe(
      switchMap(obs => obs)
    );
  }

  /**
   * Registers a new user account.
   * @param credentials - User registration data
   * @returns Observable for the registration operation
   */
  register(credentials: RegisterRequest): Observable<any> {
    return from(this.encryptedPost<any>('/auth/register', credentials)).pipe(
      switchMap(obs => obs)
    );
  }

  /**
   * Retrieves all notes for the authenticated user.
   * Automatically decrypts note content if the response is encrypted.
   * @returns Observable containing array of user's notes
   */
  getNotes(): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.baseUrl}/notes`, { headers, observe: 'response', responseType: 'arraybuffer' }).pipe(
      switchMap(response =>
        from((async () => {
          const contentType = response.headers.get('Content-Type');
          // Handle encrypted response (preferred)
          if (contentType && contentType.includes('application/octet-stream')) {
            const decrypted = await this.encryptionService.decrypt(response.body as ArrayBuffer);
            const notes = JSON.parse(decrypted) as Note[];
            return notes;
          } else {
            // Fallback for plain JSON response (development/debugging)
            const text = new TextDecoder().decode(response.body as ArrayBuffer);
            try {
              const notes = JSON.parse(text) as Note[];
              return notes;
            } catch {
              throw new Error('Failed to parse notes response');
            }
          }
        })())
      )
    );
  }

  /**
   * Retrieves a specific note by its ID.
   * Automatically decrypts note content if the response is encrypted.
   * @param id - Numeric ID of the note to retrieve
   * @returns Observable containing the requested note
   */
  getNote(id: number): Observable<Note> {
    const headers = new HttpHeaders({
      'Accept': 'application/octet-stream',
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get(`${this.baseUrl}/notes/${id}`, { headers, observe: 'response', responseType: 'arraybuffer' }).pipe(
      switchMap(response =>
        from((async () => {
          const contentType = response.headers.get('Content-Type');
          // Handle encrypted response (preferred)
          if (contentType && contentType.includes('application/octet-stream')) {
            const decrypted = await this.encryptionService.decrypt(response.body as ArrayBuffer);
            const note = JSON.parse(decrypted) as Note;
            return note;
          } else {
            // Fallback for plain JSON response (development/debugging)
            const text = new TextDecoder().decode(response.body as ArrayBuffer);
            try {
              const note = JSON.parse(text) as Note;
              return note;
            } catch {
              throw new Error('Failed to parse note response');
            }
          }
        })())
      )
    );
  }

  /**
   * Creates a new note for the authenticated user.
   * Note content is automatically encrypted before transmission.
   * @param note - Note data (title and content)
   * @returns Observable containing the created note with generated ID
   */
  createNote(note: CreateNoteRequest): Observable<Note> {
    return from(this.encryptedPost<Note>('/notes', note)).pipe(
      switchMap(obs => obs)
    );
  }

  /**
   * Updates an existing note.
   * Note content is automatically encrypted before transmission.
   * Creates a new version in the backend for audit trail.
   * @param note - Updated note data including ID
   * @returns Observable containing the updated note
   */
  updateNote(note: UpdateNoteRequest): Observable<Note> {
    return from(this.encryptedPut<Note>(`/notes/${note.id}`, note)).pipe(
      switchMap(obs => obs)
    );
  }

  /**
   * Deletes a note permanently.
   * Only the note owner can perform this operation.
   * @param id - Numeric ID of the note to delete
   * @returns Observable for the delete operation
   */
  deleteNote(id: number): Observable<any> {
    return this.encryptedDelete<any>(`/notes/${id}`);
  }

  /**
   * Retrieves the JWT authentication token from local storage.
   * @returns JWT token string or empty string if not found
   */
  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }
}
