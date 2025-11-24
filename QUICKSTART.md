# Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 in your browser

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deploy to GitHub Pages

### One-Time Setup

1. **Create a GitHub repository** and push your code:
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
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Done!** Your site will automatically deploy on every push to main
   - View your site at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# Upload the contents of the 'dist' folder to your hosting service
```

## Features

- ✅ Create reminders with amounts, due dates, and categories
- ✅ Set recurring patterns (monthly, quarterly, annually, or custom)
- ✅ **Custom recurrence**: Repeat every X days (e.g., 14 for bi-weekly)
- ✅ **Dark mode**: Toggle with the moon/sun button in the header
- ✅ Visual notifications for upcoming and overdue reminders
- ✅ Search and filter by category
- ✅ Track completion history
- ✅ Responsive design for mobile and desktop
- ✅ Local storage - your data stays private

## Usage Tips

1. **Create a reminder:** Fill out the form and click "Save Reminder"
2. **Custom recurrence:** Select "Custom" from the recurrence dropdown and enter the number of days (e.g., 14 for bi-weekly, 7 for weekly)
3. **Toggle dark mode:** Click the moon/sun button in the header to switch themes
4. **Edit a reminder:** Click the "Edit" button on any reminder
5. **Mark as complete:** Click "Mark Complete" - recurring reminders will automatically advance to the next due date
6. **Delete a reminder:** Click "Delete" and confirm
7. **Filter reminders:** Use the search box or category dropdown
8. **Dismiss notifications:** Click "Dismiss" on any notification (the reminder stays active)

Enjoy managing your reminders! 🎉
