
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { statistics, books, users, borrowings } from '@/data/mockData';
import { BookOpen, Users, Calendar, ClipboardCheck } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Dashboard = () => {
  const COLORS = ['#1F3A5F', '#D4AF37', '#2D5A8E', '#F4CF67'];
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-navy" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">إجمالي الكتب</p>
                <h3 className="text-2xl font-bold text-navy-dark">{statistics.totalBooks}</h3>
                <p className="text-sm text-emerald-600 mt-1">
                  {statistics.availableBooks} كتاب متاح
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">المستخدمين</p>
                <h3 className="text-2xl font-bold text-navy-dark">{statistics.totalUsers}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  مستخدم مسجل
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">الإعارات النشطة</p>
                <h3 className="text-2xl font-bold text-navy-dark">{statistics.activeLoans}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  كتاب مستعار حالياً
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-2 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">إعارات مكتملة</p>
                <h3 className="text-2xl font-bold text-navy-dark">{statistics.completedLoans}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  كتاب تمت إعارته واسترجاعه
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>الكتب الأكثر إعارة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statistics.mostBorrowedBooks}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      type="category" 
                      dataKey="title" 
                      width={120}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#D4AF37" barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>توزيع التصنيفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statistics.popularCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {statistics.popularCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>أحدث الكتب المضافة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {books.slice(0, 3).map((book) => (
                  <div key={book.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md">
                    <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                      <img 
                        src={book.cover} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{book.title}</h4>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`px-2 py-1 text-xs rounded ${book.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {book.available ? 'متاح' : 'غير متاح'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>أحدث الإعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {borrowings.slice(0, 3).map((borrowing) => {
                  const book = books.find(b => b.id === borrowing.bookId);
                  const user = users.find(u => u.id === borrowing.userId);
                  
                  return (
                    <div key={borrowing.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-md">
                      <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden">
                        <img 
                          src={book?.cover} 
                          alt={book?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{book?.title}</h4>
                        <p className="text-sm text-gray-500">المستعير: {user?.name}</p>
                        <p className="text-xs text-gray-400">تاريخ الإعارة: {borrowing.borrowDate}</p>
                      </div>
                      <div className="ml-auto">
                        <span className={`px-2 py-1 text-xs rounded ${!borrowing.returned ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {borrowing.returned ? 'مرجع' : 'مستعار'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
