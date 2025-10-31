import { Component, OnInit } from '@angular/core';

interface Event {
  id: number;
  title: string;
  date: string; // keep as string, Angular template supports date pipe fine
  attendees: number;
  revenue: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  image: string;
  category: string;
}
interface EventItem {
  id: number;
  title: string;
  date: string;
  attendees: number;
  revenue: number;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  image: string;
  category: string;
  description: string;
}
@Component({
  selector: 'app-manage-events',
  templateUrl: './manage-events.page.html',
  styleUrls: ['./manage-events.page.scss'],
})
export class ManageEventsPage implements OnInit {

  events: EventItem[] = [];
  activeTab: 'upcoming' | 'past' | 'all' = 'upcoming';

  // Modal control
  showCreateModal = false;
  newEvent: Partial<EventItem> = {};
  imagePreview: string | null = null;
  triggeredEvent: any;
  selectedFileForEventId: number | null = null;


  ngOnInit() {
   this.events = [
      {
        id: 1,
        title: 'Techno Fusion Night',
        date: '2025-11-02',
        attendees: 340,
        revenue: 240000,
        status: 'UPCOMING',
        image: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=900&q=60',
        category: 'Techno',
        description: 'A night full of techno beats and neon lights.'
      },
      {
        id: 2,
        title: 'Neon Ladies Bash',
        date: '2025-10-20',
        attendees: 380,
        revenue: 275000,
        status: 'COMPLETED',
        image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=900&q=60',
        category: 'Ladies Night',
        description: 'An exclusive ladies event with live music and neon cocktails.'
      }
    ];
  }

  
  

 editEvent(item: EventItem) {
    console.log('Editing event:', item.title);
    alert(`Editing event "${item.title}"`);
  }

 


// ✅ Called by hidden global <input type="file">
  onGlobalFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file && this.selectedFileForEventId !== null) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const index = this.events.findIndex(e => e.id === this.selectedFileForEventId);
        if (index > -1) this.events[index].image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    this.selectedFileForEventId = null;
  }

  // ✅ Trigger hidden input to upload a poster for a specific event
  triggerFileUpload(item: EventItem) {
    this.selectedFileForEventId = item.id;
    const fileInput = document.getElementById('posterUpload') as HTMLInputElement;
    fileInput?.click();
  }

  // ✅ Create Event Modal Methods
  openCreateModal() {
    this.showCreateModal = true;
    this.newEvent = {};
    this.imagePreview = null;
  }

get filteredEvents(): EventItem[] {
    if (this.activeTab === 'upcoming') return this.events.filter(e => e.status !== 'COMPLETED');
    if (this.activeTab === 'past') return this.events.filter(e => e.status === 'COMPLETED');
    return this.events;
  }

 

  closeCreateModal() {
    this.showCreateModal = false;
  }

  onPosterChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  createEvent() {
    if (!this.newEvent.title || !this.newEvent.date || !this.imagePreview) {
      alert('Please fill all required fields and upload a poster.');
      return;
    }

    const newId = this.events.length + 1;
    const created: EventItem = {
      id: newId,
      title: this.newEvent.title!,
      date: this.newEvent.date!,
      attendees: 0,
      revenue: 0,
      status: 'UPCOMING',
      image: this.imagePreview!,
      category: this.newEvent.category || 'General',
      description: this.newEvent.description || ''
    };

    this.events.unshift(created);
    this.closeCreateModal();
    alert('Event created successfully!');
  }

  deleteEvent(event: EventItem) {
    if (confirm(`Delete event "${event.title}"?`)) {
      this.events = this.events.filter(e => e.id !== event.id);
    }
  }

}
