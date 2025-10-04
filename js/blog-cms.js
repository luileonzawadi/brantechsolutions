// Simple Git-based CMS for loading markdown posts
class BlogCMS {
  constructor() {
    this.baseUrl = 'https://raw.githubusercontent.com/brantechsolution/brantechsolutions-main/main/posts/';
  }

  async loadPost(postId) {
    try {
      const response = await fetch(`${this.baseUrl}${postId}.md`);
      if (!response.ok) throw new Error('Post not found');
      
      const markdown = await response.text();
      return this.parseMarkdown(markdown);
    } catch (error) {
      console.error('Error loading post:', error);
      return null;
    }
  }

  parseMarkdown(markdown) {
    const parts = markdown.split('---');
    if (parts.length < 3) return null;

    const frontmatter = this.parseFrontmatter(parts[1]);
    const content = parts.slice(2).join('---').trim();
    const htmlContent = this.markdownToHtml(content);

    return { ...frontmatter, content: htmlContent };
  }

  parseFrontmatter(frontmatter) {
    const data = {};
    const lines = frontmatter.trim().split('\n');
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        let value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(item => 
            item.trim().replace(/^["']|["']$/g, '')
          );
        }
        
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        
        data[key.trim()] = value;
      }
    });
    
    return data;
  }

  markdownToHtml(markdown) {
    return markdown
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<[h|u|b])(.+)$/gm, '<p>$1</p>')
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<h[1-6]>)/g, '$1')
      .replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  }
}

window.BlogCMS = BlogCMS;