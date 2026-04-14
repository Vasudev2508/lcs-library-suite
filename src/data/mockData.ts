import type { Book, BookIssue, Notification, DashboardStats } from '@/types/library';

export const mockBooks: Book[] = [
  { id: '1', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', category: 'Algorithms', totalCopies: 5, availableCopies: 2, publishedYear: 2009, description: 'The definitive guide to algorithms, widely used as a textbook in universities.', addedAt: '2024-01-15' },
  { id: '2', title: 'Design Patterns', author: 'Erich Gamma et al.', isbn: '978-0201633610', category: 'Software Engineering', totalCopies: 3, availableCopies: 1, publishedYear: 1994, description: 'Classic guide to reusable object-oriented software design.', addedAt: '2024-02-10' },
  { id: '3', title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', category: 'Software Engineering', totalCopies: 4, availableCopies: 4, publishedYear: 2008, description: 'A handbook of agile software craftsmanship.', addedAt: '2024-01-20' },
  { id: '4', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', isbn: '978-0136042594', category: 'AI/ML', totalCopies: 6, availableCopies: 3, publishedYear: 2020, description: 'The most comprehensive, up-to-date introduction to AI.', addedAt: '2024-03-05' },
  { id: '5', title: 'Computer Networks', author: 'Andrew S. Tanenbaum', isbn: '978-0132126953', category: 'Networking', totalCopies: 4, availableCopies: 0, publishedYear: 2010, description: 'Comprehensive guide to modern computer networking.', addedAt: '2024-01-10' },
  { id: '6', title: 'Operating System Concepts', author: 'Abraham Silberschatz', isbn: '978-1118063330', category: 'Operating Systems', totalCopies: 5, availableCopies: 2, publishedYear: 2018, description: 'Foundational textbook on OS concepts and design.', addedAt: '2024-02-28' },
  { id: '7', title: 'Database System Concepts', author: 'Abraham Silberschatz', isbn: '978-0073523323', category: 'Databases', totalCopies: 3, availableCopies: 1, publishedYear: 2019, description: 'Comprehensive introduction to database management systems.', addedAt: '2024-03-12' },
  { id: '8', title: 'Deep Learning', author: 'Ian Goodfellow', isbn: '978-0262035613', category: 'AI/ML', totalCopies: 4, availableCopies: 2, publishedYear: 2016, description: 'The definitive textbook on deep learning.', addedAt: '2024-04-01' },
];

export const mockIssues: BookIssue[] = [
  { id: '1', bookId: '1', bookTitle: 'Introduction to Algorithms', userId: '3', userName: 'Arjun Patel', issueDate: '2024-03-01', dueDate: '2024-03-15', status: 'overdue', fine: 50 },
  { id: '2', bookId: '2', bookTitle: 'Design Patterns', userId: '4', userName: 'Dr. Meena Iyer', issueDate: '2024-03-10', dueDate: '2024-04-10', status: 'issued', fine: 0 },
  { id: '3', bookId: '5', bookTitle: 'Computer Networks', userId: '3', userName: 'Arjun Patel', issueDate: '2024-02-15', dueDate: '2024-03-01', returnDate: '2024-02-28', status: 'returned', fine: 0 },
  { id: '4', bookId: '4', bookTitle: 'AI: A Modern Approach', userId: '4', userName: 'Dr. Meena Iyer', issueDate: '2024-03-20', dueDate: '2024-04-20', status: 'issued', fine: 0 },
];

export const mockNotifications: Notification[] = [
  { id: '1', title: 'Book Overdue', message: 'Introduction to Algorithms is overdue by 30 days.', type: 'warning', read: false, createdAt: '2024-04-14' },
  { id: '2', title: 'New Book Added', message: 'Deep Learning by Ian Goodfellow has been added.', type: 'info', read: false, createdAt: '2024-04-01' },
  { id: '3', title: 'Fine Paid', message: 'Fine of ₹50 has been collected from Arjun Patel.', type: 'success', read: true, createdAt: '2024-03-28' },
];

export const mockStats: DashboardStats = {
  totalBooks: 34,
  issuedBooks: 12,
  overdueBooks: 3,
  totalMembers: 156,
  totalFines: 1250,
  recentActivity: [
    { label: 'Mon', value: 5 },
    { label: 'Tue', value: 8 },
    { label: 'Wed', value: 12 },
    { label: 'Thu', value: 7 },
    { label: 'Fri', value: 15 },
    { label: 'Sat', value: 3 },
    { label: 'Sun', value: 1 },
  ],
};

export const bookCategories = ['All', 'Algorithms', 'Software Engineering', 'AI/ML', 'Networking', 'Operating Systems', 'Databases'];
