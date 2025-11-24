# Design Document

## Overview

The Reminder Manager is a client-side web application built with modern web technologies. It provides a clean, intuitive interface for managing recurring financial reminders. The application uses browser local storage for data persistence, ensuring user data remains private and accessible offline. The architecture follows a component-based approach with clear separation between UI, business logic, and data storage layers.

## Architecture

The application follows a layered architecture:

1. **Presentation Layer**: HTML/CSS/JavaScript UI components that handle user interactions and display
2. **Business Logic Layer**: Core reminder management logic including validation, recurrence calculation, and notification logic
3. **Data Access Layer**: Local storage interface for persisting and retrieving reminder data
4. **State Management**: Centralized state management for reactive UI updates

The application is a Single Page Application (SPA) that runs entirely in the browser without requiring a backend server.

## Components and Interfaces

### UI Components

**ReminderForm Component**
- Purpose: Create and edit reminders
- Inputs: Reminder data (name, amount, due date, category, recurrence, notes)
- Outputs: Validated reminder object
- Responsibilities: Form validation, user input handling, date selection

**ReminderList Component**
- Purpose: Display all reminders in a sortable list
- Inputs: Array of reminder objects, filter criteria
- Outputs: User actions (edit, delete, mark complete)
- Responsibilities: Rendering reminders, sorting, filtering, visual status indicators

**NotificationPanel Component**
- Purpose: Display upcoming and overdue reminders
- Inputs: Array of reminders, current date
- Outputs: Dismissed notification events
- Responsibilities: Calculate days until due, highlight overdue items, dismissal handling

**FilterBar Component**
- Purpose: Provide search and category filtering
- Inputs: User search text, selected category
- Outputs: Filter criteria object
- Responsibilities: Search input handling, category selection, filter state management

### Business Logic Modules

**ReminderService**
```typescript
interface ReminderService {
  createReminder(data: ReminderInput): Reminder
  updateReminder(id: string, data: Partial<ReminderInput>): Reminder
  deleteReminder(id: string): void
  markComplete(id: string): Reminder
  getAllReminders(): Reminder[]
  getUpcomingReminders(daysAhead: number): Reminder[]
  getOverdueReminders(): Reminder[]
  filterReminders(criteria: FilterCriteria): Reminder[]
}
```

**RecurrenceCalculator**
```typescript
interface RecurrenceCalculator {
  calculateNextOccurrence(reminder: Reminder): Date
  generateOccurrences(reminder: Reminder, count: number): Date[]
}
```

**ValidationService**
```typescript
interface ValidationService {
  validateReminderInput(data: ReminderInput): ValidationResult
  validateDate(date: string): boolean
  validateAmount(amount: number): boolean
}
```

### Data Access Layer

**StorageService**
```typescript
interface StorageService {
  saveReminder(reminder: Reminder): void
  getReminder(id: string): Reminder | null
  getAllReminders(): Reminder[]
  updateReminder(id: string, reminder: Reminder): void
  deleteReminder(id: string): void
}
```

## Data Models

