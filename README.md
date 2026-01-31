# Tech Dream Africa Website

A fully functional, multi-page technology company website built with HTML, Tailwind CSS, and Firebase.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Multi-Page Structure**: Home, About, Services, Portfolio, and Contact pages
- **Modern UI**: Built with Tailwind CSS for a clean, professional look
- **Interactive Elements**: Smooth animations, hover effects, and transitions
- **Firebase Integration**: Contact form submissions stored in Firebase Firestore
- **SEO Optimized**: Meta tags and semantic HTML structure
- **Fast Loading**: Optimized assets and lazy loading
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Portfolio Filtering**: Interactive project filtering by category
- **FAQ Accordion**: Expandable FAQ section
- **Social Media Integration**: Links to social media profiles

## 📁 Project Structure

```
website/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── portfolio.html          # Portfolio/Projects page
├── contact.html            # Contact page with form
├── CNAME                   # Custom domain configuration
├── css/
│   └── style.css          # Custom CSS styles
└── js/
    ├── main.js            # Main JavaScript functionality
    ├── portfolio.js       # Portfolio filtering logic
    ├── firebase-config.js # Firebase configuration
    └── contact.js         # Contact form handler
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)**: Interactive functionality
- **Firebase**: Backend services (Firestore database)
- **Font Awesome**: Icons
- **Google Fonts**: Typography (via Tailwind)

## 📋 Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select an existing one)
3. Click on the web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Tech Dream Africa Website")
5. Copy the Firebase configuration object

### 2. Configure Firebase

1. Open `js/firebase-config.js`
2. Replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

### 3. Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development) or **production mode**
4. Select a location for your database
5. The database will be created with a `contacts` collection automatically when the first form is submitted

### 4. Security Rules (Important!)

For production, set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{document} {
      // Allow anyone to create a contact submission
      allow create: if request.auth == null;
      // Only authenticated admins can read contacts
      allow read: if request.auth != null;
    }
  }
}
```

### 5. Local Development

1. Open `index.html` in a web browser, or
2. Use a local server (recommended):

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

3. Visit `http://localhost:8000` (or the port shown)

### 6. Deployment Options

#### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select the branch to deploy (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

#### Netlify
1. Sign up at [netlify.com](https://www.netlify.com/)
2. Drag and drop your project folder
3. Or connect your GitHub repository for automatic deployments

#### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```

#### Custom Domain (using CNAME)
- Your `CNAME` file is already configured for `techdreamafrica.org`
- Update your domain's DNS settings to point to your hosting provider
- Follow your hosting provider's instructions for custom domain setup

## 🎨 Customization

### Colors
The website uses a custom color scheme defined in Tailwind config:
- **Primary**: Blue (#1e40af)
- **Secondary**: Cyan (#0ea5e9)
- **Accent**: Amber (#f59e0b)

To change colors, update the Tailwind configuration in each HTML file:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#YOUR_COLOR',
                secondary: '#YOUR_COLOR',
                accent: '#YOUR_COLOR',
            }
        }
    }
}
```

### Content
- Update text content directly in the HTML files
- Modify team member information in `about.html`
- Add/remove portfolio projects in `portfolio.html`
- Update service offerings in `services.html`

### Images
To add actual images:
1. Create an `images/` folder
2. Add your images
3. Replace icon placeholders with `<img>` tags

## 📧 Contact Form

The contact form automatically saves submissions to Firebase Firestore with the following data:
- Name
- Email
- Phone (optional)
- Company (optional)
- Service interested in
- Message
- Timestamp
- Status

### Viewing Submissions
1. Go to Firebase Console
2. Navigate to Firestore Database
3. View the `contacts` collection

### Email Notifications (Optional)
To receive email notifications when someone submits the form:
1. Set up Firebase Cloud Functions
2. Use a service like SendGrid, Mailgun, or Nodemailer
3. Trigger the email function when a new document is added to `contacts`

## 🔒 Security Considerations

1. **Never commit Firebase keys to public repositories** (if using version control)
2. Set up proper Firestore security rules
3. Enable reCAPTCHA for the contact form (optional but recommended)
4. Use environment variables for sensitive data in production
5. Enable CORS if deploying to a custom domain

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Firebase Not Working
- Check browser console for errors
- Verify Firebase configuration is correct
- Ensure Firestore is enabled in Firebase Console
- Check Firestore security rules

### Styles Not Loading
- Check if Tailwind CDN is accessible
- Verify `css/style.css` path is correct
- Clear browser cache

### Mobile Menu Not Working
- Check if `js/main.js` is loading
- Verify mobile menu button ID matches JavaScript selector

## 📝 License

This project is created for Tech Dream Africa. All rights reserved.

## 👥 Credits

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Backend powered by [Firebase](https://firebase.google.com/)

## 📞 Support

For questions or support, contact:
- Email: info@techdreamafrica.org
- Website: techdreamafrica.org

---

**Tech Dream Africa** - Empowering Africa Through Technology