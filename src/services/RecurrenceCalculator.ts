import { addMonths, addYears, addDays } from 'date-fns';
import type { Reminder } from '../models/types';

export class RecurrenceCalculator {
  calculateNextOccurrence(reminder: Reminder): Date {
    const currentDueDate = reminder.dueDate;

    switch (reminder.recurrence) {
      case 'monthly':
        return addMonths(currentDueDate, 1);
      
      case 'quarterly':
        return addMonths(currentDueDate, 3);
      
      case 'semi-annually':
        return addMonths(currentDueDate, 6);
      
      case 'annually':
        return addYears(currentDueDate, 1);
      
      case 'custom':
        if (reminder.customRecurrenceDays && reminder.customRecurrenceDays > 0) {
          return addDays(currentDueDate, reminder.customRecurrenceDays);
        }
        return currentDueDate;
      
      case 'one-time':
        return currentDueDate;
      
      default:
        return currentDueDate;
    }
  }

  generateOccurrences(reminder: Reminder, count: number): Date[] {
    const occurrences: Date[] = [];
    let currentDate = reminder.dueDate;

    for (let i = 0; i < count; i++) {
      occurrences.push(currentDate);
      
      if (reminder.recurrence === 'one-time') {
        break;
      }

      const tempReminder = { ...reminder, dueDate: currentDate };
      currentDate = this.calculateNextOccurrence(tempReminder);
    }

    return occurrences;
  }
}
