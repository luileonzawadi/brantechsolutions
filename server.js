const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));
app.use('/uploads', express.static('uploads'));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Blog data file
const BLOG_DATA_FILE = 'blog-data.json';

// Initialize blog data
async function initBlogData() {
  try {
    await fs.access(BLOG_DATA_FILE);
  } catch {
    const initialData = { posts: [] };
    await fs.writeFile(BLOG_DATA_FILE, JSON.stringify(initialData, null, 2));
  }
}

// Read blog data
async function readBlogData() {
  const data = await fs.readFile(BLOG_DATA_FILE, 'utf8');
  return JSON.parse(data);
}

// Write blog data
async function writeBlogData(data) {
  await fs.writeFile(BLOG_DATA_FILE, JSON.stringify(data, null, 2));
}

// API Routes
app.get('/api/posts', async (req, res) => {
  try {
    const data = await readBlogData();
    res.json(data.posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const { title, excerpt, content, tags, category } = req.body;
    const data = await readBlogData();
    
    const newPost = {
      id: Date.now().toString(),
      title,
      excerpt,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      date: new Date().toISOString().split('T')[0],
      featured: false
    };
    
    data.posts.unshift(newPost);
    await writeBlogData(data);
    
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, tags, category, featured } = req.body;
    const data = await readBlogData();
    
    const postIndex = data.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    data.posts[postIndex] = {
      ...data.posts[postIndex],
      title,
      excerpt,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      category,
      featured: featured === 'true'
    };
    
    await writeBlogData(data);
    res.json(data.posts[postIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readBlogData();
    
    data.posts = data.posts.filter(post => post.id !== id);
    await writeBlogData(data);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// Admin panel route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start server
initBlogData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
});