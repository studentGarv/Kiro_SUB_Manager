import type { FilterCriteria, ReminderCategory } from '../models/types';
import { AppState } from '../services/AppState';

export class FilterBar {
  private searchInput: HTMLInputElement;
  private categoryFilter: HTMLSelectElement;
  private clearButton: HTMLButtonElement;
  private appState: AppState;
  private debounceTimer: number | null = null;

  constructor(appState: AppState) {
    this.appState = appState;
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;
    this.categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
    this.clearButton = document.getElementById('clear-filters-btn') as HTMLButtonElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Debounced search input
    this.searchInput.addEventListener('input', () => {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      this.debounceTimer = window.setTimeout(() => {
        this.updateFilters();
      }, 300);
    });

    // Category filter
    this.categoryFilter.addEventListener('change', () => {
      this.updateFilters();
    });

    // Clear filters button
    this.clearButton.addEventListener('click', () => {
      this.clearFilters();
    });
  }

  private updateFilters(): void {
    const filters: FilterCriteria = {};

    const searchText = this.searchInput.value.trim();
    if (searchText) {
      filters.searchText = searchText;
    }

    const category = this.categoryFilter.value;
    if (category) {
      filters.category = category as ReminderCategory;
    }

    this.appState.setFilters(filters);
  }

  private clearFilters(): void {
    this.searchInput.value = '';
    this.categoryFilter.value = '';
    this.appState.setFilters({});
  }
}
