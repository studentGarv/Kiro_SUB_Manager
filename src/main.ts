import { ReminderService } from './services/ReminderService';
import { AppState } from './services/AppState';
import { ReminderForm } from './components/ReminderForm';
import { ReminderList } from './components/ReminderList';
import { NotificationPanel } from './components/NotificationPanel';
import { FilterBar } from './components/FilterBar';
import type { Reminder } from './models/types';

class App {
  private reminderService: ReminderService;
  private appState: AppState;
  private reminderForm: ReminderForm;
  private reminderList: ReminderList;
  private notificationPanel: NotificationPanel;
  private filterBar: FilterBar;
  private deleteModal: HTMLElement;
  private pendingDeleteId: string | null = null;

  constructor() {
    this.reminderService = new ReminderService();
    this.appState = new AppState();

    // Initialize components
    this.reminderForm = new ReminderForm(this.reminderService, this.appState);
    this.reminderList = new ReminderList(
      this.reminderService,
      this.appState,
      (reminder) => this.handleEdit(reminder),
      (id) => this.showDeleteConfirmation(id)
    );
    this.notificationPanel = new NotificationPanel(this.reminderService, this.appState);
    this.filterBar = new FilterBar(this.appState);

    this.deleteModal = document.getElementById('delete-modal') as HTMLElement;

    this.setupDeleteModal();
    this.setupStateSubscription();
    this.loadInitialData();
  }

  private setupDeleteModal(): void {
    const confirmBtn = document.getElementById('confirm-delete-btn');
    const cancelBtn = document.getElementById('cancel-delete-btn');

    confirmBtn?.addEventListener('click', () => this.confirmDelete());
    cancelBtn?.addEventListener('click', () => this.cancelDelete());

    // Close modal on background click
    this.deleteModal.addEventListener('click', (e) => {
      if (e.target === this.deleteModal) {
        this.cancelDelete();
      }
    });
  }

  private setupStateSubscription(): void {
    this.appState.subscribe(() => {
      this.render();
    });
  }

  private loadInitialData(): void {
    const reminders = this.reminderService.getAllReminders();
    this.appState.setReminders(reminders);
  }

  private render(): void {
    const state = this.appState.getState();
    
    // Apply filters
    let reminders = state.reminders;
    if (Object.keys(state.filters).length > 0) {
      reminders = this.reminderService.filterReminders(state.filters);
    }

    // Render components
    this.reminderList.render(reminders);
    this.notificationPanel.render();

    // Handle editing state
    if (state.editingReminderId) {
      const reminder = reminders.find(r => r.id === state.editingReminderId);
      if (reminder) {
        this.reminderForm.populateForm(reminder);
        this.scrollToForm();
      }
    }
  }

  private handleEdit(reminder: Reminder): void {
    this.appState.setEditingReminder(reminder.id);
  }

  private showDeleteConfirmation(id: string): void {
    this.pendingDeleteId = id;
    this.deleteModal.classList.add('active');
  }

  private confirmDelete(): void {
    if (this.pendingDeleteId) {
      try {
        this.reminderService.deleteReminder(this.pendingDeleteId);
        this.appState.setReminders(this.reminderService.getAllReminders());
        this.pendingDeleteId = null;
        this.deleteModal.classList.remove('active');
      } catch (error) {
        console.error('Failed to delete reminder', error);
        alert('Failed to delete reminder. Please try again.');
      }
    }
  }

  private cancelDelete(): void {
    this.pendingDeleteId = null;
    this.deleteModal.classList.remove('active');
  }

  private scrollToForm(): void {
    const formSection = document.getElementById('reminder-form-section');
    formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
