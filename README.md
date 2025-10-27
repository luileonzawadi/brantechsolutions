# BranTech Solutions

A modern, full-stack web application for BranTech Solutions - a technology consulting company specializing in web development, digital innovation, and cutting-edge solutions.

## Features

### Frontend
- **Modern UI/UX**: Clean, responsive design with light/dark theme toggle
- **Interactive Blog System**: Dynamic blog with expandable cards and authentication
- **3D Animations**: Three.js powered visual effects and animations
- **Services Showcase**: Comprehensive services presentation with animations
- **Contact System**: Interactive contact forms and team showcase

### Backend (Django)
- **REST API**: Full CRUD operations for blogs, projects, and events
- **Admin Dashboard**: Comprehensive admin panel with analytics and user management
- **Authentication**: Secure login system with password protection
- **View Tracking**: Blog post engagement analytics
- **Data Management**: Export/import functionality for content

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS for styling
- Three.js for 3D graphics
- Font Awesome icons
- Animate.css for animations

### Backend
- Django 4.x
- Django REST Framework
- SQLite database
- Python 3.x

## Project Structure

```
brantechsolutions/
├── blog_backend/          # Django backend
│   ├── blog/             # Main blog app
│   ├── templates/        # HTML templates
│   └── media/           # Media files
├── images/              # Static images
├── js/                  # JavaScript files
├── partials/            # HTML partials
├── posts/               # Markdown blog posts
└── *.html              # Main HTML pages
```

## Installation & Setup

### Backend Setup
1. Navigate to blog_backend directory:
   ```bash
   cd blog_backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Open `index.html` in a web browser or serve with a local server
2. For development, use Live Server extension in VS Code

## Key Features

### Blog System
- Dynamic blog posts with CRUD operations
- View tracking and analytics
- Expandable card interface
- User authentication for full article access
- Admin dashboard for content management

### Admin Panel
- Password-protected access (default: "admin123")
- Analytics dashboard with view statistics
- User management system
- Content management (blogs, projects, events)
- Data export/import functionality

### Services
- Web Development
- Mobile App Development
- Digital Marketing
- Cloud Solutions
- Server Configurations

## API Endpoints

- `GET /api/blogs/` - List all blog posts
- `POST /api/blogs/` - Create new blog post
- `GET /api/blogs/{id}/` - Get specific blog post
- `PUT /api/blogs/{id}/` - Update blog post
- `DELETE /api/blogs/{id}/` - Delete blog post
- Similar endpoints for projects and events

## Authentication

### Blog Access
- Users must sign up/login to read full blog articles
- User data stored in localStorage
- Modal-based authentication system

### Admin Access
- Password-protected admin dashboard
- Access via header shield icon
- Default password: "admin123"

## Deployment

### Frontend
- Can be deployed to GitHub Pages, Netlify, or Vercel
- Static files ready for CDN deployment

### Backend
- Deploy to Heroku, DigitalOcean, or AWS
- Configure environment variables for production
- Set up PostgreSQL for production database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to BranTech Solutions.

## Contact

For questions or support, contact BranTech Solutions team.