from django.contrib import admin
from .models import BlogPost, Project, Event

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'view_count', 'created_at']
    list_filter = ['category', 'featured', 'created_at']
    search_fields = ['title', 'content']
    list_editable = ['featured']
    readonly_fields = ['view_count']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'status', 'start_date', 'featured', 'created_at']
    list_filter = ['status', 'featured', 'start_date']
    search_fields = ['title', 'client', 'description']
    list_editable = ['status', 'featured']

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'date', 'is_online', 'featured', 'created_at']
    list_filter = ['event_type', 'is_online', 'featured', 'date']
    search_fields = ['title', 'description']
    list_editable = ['featured']