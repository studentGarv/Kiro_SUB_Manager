export class ThemeManager {
  private static STORAGE_KEY = 'reminder-manager-theme';
  private themeToggleBtn: HTMLButtonElement;
  private themeIcon: HTMLElement;

  constructor() {
    this.themeToggleBtn = document.getElementById('theme-toggle') as HTMLButtonElement;
    this.themeIcon = document.getElementById('theme-icon') as HTMLElement;
    
    this.loadTheme();
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(ThemeManager.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    this.applyTheme(theme);
  }

  private toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    localStorage.setItem(ThemeManager.STORAGE_KEY, newTheme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}
