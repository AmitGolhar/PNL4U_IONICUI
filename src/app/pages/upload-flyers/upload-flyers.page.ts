import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map, takeWhile, concatMap, delay } from 'rxjs/operators';

export interface UploadResult {
  success: boolean;
  url?: string;
  fileName?: string;
  error?: string;
}

interface EventDetails {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  entryFee?: number;
  description?: string;
  flyerUrl?: string;
}

@Component({
  selector: 'app-upload-flyers',
  templateUrl: './upload-flyers.page.html',
  styleUrls: ['./upload-flyers.page.scss'],
})
export class UploadFlyersPage implements OnInit {
  @Input() accept = 'image/*,application/pdf';
  @Input() maxSizeMB = 5;
  @Input() showPreview = true;
  @Output() uploaded = new EventEmitter<UploadResult>();
  @Output() removed = new EventEmitter<void>();

  dragOver = false;
  selectedFile: File | null = null;
  previewDataUrl: string | null = null;
  isImagePreview = false;
  isUploading = false;
  uploadProgress = 0;
  errorMessage: string | null = null;

  // Event details
  event: Partial<EventDetails> = {};
  events: EventDetails[] = [];

  constructor() {}
  ngOnInit(): void {}

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    this.dragOver = true;
  }
  onDragLeave(ev: DragEvent) {
    ev.preventDefault();
    this.dragOver = false;
  }
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.dragOver = false;
    const f = ev.dataTransfer?.files?.[0];
    if (f) this.processFile(f);
  }

  onFileInputChange(ev: any) {
    const f = ev.target?.files?.[0];
    if (f) this.processFile(f);
    if (ev.target) ev.target.value = '';
  }

  processFile(file: File) {
    this.clearError();
    if (!this.isAcceptedType(file)) {
      this.errorMessage = 'Unsupported file type. Allowed: images or PDF.';
      return;
    }
    if (!this.isWithinSizeLimit(file)) {
      this.errorMessage = `File too large. Max ${this.maxSizeMB} MB allowed.`;
      return;
    }
    this.selectedFile = file;
    this.preparePreview(file);
  }

  isAcceptedType(file: File) {
    if (!this.accept) return true;
    const allowed = this.accept.split(',').map(a => a.trim());
    return allowed.some(a => {
      if (a === file.type) return true;
      if (a.endsWith('/*')) {
        const prefix = a.split('/')[0];
        return file.type.startsWith(prefix + '/');
      }
      return false;
    });
  }

  isWithinSizeLimit(file: File) {
    const maxBytes = this.maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
  }

  preparePreview(file: File) {
    this.previewDataUrl = null;
    this.isImagePreview = false;
    if (!this.showPreview) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewDataUrl = e.target.result;
        this.isImagePreview = true;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewDataUrl = null;
      this.isImagePreview = false;
    }
  }

  removeFile() {
    this.selectedFile = null;
    this.previewDataUrl = null;
    this.isImagePreview = false;
    this.uploadProgress = 0;
    this.isUploading = false;
    this.clearError();
    this.removed.emit();
  }

  upload() {
    if (!this.selectedFile) {
      this.errorMessage = 'No file selected.';
      return;
    }
    this.clearError();
    this.isUploading = true;
    this.uploadProgress = 0;

    this.mockUploadObservable(this.selectedFile).subscribe({
      next: (p: number | UploadResult) => {
        if (typeof p === 'number') {
          this.uploadProgress = p;
        } else {
          this.isUploading = false;
          if (p.success) {
            this.event.flyerUrl = p.url;
            this.uploaded.emit(p);
            this.saveEvent();
          } else {
            this.errorMessage = p.error || 'Upload failed';
          }
        }
      },
      error: () => {
        this.isUploading = false;
        this.errorMessage = 'Upload error';
      },
    });
  }

  mockUploadObservable(file: File): Observable<number | UploadResult> {
    const ticks$ = interval(120).pipe(
      map(i => Math.min(100, Math.round((i + 1) * 6))),
      takeWhile(v => v < 100, true)
    );
    return ticks$.pipe(
      concatMap(val => {
        if (val < 100) return of(val);
        const result: UploadResult = {
          success: true,
          url: `https://cdn.example.com/uploads/${encodeURIComponent(file.name)}`,
          fileName: file.name,
        };
        return of(result).pipe(delay(250));
      })
    );
  }

  saveEvent() {
    if (!this.event.title || !this.event.date) {
      this.errorMessage = 'Please fill in event details.';
      return;
    }
    const newEvent: EventDetails = {
      id: this.events.length + 1,
      title: this.event.title!,
      date: this.event.date!,
      time: this.event.time || '9:00 PM',
      venue: this.event.venue || 'PNL4U Arena',
      entryFee: this.event.entryFee || 0,
      description: this.event.description || '',
      flyerUrl: this.event.flyerUrl,
    };
    this.events.unshift(newEvent);
    this.event = {};
    this.selectedFile = null;
    this.previewDataUrl = null;
    alert('Event uploaded successfully!');
  }

  clearError() {
    this.errorMessage = null;
  }
}
