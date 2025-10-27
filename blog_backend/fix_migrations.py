#!/usr/bin/env python
import os
import sys
import django
from django.core.management import execute_from_command_line

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blog_project.settings')
    
    # Setup Django
    django.setup()
    
    print("Creating migrations...")
    execute_from_command_line(['manage.py', 'makemigrations'])
    
    print("Running migrations...")
    execute_from_command_line(['manage.py', 'migrate'])
    
    print("Migrations completed successfully!")