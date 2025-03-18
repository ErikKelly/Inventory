# Create Your Own Website with This Template

This repository contains a customizable Next.js website template that you can easily clone, modify with minimal configuration changes, and deploy to GitHub Pages as your own website.

## Getting Started

Follow these steps to create your own version of this website:

### Step 1: Clone this repository

```bash
git clone https://github.com/ErikKelly/Inventory.git your-site-name
cd your-site-name
```

### Step 2: Install dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Customize your site configuration

The main configuration file is located at `src/config/siteConfig.ts`. Open this file and update the following settings:

```typescript
// src/config/siteConfig.ts

// Site information
export const SITE_NAME = "Your Site Name";

// Google Sheet configuration - add your own Google Sheet ID
export const SHEET_ID = "your-google-sheet-id";
export const SHEET_TABS = "Tab1, Tab2, Tab3";

// UI Colors - customize the look and feel
export const PRIMARY_COLOR = "rgb(75, 31, 31)";

// Other site configuration...
```

The key values you should change are:
- `SITE_NAME`: The name of your site
- `SHEET_ID`: Your Google Sheet ID (found in the sheet URL)
- `SHEET_TABS`: Comma-separated list of your sheet tab names
- `PRIMARY_COLOR`: Main color theme (adjust to your preference)

### Step 4: Set up your Google Sheet

1. Create a Google Sheet with your data
2. Make sure the sheet is published to the web:
   - In your Google Sheet, go to File > Share > Publish to web
   - Click "Publish" and select the entire document
   - Make sure it's set to "Link" and not "Embed"
3. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
4. Update the `SHEET_ID` in your siteConfig.ts file

### Step 5: Update repository information

1. Remove the existing Git history:
```bash
rm -rf .git
```

2. Initialize a new Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Create a new repository on GitHub

4. Connect your local repository to GitHub:
```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### Step 6: Deploy to GitHub Pages

1. In your GitHub repository, go to Settings > Pages

2. Set Source to "GitHub Actions"

3. Push your code to GitHub, which will trigger the deployment workflow:
```bash
git push
```

4. Wait for the GitHub Action to complete (check the Actions tab in your repository)

5. Your site will be available at `https://your-username.github.io/your-repo-name/`

## Additional Customization

### Custom Domain

To use a custom domain:

1. Go to your repository's Settings > Pages
2. In the "Custom domain" section, add your domain
3. Create/update `public/CNAME` file with your domain name
4. Set up DNS records with your domain provider

### Modifying Components

If you want to further customize the appearance:

- Edit `/src/components/NavBar.tsx` to modify the navigation bar
- Update `/src/app/page.tsx` to change the home page content
- Modify styles in the relevant component files

### Adding New Pages

To add new pages:

1. Create new files in the `/src/app` directory
2. Follow the existing pattern in other pages

## Troubleshooting

### Images not displaying

- Check that your Google Sheet image URLs are direct links to images
- Make sure the images are publicly accessible
- For Google Drive images, use the format: `https://drive.google.com/uc?export=view&id=YOUR_FILE_ID`

### Data not loading

- Ensure your Google Sheet is published to the web
- Check that the Sheet ID and tab names are correct in siteConfig.ts
- Verify the column names in your sheet match what the code expects

### Deployment issues

- Check the GitHub Actions logs for any errors
- Make sure your repository is public (or you have GitHub Pages enabled for private repositories)

## Need Help?

Feel free to open an issue in this repository if you encounter any problems.

## License

This project is licensed under the MIT License - see the LICENSE file for details.