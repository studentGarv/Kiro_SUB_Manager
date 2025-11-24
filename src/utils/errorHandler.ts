export class ErrorHandler {
  static displayError(message: string, duration: number = 5000): void {
    const errorContainer = this.getOrCreateErrorContainer();
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-toast';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    errorContainer.appendChild(errorElement);

    // Auto-remove after duration
    setTimeout(() => {
      errorElement.remove();
    }, duration);
  }

  static logError(context: string, error: unknown): void {
    console.error(`[${context}]`, error);
    
    if (error instanceof Error) {
      this.displayError(error.message);
    } else {
      this.displayError('An unexpected error occurred');
    }
  }

  private static getOrCreateErrorContainer(): HTMLElement {
    let container = document.getElementById('error-container');
    
    if (!container) {
      container = document.createElement('div');
      container.id = 'error-container';
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(container);
    }

    return container;
  }
}

// Add error toast styles
const style = document.createElement('style');
style.textContent = `
  .error-toast {
    background-color: var(--danger-color);
    color: white;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-lg);
    min-width: 300px;
    max-width: 500px;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
