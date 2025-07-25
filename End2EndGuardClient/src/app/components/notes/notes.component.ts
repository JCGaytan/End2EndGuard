import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Note } from '../../models/models';

/**
 * Main notes dashboard component displaying all user notes.
 * Features responsive grid layout, search capabilities, and quick actions
 * for creating, viewing, editing, and deleting notes.
 */
@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Application header with navigation -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-3xl font-bold text-gray-900">My Notes</h1>
            <div class="flex items-center space-x-4">
              <!-- Create new note button -->
              <button
                (click)="createNote()"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                New Note
              </button>
              <!-- Logout button -->
              <button
                (click)="logout()"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content area -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          
          <!-- Loading state with spinner -->
          <ng-container *ngIf="true">
            <ng-container *ngIf="(notes$ | async) as notes; else loadingBlock">
              <!-- Error message display -->
              <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div class="text-red-800">{{ error }}</div>
              </div>
              
              <!-- Empty state when no notes exist -->
              <div *ngIf="!error && notes.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0124 24c4.004 0 7.625 2.371 9.287 6.286" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No notes</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new note.</p>
                <div class="mt-6">
                  <button
                    (click)="createNote()"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <!-- Plus icon -->
                    <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                    </svg>
                    New Note
                  </button>
                </div>
              </div>
              
              <!-- Notes grid display -->
              <div *ngIf="!error && notes.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  *ngFor="let note of notes"
                  class="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  (click)="viewNote(note)"
                >
                  <div class="p-6">
                    <div class="flex items-center justify-between">
                      <!-- Note title with truncation -->
                      <h3 class="text-lg font-medium text-gray-900 truncate">{{ note.title }}</h3>
                      <div class="flex items-center space-x-2">
                        <!-- Edit note button -->
                        <button
                          (click)="editNote(note); $event.stopPropagation()"
                          class="text-indigo-600 hover:text-indigo-900"
                          title="Edit note"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <!-- Delete note button -->
                        <button
                          (click)="deleteNote(note); $event.stopPropagation()"
                          class="text-red-600 hover:text-red-900"
                          title="Delete note"
                        >
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <!-- Note content preview with line clamping -->
                    <p class="mt-3 text-sm text-gray-600 line-clamp-3">{{ note.content }}</p>
                    <!-- Note creation date -->
                    <p class="mt-3 text-xs text-gray-500">{{ formatDate(note.createdAt) }}</p>
                  </div>
                </div>
              </div>
            </ng-container>
          </ng-container>
          
          <!-- Loading template -->
          <ng-template #loadingBlock>
            <div class="flex justify-center items-center py-12">
              <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </ng-template>
        </div>
      </main>
    </div>
  `,
  styles: [`
    /* CSS utility for truncating text to 3 lines */
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class NotesComponent implements OnInit {
  notes$: Observable<Note[]> | undefined;
  error = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Component initialization - loads user's notes from the API.
   */
  ngOnInit(): void {
    this.notes$ = this.apiService.getNotes();
  }

  /**
   * Navigates to the new note creation page.
   */
  createNote(): void {
    this.router.navigate(['/notes/new']);
  }

  /**
   * Navigates to the note viewing page.
   * @param note - The note to view
   */
  viewNote(note: Note): void {
    this.router.navigate(['/notes', note.id]);
  }

  /**
   * Navigates to the note editing page.
   * @param note - The note to edit
   */
  editNote(note: Note): void {
    this.router.navigate(['/notes', note.id, 'edit']);
  }

  /**
   * Deletes a note after user confirmation.
   * Refreshes the notes list upon successful deletion.
   * @param note - The note to delete
   */
  async deleteNote(note: Note): Promise<void> {
    if (confirm(`Are you sure you want to delete "${note.title}"?`)) {
      this.apiService.deleteNote(note.id).subscribe({
        next: () => {
          this.error = '';
          // Refresh the notes list to reflect the deletion
          this.notes$ = this.apiService.getNotes();
          this.cdRef.detectChanges();
        },
        error: (error: any) => {
          this.error = 'Failed to delete note';
          console.error('Error deleting note:', error);
        }
      });
    }
  }

  /**
   * Logs out the current user and redirects to login page.
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Formats a date string for display in the UI.
   * @param dateString - ISO date string from the backend
   * @returns Formatted date and time string
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