### Reminder
```typescript
interface Reminder {
  id: string                    // Unique identifier (UUID)
  name: string                  // Reminder name/description
  amount: number                // Payment amount
  dueDate: Date                 // Next due date
  category: ReminderCategory    // Classification
  recurrence: RecurrencePattern // Repeat pattern
  notes?: string                // Optional user notes
  status: ReminderStatus        // Current status
  completionHistory: CompletionRecord[]  // Past completions
  createdAt: Date              // Creation timestamp
  updatedAt: Date              // Last modification timestamp
}

type ReminderCategory = 'subscription' | 'tax' | 'insurance' | 'utility' | 'other'

type RecurrencePattern = 'one-time' | 'monthly' | 'quarterly' | 'annually'

type ReminderStatus = 'active' | 'completed' | 'overdue'

interface CompletionRecord {
  completedAt: Date
  originalDueDate: Date
}

interface ReminderInput {
  name: string
  amount: number
  dueDate: string
  category: ReminderCategory
  recurrence: RecurrencePattern
  notes?: string
}

interface FilterCriteria {
  searchText?: string
  category?: ReminderCategory
  status?: ReminderStatus
}

interface ValidationResult {
  isValid: boolean
  errors: { field: string; message: string }[]
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Reminder creation and persistence round-trip
*For any* valid reminder input data (name, amount, due date, category, recurrence, optional notes), creating a reminder and then retrieving it from storage should return a reminder with all the same field values.
**Validates: Requirements 1.1, 1.4, 1.5**

### Property 2: Recurrence pattern calculation correctness
*For any* reminder with a recurrence pattern (monthly, quarterly, annually), calculating the next occurrence from a given due date should advance the date by exactly the period specified by the pattern (1 month, 3 months, or 12 months respectively).
**Validates: Requirements 1.2**

### Property 3: Validation rejects incomplete input
*For any* reminder input data with one or more required fields missing (name, amount, due date, or category), validation should fail and return error messages identifying each missing field.
**Validates: Requirements 1.3**

### Property 4: Reminder list sorting by due date
*For any* collection of reminders, retrieving the active reminders list should return them ordered by due date in ascending order (earliest first).
**Validates: Requirements 2.1**

### Property 5: Rendered reminders contain required information
*For any* reminder, the rendered output should contain the reminder's name, amount, due date, category, and calculated days until due (or days overdue).
**Validates: Requirements 2.2, 6.3**

### Property 6: Status-based visual distinction
*For any* reminder, the rendered output should include different visual indicators (CSS classes or attributes) based on its status (overdue, upcoming, completed), ensuring each status is visually distinguishable.
**Validates: Requirements 2.3, 5.3, 6.2**

### Property 7: UI state reactivity
*For any* change to the reminder data (create, update, delete, complete), the UI state should update to reflect the change without requiring manual refresh.
**Validates: Requirements 2.5**

### Property 8: Edit form pre-population
*For any* existing reminder, triggering the edit action should populate the form fields with the reminder's current values.
**Validates: Requirements 3.1**

### Property 9: Update persistence
*For any* existing reminder and any valid field modifications, saving the update should result in the stored reminder reflecting all the new values.
**Validates: Requirements 3.2**

### Property 10: Edit cancellation preserves original
*For any* reminder being edited, making changes and then canceling should leave the stored reminder unchanged from its original state.
**Validates: Requirements 3.3**

### Property 11: Update preserves completion history
*For any* recurring reminder with completion history, updating the reminder's details should preserve all existing completion records.
**Validates: Requirements 3.4**

### Property 12: Deletion removes from storage
*For any* reminder, confirming deletion should result in the reminder no longer existing in storage and no longer appearing in any displayed lists.
**Validates: Requirements 4.2, 4.4**

### Property 13: Deletion cancellation preserves reminder
*For any* reminder, triggering delete and then canceling should leave the reminder unchanged in storage.
**Validates: Requirements 4.3**

### Property 14: Completion records tracking
*For any* reminder, marking it as completed should add a completion record with the current date and update the reminder's status.
**Validates: Requirements 5.1**

### Property 15: Recurring reminder advancement
*For any* recurring reminder (monthly, quarterly, annually), marking it as completed should advance the due date by exactly one period according to its recurrence pattern.
**Validates: Requirements 5.2**

### Property 16: Completion history display
*For any* reminder with completion records, displaying the history should show all completion records with their dates.
**Validates: Requirements 5.4**

### Property 17: Upcoming notifications filtering
*For any* collection of reminders and current date, the upcoming notifications should include only reminders with due dates within the next 7 days.
**Validates: Requirements 6.1**

### Property 18: Notification dismissal preserves reminder
*For any* reminder, dismissing its notification should hide it from the notifications area while the reminder remains active in storage.
**Validates: Requirements 6.4**

### Property 19: Category filter correctness
*For any* collection of reminders and selected category, applying the category filter should return only reminders matching that category.
**Validates: Requirements 7.1**

### Property 20: Search text filtering
*For any* collection of reminders and search text, the filtered results should include only reminders whose names contain the search text (case-insensitive).
**Validates: Requirements 7.2**

### Property 21: Filter clearing restores full list
*For any* collection of reminders with active filters, clearing all filters should return the complete set of reminders.
**Validates: Requirements 7.3**

## Error Handling

The application implements comprehensive error handling at multiple levels:

### Validation Errors
- Input validation occurs before any data operations
- Validation errors are collected and presented to users with specific field-level messages
- Invalid operations are prevented from executing

### Storage Errors
- Local storage quota exceeded: Display warning and suggest deleting old reminders
- Storage unavailable: Display error message and operate in memory-only mode
- Data corruption: Attempt recovery, fallback to empty state if necessary

### Date Calculation Errors
- Invalid date inputs: Reject with validation error
- Date parsing failures: Display user-friendly error message
- Timezone handling: Use local timezone consistently throughout application

### UI Error States
- Failed operations: Display error messages with retry options
- Network unavailable (future enhancement): Queue operations for later sync
- Unexpected errors: Log to console, display generic error message, allow user to continue

## Testing Strategy

The application will use a dual testing approach combining unit tests and property-based tests to ensure comprehensive correctness validation.

### Property-Based Testing

We will use **fast-check** (for JavaScript/TypeScript) as our property-based testing library. Property-based tests will verify that the correctness properties defined above hold across a wide range of randomly generated inputs.

**Configuration:**
- Each property-based test will run a minimum of 100 iterations
- Each test will be tagged with a comment referencing its corresponding correctness property
- Tag format: `// Feature: reminder-manager, Property {number}: {property_text}`

