import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Plus } from 'lucide-react';
import { mockBooks, bookCategories } from '@/data/mockData';
import { useAuthStore } from '@/store/authStore';

const BooksPage = () => {
  const user = useAuthStore((s) => s.user);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = mockBooks.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || b.category === category;
    return matchSearch && matchCat;
  });

  const canManage = user?.role === 'admin' || user?.role === 'librarian';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Book Catalog</h1>
          <p className="text-muted-foreground mt-1">{mockBooks.length} books in the collection</p>
        </div>
        {canManage && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="gradient-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg self-start"
          >
            <Plus className="w-4 h-4" /> Add Book
          </motion.button>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {bookCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? 'gradient-primary text-primary-foreground shadow-md'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((book, i) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground text-sm line-clamp-2 leading-snug">{book.title}</h3>
                <p className="text-xs text-muted-foreground">{book.author}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground">{book.category}</span>
                  <span className={`text-xs font-semibold ${book.availableCopies > 0 ? 'text-success' : 'text-destructive'}`}>
                    {book.availableCopies > 0 ? `${book.availableCopies} available` : 'Unavailable'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto" />
          <p className="text-muted-foreground mt-4">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
