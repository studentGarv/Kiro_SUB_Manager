# Project Structure

## Architecture Pattern

Component-based architecture with centralized state management and service layer separation.

## Folder Organization

```
src/
├── components/          # UI components (ReminderForm, ReminderList, etc.)
├── models/             # Type definitions and interfaces
├── services/           # Business logic and state management
│   ├── AppState.ts     # Centralized state with pub/sub pattern
│   ├── ReminderService.ts
│   ├── StorageService.ts
│   ├── ValidationService.ts
│   └── RecurrenceCalculator.ts
├── styles/             # CSS files
├── utils/              # Utility functions (error handling, etc.)
└── main.ts             # Application entry point

tests/                  # Test files
```

## Key Conventions

- **Components**: Classes that manage DOM rendering and user interactions. Accept services and state as constructor dependencies.
- **Services**: Stateless business logic classes (except AppState which manages global state).
- **State Management**: Centralized AppState with subscriber pattern. Components subscribe to state changes and re-render.
- **Types**: All domain types defined in `models/types.ts` with type guards for runtime validation.
- **Error Handling**: Centralized ErrorHandler utility for consistent error logging.
- **Storage**: StorageService abstracts localStorage operations with JSON serialization.

## Component Pattern

Components follow this structure:
1. Accept dependencies via constructor (services, state, callbacks)
2. Render method updates DOM based on data
3. Event handlers delegate to services
4. Subscribe to AppState for reactive updates

## Naming Conventions

- PascalCase for classes and types
- camelCase for variables and functions
- Descriptive names (e.g., `ReminderService`, `FilterCriteria`)
- Private methods prefixed with `private` keyword
