const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000';

export interface BlogPost {
  id: number;
  author: string;
  blog_topic: string;
  content: string;
  category: string;
  blog_picture: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPostData {
  author: string;
  blog_topic: string;
  content: string;
  category: string;
  blog_picture: string;
}

export interface UpdateBlogPostData {
  author?: string;
  blog_topic?: string;
  content?: string;
  category?: string;
  blog_picture?: string;
}

class BlogPostsService {
  private baseUrl = `${API_URL}/admin/blog_posts`;

  // Fetch all blog posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  // Fetch single blog post by ID
  async getBlogPostById(id: number): Promise<BlogPost> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      throw error;
    }
  }

  // Create new blog post
  async createBlogPost(blogPostData: CreateBlogPostData): Promise<BlogPost> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blog_post: blogPostData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  }

  // Update existing blog post
  async updateBlogPost(id: number, blogPostData: UpdateBlogPostData): Promise<BlogPost> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blog_post: blogPostData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating blog post ${id}:`, error);
      throw error;
    }
  }

  // Delete blog post
  async deleteBlogPost(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting blog post ${id}:`, error);
      throw error;
    }
  }
}

export default new BlogPostsService();
