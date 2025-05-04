
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, BookCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { borrowings, books, users } from '@/data/mockData';
import MainLayout from '@/components/layout/MainLayout';

const Borrowings = () => {
  const [filter, setFilter] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Filter and sort borrowings
  const filteredBorrowings = borrowings
    .filter(borrowing => {
      // Filter by status
      if (filter === 'active' && borrowing.returned) return false;
      if (filter === 'returned' && !borrowing.returned) return false;
      
      // Find related book and user for searching
      const book = books.find(b => b.id === borrowing.bookId);
      const user = users.find(u => u.id === borrowing.userId);
      
      // Search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const bookMatches = book && (
          book.title.toLowerCase().includes(searchLower) || 
          book.author.toLowerCase().includes(searchLower)
        );
        const userMatches = user && user.name.toLowerCase().includes(searchLower);
        return bookMatches || userMatches;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by borrow date (newest first)
      return new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime();
    });

  const handleReturn = (borrowingId: number) => {
    toast({
      title: "تم إرجاع الكتاب بنجاح",
      description: "تم تسجيل إرجاع الكتاب في النظام",
    });
  };

  // Calculate days remaining or overdue
  const calculateDaysStatus = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return {
        text: `متأخر بـ ${Math.abs(diffDays)} يوم`,
        className: 'text-red-600',
        isOverdue: true
      };
    } else if (diffDays === 0) {
      return {
        text: 'يستحق اليوم',
        className: 'text-amber-600',
        isOverdue: false
      };
    } else {
      return {
        text: `${diffDays} يوم متبقي`,
        className: 'text-green-600',
        isOverdue: false
      };
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">الإعارات</h1>
          <p className="text-gray-500 mt-1">إدارة عمليات الإعارة والإرجاع</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Select defaultValue="active" onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الإعارات</SelectItem>
                <SelectItem value="active">إعارات نشطة</SelectItem>
                <SelectItem value="returned">كتب مرجعة</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="بحث عن كتاب أو مستعير..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
                dir="rtl"
              />
            </div>
          </div>
          
          <Button className="bg-gold hover:bg-gold-dark text-navy-dark">
            <BookCheck className="mr-2 h-4 w-4" /> تسجيل إعارة جديدة
          </Button>
        </div>
        
        <div className="bg-white border rounded-lg overflow-hidden">
          {filteredBorrowings.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الكتاب</TableHead>
                    <TableHead className="text-right">المستعير</TableHead>
                    <TableHead className="text-right">تاريخ الإعارة</TableHead>
                    <TableHead className="text-right">تاريخ الإرجاع المتوقع</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBorrowings.map((borrowing) => {
                    const book = books.find(b => b.id === borrowing.bookId);
                    const user = users.find(u => u.id === borrowing.userId);
                    const daysStatus = calculateDaysStatus(borrowing.dueDate);
                    
                    return (
                      <TableRow key={borrowing.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-14 bg-gray-200 rounded overflow-hidden">
                              <img 
                                src={book?.cover} 
                                alt={book?.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{book?.title}</div>
                              <div className="text-sm text-gray-500">{book?.author}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user?.name}</TableCell>
                        <TableCell>{borrowing.borrowDate}</TableCell>
                        <TableCell>{borrowing.dueDate}</TableCell>
                        <TableCell>
                          {borrowing.returned ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              مرجع بتاريخ {borrowing.returnDate}
                            </span>
                          ) : (
                            <span className={`text-sm ${daysStatus.className}`}>
                              {daysStatus.text}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {!borrowing.returned && (
                            <Button
                              size="sm"
                              onClick={() => handleReturn(borrowing.id)}
                              className="bg-navy hover:bg-navy-dark"
                            >
                              إرجاع
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium">لا توجد إعارات</h3>
              <p className="mt-2 text-gray-500">لا توجد إعارات مطابقة لمعايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Borrowings;
