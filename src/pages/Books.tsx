
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Plus } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { books } from '@/data/mockData';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const categories = Array.from(new Set(books.map(book => book.category)));
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">الكتب</h1>
            <p className="text-gray-500 mt-1">استعرض وابحث عن الكتب المتاحة في المكتبة</p>
          </div>
          
          <Button className="bg-gold hover:bg-gold-dark text-navy-dark">
            <Plus className="mr-2 h-4 w-4" /> إضافة كتاب جديد
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="ابحث عن كتاب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 w-full"
              dir="rtl"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="جميع التصنيفات" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <Card key={book.id} className="overflow-hidden flex flex-col">
              <Link to={`/books/${book.id}`} className="flex-grow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-center gap-2">
                    <CardTitle className="text-xl">{book.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {book.available ? 'متاح' : 'غير متاح'}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-500">{book.author}</p>
                  <div className="flex items-center mt-2">
                    <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded">{book.category}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">{book.publishYear}</span>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill={i < Math.floor(book.ratings) ? "currentColor" : "none"} 
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      ({book.reviewCount} تقييم)
                    </span>
                  </div>
                </CardContent>
              </Link>
              
              <CardFooter className="pt-0">
                <Button className="w-full bg-navy hover:bg-navy-dark">
                  <BookOpen className="mr-2 h-4 w-4" /> 
                  عرض التفاصيل
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">لا توجد كتب متطابقة</h3>
            <p className="mt-2 text-gray-500">جرب تغيير معايير البحث أو التصنيف</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Books;
