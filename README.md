# 🚀 WebDev Company - Apache SSI Website Template

Professional, dark-themed website template for web development companies using **Apache Server Side Includes (SSI)**.

---

## 📁 Project Structure

```
webdev-company/
├── index.shtml              # Main page
├── includes/                # SSI includes
│   ├── head.shtml           # Meta tags, CSS, fonts
│   ├── header.shtml         # Navigation header
│   ├── footer.shtml         # Footer
│   └── scripts.shtml        # JavaScript
├── css/                     # Stylesheets
│   ├── header.css           # Header styles
│   ├── footer.css           # Footer styles
│   └── style.css            # Main styles
├── js/                      # JavaScript
│   └── main.js              # Main script
├── images/                  # Images
│   ├── logo.png             # Company logo
│   ├── favicon.ico          # Favicon
│   ├── hero-bg.png          # Hero background
│   ├── portfolio/           # Portfolio images
│   ├── team/                # Team photos
│   └── icons/               # Custom icons
├── .htaccess                # Apache SSI config
└── README.md
```

---

## 🔧 Apache SSI Setup

### .htaccess (included)
```apache
Options +Includes
AddType text/html .shtml
AddOutputFilter INCLUDES .shtml
DirectoryIndex index.shtml
```

### SSI Syntax
```html
<!--#include file="includes/header.shtml" -->
<!--#include file="includes/footer.shtml" -->
<!--#echo var="DATE_LOCAL" -->
```

---

## 📄 Creating New Pages

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!--#include file="includes/head.shtml" -->
    <title>Page Title - YourCompany</title>
</head>
<body>
    <!--#include file="includes/header.shtml" -->

    <!-- Your content here -->

    <!--#include file="includes/footer.shtml" -->
    <!--#include file="includes/scripts.shtml" -->
</body>
</html>
```

---

## 🎨 Customization

### Colors (css/style.css)
```css
:root {
    --primary: #6366f1;        /* Main color */
    --primary-light: #818cf8;
    --bg-dark: #0a0a0a;        /* Background */
}
```

### Images
Add your images to the `images/` folder:
- `images/logo.png` - Company logo
- `images/portfolio/` - Portfolio screenshots
- `images/team/` - Team member photos

---

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

---

## 🛠️ Tech Stack

- HTML5 (SSI)
- CSS3 (Variables, Grid, Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Inter)

---

**Built with ❤️ by Electro**
