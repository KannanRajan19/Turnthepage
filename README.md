# Turn The Page Club Website

A sleek, book-themed website for Turn The Page Club - a youth-led non-profit focused on book donations, reading programs, and literacy mentoring.

**Website:** turnthepageclub.org

---

## Table of Contents
- [Quick Start](#quick-start)
- [File Structure](#file-structure)
- [How to Edit Content](#how-to-edit-content)
- [Adding Team Members](#adding-team-members)
- [Updating Images](#updating-images)
- [Form Setup](#form-setup)
- [Deploying Updates](#deploying-updates)
- [Color Reference](#color-reference)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

To view the website locally:
1. Navigate to the `TurnThePage` folder
2. Double-click `index.html` to open it in your browser
3. Use the navigation to browse all pages

---

## File Structure

```
TurnThePage/
├── index.html          # Home page
├── about.html          # About Us page
├── programs.html       # Programs/What We Do page
├── register.html       # Get Involved/Registration forms
├── donate.html         # Donation page
├── contact.html        # Contact page
├── css/
│   ├── styles.css      # Main styles (colors, layout, components)
│   ├── animations.css  # Hover effects and animations
│   └── responsive.css  # Mobile/tablet responsiveness
├── js/
│   ├── main.js         # Navigation and interactions
│   └── forms.js        # Form validation
├── images/
│   ├── logo.svg        # Website logo
│   ├── hero-books.svg  # Hero section illustration
│   ├── piggy-bank.svg  # Donate page icon
│   ├── founders/       # Team photos (add .jpg/.png files here)
│   └── icons/          # Program and UI icons
└── README.md           # This file
```

---

## How to Edit Content

### Basic Text Editing

1. Open the HTML file you want to edit (e.g., `about.html`) in a text editor
   - **Recommended:** Visual Studio Code (free), Notepad++, or Sublime Text
   - **Simple option:** Right-click the file → Open with → Notepad

2. Find the text you want to change
   - Use **Ctrl+F** (or Cmd+F on Mac) to search

3. Edit the text between the HTML tags
   ```html
   <!-- Before -->
   <p>We believe every child deserves access to books.</p>

   <!-- After -->
   <p>We believe every child deserves the joy of reading.</p>
   ```

4. Save the file (**Ctrl+S** or Cmd+S)

5. Refresh your browser to see changes

### Editing Statistics (Home Page)

Find the stats section in `index.html`:
```html
<span class="stat-number">500+</span>
<span class="stat-label">Books Donated</span>
```
Change the numbers as needed (keep the `+` symbol for approximate values).

### Editing the Timeline (About Page)

Each timeline item in `about.html` follows this pattern:
```html
<div class="timeline-item animate-on-scroll">
    <div class="timeline-content">
        <span class="timeline-date">2024</span>
        <h4>Milestone Title</h4>
        <p>Description of what happened.</p>
    </div>
</div>
```

To add a new milestone, copy this block and paste it before the closing `</div>` of the timeline section.

---

## Adding Team Members

### Adding a Founder (About Page)

1. Open `about.html`
2. Find the `team-grid` section under "Our Founders"
3. Copy an existing `team-card` block:

```html
<div class="team-card animate-on-scroll animate-fade-up">
    <div class="team-photo-placeholder">
        <!-- SVG icon shown when no photo -->
    </div>
    <h4>Name</h4>
    <p class="team-role">Role/Title</p>
    <p class="team-bio">Short bio description.</p>
</div>
```

### Adding a Photo

1. Save the photo to `images/founders/` (name it simply, e.g., `sahana.jpg`)
2. Replace the placeholder with an image:

```html
<div class="team-card animate-on-scroll animate-fade-up">
    <img src="images/founders/sahana.jpg" alt="Sahana" class="team-photo">
    <h4>Sahana</h4>
    <p class="team-role">Co-Founder & President</p>
    <p class="team-bio">Passionate about education equity...</p>
</div>
```

**Photo Tips:**
- Square images work best (e.g., 300x300 pixels)
- Keep file sizes under 500KB for fast loading
- Use `.jpg` for photos, `.png` for images with transparency

---

## Updating Images

### Replacing the Logo

1. Create your new logo as an SVG file (recommended) or PNG
2. Name it `logo.svg` (or `logo.png`)
3. Replace the existing file in `images/logo.svg`

### Adding New Icons

1. Save the icon to `images/icons/`
2. Reference it in HTML:
```html
<img src="images/icons/your-icon.svg" alt="Description" class="program-icon">
```

---

## Form Setup

### Setting Up Formspree (Contact Form)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your form ID (looks like `f/xyzabc123`)
3. In each HTML file with a form, replace `your-form-id` with your actual ID:

```html
<!-- Find this line -->
<form action="https://formspree.io/f/your-form-id" method="POST">

<!-- Change to -->
<form action="https://formspree.io/f/xyzabc123" method="POST">
```

Update forms in:
- `contact.html` - Contact form
- `register.html` - Volunteer, book request, and program forms

### Setting Up PayPal Donations

1. Log into [PayPal Business](https://www.paypal.com/business)
2. Go to PayPal Buttons → Donate Button
3. Customize your button and copy the code
4. In `donate.html`, replace the placeholder button with your PayPal code

### Setting Up Newsletter (Mailchimp)

1. Create a free [Mailchimp](https://mailchimp.com) account
2. Create an audience and get your embedded form code
3. Replace the newsletter form in `contact.html` with your Mailchimp code

---

## Deploying Updates

### Using Netlify (Recommended)

**First-time setup:**
1. Create a free account at [netlify.com](https://netlify.com)
2. Drag and drop the entire `TurnThePage` folder onto the Netlify dashboard
3. Your site will be live at a random URL (e.g., `happy-beaver-123.netlify.app`)

**Connecting your domain (turnthepageclub.org):**
1. In Netlify, go to Domain Settings → Add Custom Domain
2. Enter `turnthepageclub.org`
3. Follow Netlify's instructions to update your GoDaddy DNS settings

**Updating the site:**
1. Make your changes locally
2. Test by opening `index.html` in your browser
3. Drag and drop the updated folder onto Netlify

### Alternative: GitHub Deployment

1. Create a GitHub account and repository
2. Upload your files to the repository
3. Connect Netlify to your GitHub repo
4. Changes pushed to GitHub will automatically deploy

---

## Color Reference

The website uses these colors (defined in `css/styles.css`):

| Color | Hex Code | Usage |
|-------|----------|-------|
| Forest Green | `#1B4332` | Primary color, buttons, headers |
| Dark Forest Green | `#14342A` | Hover states, footer |
| Cream | `#FDF6E3` | Background, paper texture |
| Gold | `#D4A574` | Accents, highlights |
| Dark Green-Gray | `#2D3B35` | Text color |

To change colors, edit the `:root` section at the top of `css/styles.css`.

---

## Troubleshooting

### Images Not Showing
- Check the file path is correct (case-sensitive!)
- Make sure the image file exists in the specified folder
- Verify the file extension matches (`.jpg` vs `.jpeg` vs `.png`)

### Styles Not Updating
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Make sure you saved the CSS file
- Check for typos in CSS

### Forms Not Working
- Verify your Formspree ID is correct
- Check that forms have `data-validate` and `data-ajax` attributes
- Test with a simple submission first

### Navigation Not Working on Mobile
- Make sure `js/main.js` is loaded
- Check browser console for JavaScript errors (F12 → Console tab)

### Page Looks Different on Phone
- The site is responsive - it adapts to screen size
- Test using browser developer tools (F12 → Toggle device toolbar)

---

## Need Help?

If you run into issues:
1. Check this README for guidance
2. Search online for HTML/CSS tutorials (W3Schools is beginner-friendly)
3. For complex changes, consider reaching out to a web developer

---

## Credits

- **Design:** "The Reading Nook" book theme
- **Fonts:** Playfair Display, Lato (Google Fonts)
- **Icons:** Custom SVG illustrations
- **Built with:** Pure HTML, CSS, and JavaScript (no frameworks required)

---

*Made with love for literacy*
