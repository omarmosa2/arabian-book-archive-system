
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would validate credentials with the backend
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحباً بك في مكتبة التراث العربي",
    });
    
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pattern-bg">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-navy-dark" />
          </div>
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل بيانات الدخول للوصول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  placeholder="أدخل بريدك الإلكتروني" 
                  type="email" 
                  required 
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-gold hover:text-gold-dark"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <Input 
                  id="password" 
                  placeholder="أدخل كلمة المرور" 
                  type="password" 
                  required 
                  dir="rtl"
                />
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox id="remember" />
                <Label htmlFor="remember">تذكرني</Label>
              </div>
              <Button type="submit" className="w-full bg-navy hover:bg-navy-dark">
                تسجيل الدخول
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-gold hover:text-gold-dark font-medium">
              إنشاء حساب جديد
            </Link>
          </div>
          <Button 
            variant="outline" 
            className="w-full border-gold text-gold hover:bg-gold/10"
            onClick={() => navigate('/')}
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