**Property Test Coverage:**
- All 21 correctness properties will have corresponding property-based tests
- Tests will use smart generators that produce valid reminder data within realistic constraints
- Edge cases (empty lists, boundary dates, maximum values) will be handled by the generators

**Generator Strategy:**
- `arbitraryReminder()`: Generates valid reminder objects with random but realistic data
- `arbitraryReminderInput()`: Generates valid input data for reminder creation
- `arbitraryIncompleteInput()`: Generates input with missing required fields
- `arbitraryDate()`: Generates dates within reasonable ranges (past 1 year to future 5 years)
- `arbitraryRecurrence()`: Generates recurrence patterns
- `arbitraryCategory()`: Generates reminder categories

### Unit Testing

Unit tests will complement property-based tests by verifying specific examples and integration points:

**Core Logic Tests:**
- Specific recurrence calculations (e.g., monthly from Jan 31 → Feb 28/29)
- Edge cases like leap years, month-end dates
- Specific validation scenarios

**Component Integration Tests:**
- Form submission workflows
- List rendering with specific data sets
- Filter and search with known inputs

**UI Interaction Tests:**
- Button click handlers
- Form input changes
- Modal dialogs

**Test Organization:**
- Tests co-located with source files using `.test.ts` suffix
- Test files mirror the structure of source files
- Shared test utilities in `tests/utils/` directory

### Testing Tools
- **Test Runner**: Vitest (fast, modern, ESM-native)
- **Property Testing**: fast-check
- **DOM Testing**: @testing-library/dom for UI component tests
- **Assertions**: Vitest's built-in assertions

### Test Execution
- Tests run on every code change during development
- All tests must pass before considering a task complete
- Property-based tests will catch edge cases that unit tests might miss
- Unit tests provide fast feedback on specific functionality

## Implementation Notes

### Technology Stack
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with CSS Grid and Flexbox for responsive layouts
- **TypeScript**: Type-safe JavaScript for better maintainability
- **Local Storage API**: Browser-native persistence
- **Date-fns**: Robust date manipulation library

### Browser Compatibility
- Target modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Graceful degradation for older browsers
- Feature detection for local storage availability

### Performance Considerations
- Lazy rendering for large reminder lists (virtual scrolling if needed)
- Debounced search input to avoid excessive filtering
- Efficient date calculations cached where appropriate
- Minimal DOM manipulation through efficient state updates

### Accessibility
- Semantic HTML elements (button, form, input, etc.)
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management for modals and forms
- Sufficient color contrast for visual indicators

### Future Enhancements
- Cloud sync across devices
- Email/SMS notifications
- Recurring reminder templates
- Budget tracking and analytics
- Import/export functionality
- Multi-currency support
