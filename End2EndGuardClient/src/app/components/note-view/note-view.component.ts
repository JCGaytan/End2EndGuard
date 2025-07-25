import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../models/models';

/**
 * Component for displaying a single note in read-only mode.
 * Provides navigation to edit mode and displays formatted note content.
 * Includes loading states and error handling for note retrieval.
 */
@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Page header with navigation and actions -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <!-- Dynamic page title based on note title -->
            <h1 class="text-3xl font-bold text-gray-900">
              {{ note?.title || 'Note' }}
            </h1>
            <div class="flex items-center space-x-4">
              <!-- Back to notes list button -->
              <button
                (click)="goBack()"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back
              </button>
              <!-- Edit note button (only shown when note is loaded) -->
              <button
                *ngIf="note"
                (click)="editNote()"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main content area -->
      <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          
          <!-- Loading state with spinner -->
          <div *ngIf="loading" class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <!-- Error state display -->
          <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="text-red-800">{{ error }}</div>
          </div>

          <!-- Note content display -->
          <div *ngIf="!loading && note" class="bg-white shadow rounded-lg">
            <div class="p-6">
              <div class="mb-4">
                <!-- Note title -->
                <h2 class="text-2xl font-bold text-gray-900">{{ note.title }}</h2>
                <!-- Note metadata -->
                <p class="text-sm text-gray-500 mt-1">
                  Created: {{ formatDate(note.createdAt) }}
                </p>
              </div>
              
              <!-- Note content with preserved formatting -->
              <div class="prose max-w-none">
                <div class="whitespace-pre-wrap text-gray-700">{{ note.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class NoteViewComponent implements OnInit {
  note: Note | null = null;
  noteId: number | null = null;
  loading = true;
  error = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Component initialization - extracts note ID from route and loads the note.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noteId = +id; // Convert string to number
      this.loadNote();
    } else {
      this.error = 'Invalid note ID';
      this.loading = false;
    }
  }

  /**
   * Loads the note data from the API using the note ID.
   * Handles loading states and error conditions.
   */
  loadNote(): void {
    if (!this.noteId) return;

    this.loading = true;
    this.error = '';
    this.note = null; // Clear previous note data
    this.cdr.detectChanges(); // Force UI update to show spinner

    this.apiService.getNote(this.noteId).subscribe({
      next: (note) => {
        this.note = note;
        this.loading = false;
        this.cdr.detectChanges(); // Force UI update to hide spinner
      },
      error: (error: any) => {
        this.error = 'Failed to load note';
        this.loading = false;
        this.note = null;
        this.cdr.detectChanges(); // Force UI update
        console.error('Error loading note:', error);
      },
      complete: () => {
        // Ensure loading is false even if something unexpected happens
        this.loading = false;
        this.cdr.detectChanges(); // Force final UI update
      }
    });
  }

  /**
   * Navigates to the edit page for the current note.
   */
  editNote(): void {
    if (this.noteId) {
      this.router.navigate(['/notes', this.noteId, 'edit']);
    }
  }

  /**
   * Deletes the current note after user confirmation.
   * Redirects to notes list after successful deletion.
   */
  deleteNote(): void {
    if (this.noteId) {
      this.apiService.deleteNote(this.noteId).subscribe({
        next: () => {
          this.router.navigate(['/notes']);
        },
        error: (error: any) => {
          this.error = 'Failed to delete note';
          console.error('Error deleting note:', error);
        }
      });
    }
  }

  /**
   * Navigates back to the notes list.
   */
  goBack(): void {
    this.router.navigate(['/notes']);
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
