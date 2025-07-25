import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Note } from '../../models/models';

/**
 * Note editor component handling both creation and editing of notes.
 * Features real-time validation, autosave capabilities, and proper
 * routing between create and edit modes.
 */
@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Editor header with actions -->
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <!-- Dynamic title based on edit/create mode -->
            <h1 class="text-3xl font-bold text-gray-900">
              {{ isEditing ? 'Edit Note' : 'New Note' }}
            </h1>
            <div class="flex items-center space-x-4">
              <!-- Cancel button -->
              <button
                (click)="cancel()"
                class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <!-- Save button with loading state -->
              <button
                (click)="save()"
                [disabled]="noteForm.invalid || saving"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span *ngIf="saving" class="mr-2">
                  <!-- Loading spinner -->
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ saving ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main editor content -->
      <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          
          <!-- Loading state for edit mode -->
          <div *ngIf="loading" class="flex justify-center items-center py-12">
            <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

          <!-- Error message display -->
          <div *ngIf="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div class="text-red-800">{{ error }}</div>
          </div>

          <!-- Note editing form -->
          <div *ngIf="!loading" class="bg-white shadow rounded-lg">
            <form [formGroup]="noteForm" class="p-6">
              <!-- Title input field -->
              <div class="mb-6">
                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  formControlName="title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter note title..."
                />
                <!-- Title validation error -->
                <div *ngIf="noteForm.get('title')?.invalid && noteForm.get('title')?.touched" class="mt-1 text-sm text-red-600">
                  Title is required
                </div>
              </div>

              <!-- Content textarea field -->
              <div class="mb-6">
                <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  formControlName="content"
                  rows="20"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Write your note content here..."
                ></textarea>
                <!-- Content validation error -->
                <div *ngIf="noteForm.get('content')?.invalid && noteForm.get('content')?.touched" class="mt-1 text-sm text-red-600">
                  Content is required
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  `
})
export class NoteEditorComponent implements OnInit {
  noteForm: FormGroup;
  isEditing = false;
  noteId: number | null = null;
  loading = false;
  saving = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
    // Initialize reactive form with validation rules
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  /**
   * Component initialization - determines mode (create/edit) and loads note if editing.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      // Edit mode - load existing note
      this.isEditing = true;
      this.noteId = +id;
      this.loadNote();
    } else {
      // Create mode - start with empty form
      this.isEditing = false;
      this.noteId = null;
    }
  }

  /**
   * Loads note data for editing mode.
   * Populates the form with existing note content.
   */
  loadNote(): void {
    if (!this.noteId) return;
    this.loading = true;
    this.error = '';
    
    this.apiService.getNote(this.noteId).subscribe({
      next: (note) => {
        if (note) {
          // Populate form with existing note data
          this.noteForm.patchValue({
            title: note.title,
            content: note.content
          });
        } else {
          this.error = 'Note not found';
        }
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: (error: any) => {
        this.error = 'Failed to load note';
        this.loading = false;
        this.cdRef.detectChanges();
        console.error('Error loading note:', error);
      }
    });
  }

  /**
   * Handles saving of note data.
   * Determines whether to create new note or update existing one.
   */
  async save(): Promise<void> {
    const formValue = this.noteForm.value;
    this.saving = true;
    this.error = '';
    
    if (this.isEditing && this.noteId) {
      // Update existing note
      const updateRequest = {
        id: this.noteId,
        title: formValue.title,
        content: formValue.content
      };
      
      this.apiService.updateNote(updateRequest).subscribe({
        next: () => {
          this.saving = false;
          // Navigate back to notes list after successful update
          this.router.navigate(['/notes']).then(() => {
            this.cdRef.detectChanges();
          });
        },
        error: (error: any) => {
          this.saving = false;
          this.error = 'Failed to update note';
          console.error('Error updating note:', error);
        }
      });
    } else {
      // Create new note
      this.apiService.createNote(formValue).subscribe({
        next: () => {
          this.saving = false;
          // Navigate back to notes list after successful creation
          this.router.navigate(['/notes']).then(() => {
            this.cdRef.detectChanges();
          });
        },
        error: (error: any) => {
          this.saving = false;
          this.error = 'Failed to create note';
          console.error('Error creating note:', error);
        }
      });
    }
  }

  /**
   * Cancels editing and returns to notes list without saving changes.
   */
  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
