export type UserRole = 'admin' | 'librarian' | 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  coverUrl?: string;
  publishedYear: number;
  description?: string;
  addedAt: string;
}

export interface BookIssue {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
  fine: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalBooks: number;
  issuedBooks: number;
  overdueBooks: number;
  totalMembers: number;
  totalFines: number;
  recentActivity: { label: string; value: number }[];
}
