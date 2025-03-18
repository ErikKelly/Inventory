# Google Sheet Inventory Webpage 

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
### Step 3: Create your repository

1. To to your https://github.com/ account and create a new repository for your-site-name 

2. In this new GitHub repository, go to Settings > Pages

3. Set Source to "GitHub Actions"

4. Go to Settings > Actions > General

5. Scroll down to "Workflow permissions"

6. Select "Read and write permissions" and save your changes.

### Step 4: First push to your repository

1. Back in your code, remove the existing Git history:
```bash
rm -rf .git
```

2. Initialize a new Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
```

3. Connect your local repository to GitHub:
```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### Step 5: Set up your Google Sheet

1. Create a Google Sheet with your data
2. Make sure the sheet is published to the web:
   - In your Google Sheet, go to File > Share > Publish to web
   - Click "Publish" and select the entire document
   - Make sure it's set to "Link" and not "Embed"
3. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`) for the following configs

### Step 6: Customize your site configuration

1. The main configuration file is located at `src/config/siteConfig.ts`. Open this file and update the following settings:

```typescript
// src/config/siteConfig.ts

// Site information
export const SITE_NAME = "Your Site Name";

// Google Sheet configuration - add your own Google Sheet ID
export const SHEET_ID = "your-google-sheet-id";
export const SHEET_TABS = "Tab1, Tab2, Tab3";

// UI Colors - customize the look and feel
export const PRIMARY_COLOR = "rgb(75, 31, 31)";
```

The key values you should change are:
- `SITE_NAME`: The name of your site
- `SHEET_ID`: Your Google Sheet ID (found in the sheet URL)
- `SHEET_TABS`: Comma-separated list of your sheet tab names
- `PRIMARY_COLOR`: Main color theme (adjust to your preference)

2. If you're using github pages to host your site, update the repo-path.js value. Else, if using a custom url, you can leave it as is. 
```typescript
const REPO_PATH = "/your-site-name";
```

### Step 7: Update your github repository

1. To to your https://github.com/your-username/your-site-name 

2. In this new GitHub repository, go to Settings > Pages

4. Now set Build and deployment to "Deploy from a branch"

5. Under Branch, make sure "gh-pages" is selected, not "Main"

### Step 8: Push code changes

1. Back in your code, push the changes to your configs to github
```bash
git add .
git commit -m "Second commit"
git push -u origin main
```

2. Wait for the GitHub Action to complete (check the Actions tab in your repository to view status)

3. Your site will be available at `https://your-username.github.io/your-repo-name/`

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