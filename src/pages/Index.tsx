
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, UserCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-navy text-white">
        <div className="container mx-auto py-16 px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            مكتبة التراث العربي
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gold-light">
            اكتشف كنوز المعرفة والأدب العربي في أكبر مكتبة إلكترونية للتراث العربي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy-dark">
              <Link to="/books">تصفح الكتب</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gold text-gold hover:bg-navy-light">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4 md:px-6 pattern-bg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy">خدماتنا</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy">مكتبة رقمية شاملة</h3>
              <p className="text-gray-600">آلاف الكتب والمخطوطات من التراث العربي متاحة للتصفح والقراءة والاستعارة.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy">إدارة الإعارات</h3>
              <p className="text-gray-600">نظام متكامل لإدارة عمليات الإعارة والاسترجاع بكل سهولة ويسر.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircle className="h-8 w-8 text-navy" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy">حسابات شخصية</h3>
              <p className="text-gray-600">حساب شخصي لكل عضو لإدارة الكتب المستعارة والمفضلة والتقييمات.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-sand-light py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-navy">انضم إلينا اليوم</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-700">
            ابدأ رحلتك في عالم المعرفة والأدب العربي مع مكتبتنا الإلكترونية الشاملة
          </p>
          <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-navy-dark">
            <Link to="/register">سجل كعضو جديد</Link>
          </Button>
        </div>
      </section>
      
      <footer className="bg-navy text-white py-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gold">مكتبة التراث العربي © {new Date().getFullYear()}</p>
            </div>
            
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link to="/about" className="text-white hover:text-gold-light">عن المكتبة</Link>
              <Link to="/contact" className="text-white hover:text-gold-light">اتصل بنا</Link>
              <Link to="/terms" className="text-white hover:text-gold-light">الشروط والأحكام</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
