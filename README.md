# Reminder Manager

A web application for managing recurring financial reminders and subscriptions.

## Features

- Create and manage reminders for subscriptions, taxes, insurance, and other financial obligations
- Set recurring patterns (monthly, quarterly, annually, or custom intervals)
- **Custom recurrence**: Set reminders to repeat every X days (e.g., every 14 days for bi-weekly)
- **Dark mode**: Toggle between light and dark themes with automatic preference detection
- Visual notifications for upcoming and overdue reminders
- Filter and search functionality
- Responsive design for mobile and desktop
- Local storage for data persistence

## Development

### Prerequisites

- Node.js 20 or higher
- npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Build

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Instructions

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Navigate to **Pages** in the left sidebar
   - Under **Source**, select **GitHub Actions**

3. **Deploy:**
   - The GitHub Action will automatically run on push to main
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
# Then upload the contents of the dist folder to your hosting service
```

## License

MIT
