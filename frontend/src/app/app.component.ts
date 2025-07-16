// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface IdeaSubmission {
  id: string;
  teamName: string;
  submitterName: string;
  submitterEmail: string;
  ideaTitle: string;
  ideaDescription: string;
  category: string;
  priority: string;
  estimatedImpact: string;
  submissionDate: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <header class="header">
        <h1>AI Initiative Ideas Collection</h1>
        <p>Submit your AI ideas and initiatives to help shape our organization's AI strategy</p>
      </header>

      <div class="form-section">
        <form (ngSubmit)="onSubmit()" #ideaForm="ngForm">
          <div class="form-group">
            <label for="teamName">Team Name *</label>
            <input 
              type="text" 
              id="teamName" 
              name="teamName" 
              [(ngModel)]="currentIdea.teamName" 
              required 
              placeholder="e.g., Engineering, Marketing, Operations"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="submitterName">Your Name *</label>
              <input 
                type="text" 
                id="submitterName" 
                name="submitterName" 
                [(ngModel)]="currentIdea.submitterName" 
                required
                placeholder="Full name"
              >
            </div>
            <div class="form-group">
              <label for="submitterEmail">Email *</label>
              <input 
                type="email" 
                id="submitterEmail" 
                name="submitterEmail" 
                [(ngModel)]="currentIdea.submitterEmail" 
                required
                placeholder="your.email@company.com"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="ideaTitle">Idea Title *</label>
            <input 
              type="text" 
              id="ideaTitle" 
              name="ideaTitle" 
              [(ngModel)]="currentIdea.ideaTitle" 
              required
              placeholder="Brief, descriptive title for your AI idea"
            >
          </div>

          <div class="form-group">
            <label for="ideaDescription">Idea Description *</label>
            <textarea 
              id="ideaDescription" 
              name="ideaDescription" 
              [(ngModel)]="currentIdea.ideaDescription" 
              required
              rows="5"
              placeholder="Describe your AI idea in detail. Include the problem it solves, proposed solution, and potential benefits."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Category *</label>
              <select 
                id="category" 
                name="category" 
                [(ngModel)]="currentIdea.category" 
                required
              >
                <option value="">Select category</option>
                <option value="automation">Process Automation</option>
                <option value="analytics">Data Analytics & Insights</option>
                <option value="customer">Customer Experience</option>
                <option value="operations">Operations Optimization</option>
                <option value="product">Product Enhancement</option>
                <option value="security">Security & Compliance</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label for="priority">Priority Level *</label>
              <select 
                id="priority" 
                name="priority" 
                [(ngModel)]="currentIdea.priority" 
                required
              >
                <option value="">Select priority</option>
                <option value="high">High - Critical/Urgent</option>
                <option value="medium">Medium - Important</option>
                <option value="low">Low - Nice to have</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="estimatedImpact">Estimated Impact *</label>
            <select 
              id="estimatedImpact" 
              name="estimatedImpact" 
              [(ngModel)]="currentIdea.estimatedImpact" 
              required
            >
              <option value="">Select estimated impact</option>
              <option value="transformational">Transformational - Major game changer</option>
              <option value="significant">Significant - Notable improvement</option>
              <option value="moderate">Moderate - Meaningful benefit</option>
              <option value="minimal">Minimal - Small improvement</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="!ideaForm.valid" class="submit-btn">
              Submit Idea
            </button>
            <button type="button" (click)="resetForm()" class="reset-btn">
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <div class="success-message" *ngIf="showSuccessMessage">
        <h3>✅ Idea Submitted Successfully!</h3>
        <p>Thank you for your contribution to our AI initiative.</p>
      </div>

      <div class="submissions-section" *ngIf="submissions.length > 0">
        <h2>Recent Submissions ({{ submissions.length }})</h2>
        <div class="submissions-list">
          <div class="submission-card" *ngFor="let submission of submissions; let i = index">
            <div class="submission-header">
              <h3>{{ submission.ideaTitle }}</h3>
              <span class="category-badge" [class]="'category-' + submission.category">
                {{ getCategoryLabel(submission.category) }}
              </span>
            </div>
            <div class="submission-details">
              <p><strong>Team:</strong> {{ submission.teamName }}</p>
              <p><strong>Submitted by:</strong> {{ submission.submitterName }}</p>
              <p><strong>Priority:</strong> {{ getPriorityLabel(submission.priority) }}</p>
              <p><strong>Impact:</strong> {{ getImpactLabel(submission.estimatedImpact) }}</p>
              <p><strong>Date:</strong> {{ formatDate(submission.submissionDate) }}</p>
            </div>
            <div class="submission-description">
              <p>{{ submission.ideaDescription }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="export-section" *ngIf="submissions.length > 0">
        <h3>Export Options</h3>
        <div class="export-buttons">
          <button (click)="exportToJSON()" class="export-btn">Export as JSON</button>
          <button (click)="exportToCSV()" class="export-btn">Export as CSV</button>
          <button (click)="exportToText()" class="export-btn">Export as Text</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
    }

    .header h1 {
      margin: 0 0 10px 0;
      font-size: 2em;
    }

    .form-section {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 600;
      color: #333;
    }

    input, select, textarea {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 30px;
    }

    .submit-btn, .reset-btn, .export-btn {
      padding: 12px 24px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn {
      background: #667eea;
      color: white;
    }

    .submit-btn:hover:not(:disabled) {
      background: #5a67d8;
    }

    .submit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .reset-btn {
      background: #f7fafc;
      color: #4a5568;
      border: 2px solid #e2e8f0;
    }

    .reset-btn:hover {
      background: #edf2f7;
    }

    .success-message {
      background: #f0fff4;
      border: 2px solid #68d391;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
      color: #22543d;
    }

    .submissions-section {
      margin-top: 40px;
    }

    .submissions-section h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .submission-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .submission-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .submission-header h3 {
      margin: 0;
      color: #2d3748;
    }

    .category-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .category-automation { background: #fef5e7; color: #744210; }
    .category-analytics { background: #e3f2fd; color: #0d47a1; }
    .category-customer { background: #f3e5f5; color: #4a148c; }
    .category-operations { background: #e8f5e8; color: #1b5e20; }
    .category-product { background: #fff3e0; color: #e65100; }
    .category-security { background: #ffebee; color: #c62828; }
    .category-other { background: #f5f5f5; color: #424242; }

    .submission-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-bottom: 15px;
    }

    .submission-details p {
      margin: 0;
      font-size: 14px;
      color: #4a5568;
    }

    .submission-description {
      background: #f7fafc;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #667eea;
    }

    .submission-description p {
      margin: 0;
      line-height: 1.5;
    }

    .export-section {
      margin-top: 30px;
      padding: 20px;
      background: #f7fafc;
      border-radius: 10px;
    }

    .export-buttons {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    .export-btn {
      background: #4a5568;
      color: white;
    }

    .export-btn:hover {
      background: #2d3748;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .submission-details {
        grid-template-columns: 1fr;
      }
      
      .export-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class AppComponent {
  currentIdea: IdeaSubmission = {
    id: '',
    teamName: '',
    submitterName: '',
    submitterEmail: '',
    ideaTitle: '',
    ideaDescription: '',
    category: '',
    priority: '',
    estimatedImpact: '',
    submissionDate: ''
  };

  submissions: IdeaSubmission[] = [];
  showSuccessMessage = false;

  ngOnInit() {
    this.loadSubmissions();
  }

  onSubmit() {
    this.currentIdea.id = this.generateId();
    this.currentIdea.submissionDate = new Date().toISOString();
    
    // Save to server (if backend available) or localStorage
    this.saveToServer({ ...this.currentIdea });
    
    this.submissions.push({ ...this.currentIdea });
    this.saveSubmissions();
    
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
    
    this.resetForm();
  }

  resetForm() {
    this.currentIdea = {
      id: '',
      teamName: '',
      submitterName: '',
      submitterEmail: '',
      ideaTitle: '',
      ideaDescription: '',
      category: '',
      priority: '',
      estimatedImpact: '',
      submissionDate: ''
    };
  }

  generateId(): string {
    return 'idea_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  loadSubmissions() {
    const saved = localStorage.getItem('aiInitiativeSubmissions');
    if (saved) {
      this.submissions = JSON.parse(saved);
    }
  }

  saveSubmissions() {
    localStorage.setItem('aiInitiativeSubmissions', JSON.stringify(this.submissions));
  }

  saveToServer(idea: IdeaSubmission) {
    // Send to backend API
    fetch('/api/submit-idea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idea)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Idea saved to server:', data);
    })
    .catch(error => {
      console.error('Error saving to server (using localStorage fallback):', error);
      // Fallback to localStorage if server is not available
    });
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'automation': 'Process Automation',
      'analytics': 'Data Analytics',
      'customer': 'Customer Experience',
      'operations': 'Operations',
      'product': 'Product Enhancement',
      'security': 'Security',
      'other': 'Other'
    };
    return labels[category] || category;
  }

  getPriorityLabel(priority: string): string {
    const labels: { [key: string]: string } = {
      'high': 'High Priority',
      'medium': 'Medium Priority',
      'low': 'Low Priority'
    };
    return labels[priority] || priority;
  }

  getImpactLabel(impact: string): string {
    const labels: { [key: string]: string } = {
      'transformational': 'Transformational',
      'significant': 'Significant',
      'moderate': 'Moderate',
      'minimal': 'Minimal'
    };
    return labels[impact] || impact;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  exportToJSON() {
    const dataStr = JSON.stringify(this.submissions, null, 2);
    this.downloadFile(dataStr, 'ai_initiative_ideas.json', 'application/json');
  }

  exportToCSV() {
    const headers = ['ID', 'Team Name', 'Submitter Name', 'Email', 'Idea Title', 'Description', 'Category', 'Priority', 'Impact', 'Submission Date'];
    const csvContent = [
      headers.join(','),
      ...this.submissions.map(sub => [
        sub.id,
        `"${sub.teamName}"`,
        `"${sub.submitterName}"`,
        sub.submitterEmail,
        `"${sub.ideaTitle}"`,
        `"${sub.ideaDescription.replace(/"/g, '""')}"`,
        sub.category,
        sub.priority,
        sub.estimatedImpact,
        sub.submissionDate
      ].join(','))
    ].join('\n');
    
    this.downloadFile(csvContent, 'ai_initiative_ideas.csv', 'text/csv');
  }

  exportToText() {
    const textContent = this.submissions.map((sub, index) => 
      `=== AI INITIATIVE IDEA #${index + 1} ===\n` +
      `ID: ${sub.id}\n` +
      `Team: ${sub.teamName}\n` +
      `Submitted by: ${sub.submitterName} (${sub.submitterEmail})\n` +
      `Title: ${sub.ideaTitle}\n` +
      `Category: ${this.getCategoryLabel(sub.category)}\n` +
      `Priority: ${this.getPriorityLabel(sub.priority)}\n` +
      `Impact: ${this.getImpactLabel(sub.estimatedImpact)}\n` +
      `Date: ${this.formatDate(sub.submissionDate)}\n` +
      `Description:\n${sub.ideaDescription}\n\n`
    ).join('');
    
    this.downloadFile(textContent, 'ai_initiative_ideas.txt', 'text/plain');
  }

  private downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
