import type { ReminderInput, ValidationResult } from '../models/types';

export class ValidationService {
  validateReminderInput(data: ReminderInput): ValidationResult {
    const errors: { field: string; message: string }[] = [];

    // Validate name
    if (!this.validateRequired(data.name)) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    // Validate amount
    if (!this.validateAmount(data.amount)) {
      errors.push({ field: 'amount', message: 'Amount must be a positive number' });
    }

    // Validate due date
    if (!this.validateDate(data.dueDate)) {
      errors.push({ field: 'dueDate', message: 'Valid due date is required' });
    }

    // Validate category
    if (!this.validateRequired(data.category)) {
      errors.push({ field: 'category', message: 'Category is required' });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  validateRequired(value: string | undefined): boolean {
    return value !== undefined && value !== null && value.trim().length > 0;
  }

  validateAmount(amount: number): boolean {
    return typeof amount === 'number' && !isNaN(amount) && amount > 0;
  }

  validateDate(dateString: string): boolean {
    if (!dateString || dateString.trim().length === 0) {
      return false;
    }

    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
