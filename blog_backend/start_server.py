#!/usr/bin/env python
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_project.settings')
    
    # Setup Django
    django.setup()
    
    # Create migrations first
    print("Creating migrations...")
    try:
        execute_from_command_line(['manage.py', 'makemigrations'])
    except Exception as e:
        print(f"Migration creation warning: {e}")
    
    # Run migrations
    print("Running migrations...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Create superuser if it doesn't exist
    from django.contrib.auth.models import User
    if not User.objects.filter(username='admin').exists():
        print("Creating admin user...")
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Admin user created: username=admin, password=admin123")
    
    # Start server
    print("Starting Django server...")
    print("Admin panel: http://localhost:8000/api/admin-panel/")
    print("Django admin: http://localhost:8000/admin/")
    execute_from_command_line(['manage.py', 'runserver', '8000'])