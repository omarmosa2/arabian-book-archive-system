
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  BookOpen,
  Calendar,
  Clock,
  FileBadge,
  Languages,
  Building,
  User,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { books, reviews, users } from '@/data/mockData';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the book with the given ID
  const book = books.find(b => b.id === Number(id));
  
  // Find reviews for this book
  const bookReviews = reviews.filter(r => r.bookId === Number(id));
  
  if (!book) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">الكتاب غير موجود</h2>
          <Button onClick={() => navigate('/books')}>العودة إلى قائمة الكتب</Button>
        </div>
      </MainLayout>
    );
  }

  const handleBorrow = () => {
    if (!book.available) {
      toast({
        title: "الكتاب غير متوفر",
        description: "هذا الكتاب غير متاح للإعارة حالياً.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "تمت الإعارة بنجاح",
      description: `تم إضافة كتاب "${book.title}" إلى قائمة إعاراتك.`,
    });
  };

  return (
    <MainLayout>
      <Button 
        variant="ghost" 
        className="mb-6 gap-2" 
        onClick={() => navigate('/books')}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>العودة إلى قائمة الكتب</span>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-[2/3] w-full">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          <Button
            onClick={handleBorrow}
            className={`w-full ${
              book.available
                ? "bg-gold hover:bg-gold-dark text-navy-dark"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!book.available}
          >
            {book.available ? "استعارة الكتاب" : "غير متاح للإعارة"}
          </Button>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-navy/10 text-navy text-xs px-2 py-1 rounded">
                {book.category}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  book.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {book.available ? "متاح" : "غير متاح"}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>

            <div className="flex items-center mb-6">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < Math.floor(book.ratings) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-500">
                {book.ratings} ({book.reviewCount} تقييم)
              </span>
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">تفاصيل الكتاب</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات ({bookReviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{book.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FileBadge className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">رقم ISBN</p>
                          <p className="font-medium">{book.isbn}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">سنة النشر</p>
                          <p className="font-medium">{book.publishYear}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">عدد الصفحات</p>
                          <p className="font-medium">{book.pages} صفحة</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Languages className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">اللغة</p>
                          <p className="font-medium">{book.language}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">الناشر</p>
                          <p className="font-medium">{book.publisher}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-navy" />
                        <div>
                          <p className="text-sm text-gray-500">التصنيف</p>
                          <p className="font-medium">{book.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  {bookReviews.length > 0 ? (
                    bookReviews.map((review) => {
                      const reviewer = users.find(u => u.id === review.userId);
                      
                      return (
                        <Card key={review.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{reviewer?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">{reviewer?.name}</CardTitle>
                                <CardDescription>{review.date}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex mb-2 text-gold">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill={i < review.rating ? "currentColor" : "none"}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <p className="text-gray-700">{review.reviewText}</p>
                          </CardContent>
                        </Card>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium">لا توجد تقييمات</h3>
                      <p className="mt-2 text-gray-500">كن أول من يقيّم هذا الكتاب</p>
                      <Button className="mt-4 bg-navy hover:bg-navy-dark">
                        <User className="mr-2 h-4 w-4" /> كتابة تقييم
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetail;
