import { Injectable } from '@angular/core';
import { BlogFrontmatter } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {

  /**
   * Parse markdown content with YAML frontmatter
   */
  parseMarkdownWithFrontmatter(content: string): {
    frontmatter: BlogFrontmatter;
    markdown: string;
    html: string;
  } {
    const { frontmatter, markdown } = this.extractFrontmatter(content);
    const html = this.convertToHtml(markdown);

    return {
      frontmatter,
      markdown,
      html
    };
  }

  /**
   * Convert markdown to HTML
   */
  convertToHtml(markdown: string): string {
    let html = markdown;

    // Escape HTML first to prevent XSS
    // html = this.escapeHtml(html);

    // Headers (process largest first to avoid conflicts)
    html = html.replace(/^#{6}\s+(.*$)/gim, '<h6>$1</h6>');
    html = html.replace(/^#{5}\s+(.*$)/gim, '<h5>$1</h5>');
    html = html.replace(/^#{4}\s+(.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^#{3}\s+(.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#{2}\s+(.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^#{1}\s+(.*$)/gim, '<h1>$1</h1>');

    // Code blocks (fenced)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang ? ` class="language-${lang}"` : '';
      return `<pre><code${language}>${this.escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

    // Bold and italic (process triple asterisks first)
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}"${target}>${text}</a>`;
    });

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

    // Blockquotes
    html = html.replace(/^>\s+(.*$)/gim, '<blockquote><p>$1</p></blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gim, '<hr>');

    // Unordered lists
    html = html.replace(/^\*\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/^\-\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/^\+\s+(.*)$/gim, '<li>$1</li>');

    // Ordered lists
    html = html.replace(/^\d+\.\s+(.*)$/gim, '<li>$1</li>');

    // Wrap consecutive list items in ul/ol tags
    html = this.wrapListItems(html);

    // Line breaks and paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraphs (but not if already wrapped in block elements)
    if (!html.match(/^<(h[1-6]|pre|blockquote|ul|ol|hr)/)) {
      html = `<p>${html}</p>`;
    }

    // Clean up empty paragraphs and fix nested paragraph issues
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]|<pre|<blockquote|<ul|<ol|<hr)/g, '$1');
    html = html.replace(/(<\/h[1-6]>|<\/pre>|<\/blockquote>|<\/ul>|<\/ol>|<hr>)<\/p>/g, '$1');

    return html.trim();
  }

  /**
   * Calculate estimated reading time
   */
  calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    return Math.max(1, readingTime);
  }

  /**
   * Generate excerpt from content
   */
  generateExcerpt(content: string, maxLength: number = 160): string {
    // Strip HTML and markdown
    const plainText = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[#*`_~\[\]()]/g, '') // Remove markdown symbols
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();

    if (plainText.length <= maxLength) {
      return plainText;
    }

    // Find the last complete sentence within the limit
    const truncated = plainText.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastPeriod > maxLength * 0.8) {
      return truncated.substring(0, lastPeriod + 1);
    } else if (lastSpace > 0) {
      return truncated.substring(0, lastSpace) + '...';
    }

    return truncated + '...';
  }

  private extractFrontmatter(content: string): {
    frontmatter: BlogFrontmatter;
    markdown: string;
  } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    const defaultFrontmatter: BlogFrontmatter = {
      title: 'Untitled Post',
      date: new Date().toISOString(),
      category: 'technical',
      tags: [],
      excerpt: ''
    };

    if (!match) {
      return {
        frontmatter: defaultFrontmatter,
        markdown: content
      };
    }

    const frontmatterYaml = match[1];
    const markdown = match[2];

    const frontmatter = this.parseYamlFrontmatter(frontmatterYaml) || defaultFrontmatter;

    // Generate excerpt if not provided
    if (!frontmatter.excerpt) {
      frontmatter.excerpt = this.generateExcerpt(markdown);
    }

    // Calculate reading time if not provided
    if (!frontmatter.readTime) {
      frontmatter.readTime = this.calculateReadingTime(markdown);
    }

    return { frontmatter, markdown };
  }

  private parseYamlFrontmatter(yaml: string): BlogFrontmatter {
    const frontmatter: Partial<BlogFrontmatter> = {};

    yaml.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) return;

      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      switch (key) {
        case 'title':
          frontmatter.title = value;
          break;
        case 'date':
          frontmatter.date = value;
          break;
        case 'category':
          frontmatter.category = value;
          break;
        case 'excerpt':
          frontmatter.excerpt = value;
          break;
        case 'coverImage':
          frontmatter.coverImage = value;
          break;
        case 'author':
          frontmatter.author = value;
          break;
        case 'seoTitle':
          frontmatter.seoTitle = value;
          break;
        case 'seoDescription':
          frontmatter.seoDescription = value;
          break;
        case 'tags':
          if (value.startsWith('[') && value.endsWith(']')) {
            frontmatter.tags = value
              .slice(1, -1)
              .split(',')
              .map(tag => tag.trim().replace(/['"]/g, ''));
          }
          break;
        case 'keywords':
          if (value.startsWith('[') && value.endsWith(']')) {
            frontmatter.keywords = value
              .slice(1, -1)
              .split(',')
              .map(keyword => keyword.trim().replace(/['"]/g, ''));
          }
          break;
        case 'featured':
          frontmatter.featured = value.toLowerCase() === 'true';
          break;
        case 'draft':
          frontmatter.draft = value.toLowerCase() === 'true';
          break;
        case 'readTime':
          frontmatter.readTime = parseInt(value, 10) || undefined;
          break;
      }
    });

    return frontmatter as BlogFrontmatter;
  }

  private wrapListItems(html: string): string {
    // Wrap consecutive <li> tags in <ul> tags
    html = html.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gs, '<ul>$1</ul>');

    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}