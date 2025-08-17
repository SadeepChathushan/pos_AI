import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Store,
  Users,
  ShoppingCart,
  Globe,
  Fingerprint,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

// ----- i18n (kept as-is) -----
const translations = {
  en: {
    title: 'POS System',
    subtitle: 'Professional Point of Sale Solution',
    loginTitle: 'Login to your account',
    loginDescription: 'Enter your credentials to access the system',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    quickLogin: 'Quick Login (Demo)',
    admin: 'Admin',
    cashier: 'Cashier',
    salesman: 'Salesman',
    orLogin: 'Or login with',
    googleLogin: 'Continue with Google',
    mosipLogin: 'Login with MOSIP',
    mosipDescription: 'Secure biometric authentication',
    language: 'Language',
    loginSuccess: 'Login Successful',
    welcomeMessage: 'Welcome to POS System',
    loginFailed: 'Login Failed',
    invalidCredentials: 'Invalid credentials or inactive account',
    error: 'Error',
    somethingWrong: 'Something went wrong',
  },
  si: {
    title: 'POS පද්ධතිය',
    subtitle: 'වෘත්තීය විකුණුම් ස්ථාන විසඳුම',
    loginTitle: 'ඔබේ ගිණුමට පුරන්න',
    loginDescription: 'පද්ධතියට ප්‍රවේශ වීමට ඔබේ අක්තපත්‍ර ඇතුලත් කරන්න',
    email: 'විද්‍යුත් තැපෑල',
    password: 'මුරපදය',
    emailPlaceholder: 'ඔබේ විද්‍යුත් තැපෑල ඇතුලත් කරන්න',
    passwordPlaceholder: 'ඔබේ මුරපදය ඇතුලත් කරන්න',
    loginButton: 'පුරන්න',
    loggingIn: 'පුරන්න...',
    quickLogin: 'ක්ෂණික පුරන්න (ප්‍රදර්ශන)',
    admin: 'පරිපාලක',
    cashier: 'මුදල්කරු',
    salesman: 'විකුණුම්කරු',
    orLogin: 'හෝ මෙමගින් පුරන්න',
    googleLogin: 'Google සමඟ ඉදිරියට',
    mosipLogin: 'MOSIP සමඟ පුරන්න',
    mosipDescription: 'ආරක්ෂිත ජීව මිතික සත්‍යාපනය',
    language: 'භාෂාව',
    loginSuccess: 'පුරන්න සාර්ථකයි',
    welcomeMessage: 'POS පද්ධතියට සාදරයෙන් පිළිගනිමු',
    loginFailed: 'පුරන්න අසාර්ථකයි',
    invalidCredentials: 'අවලංගු අක්තපත්‍ර හෝ අක්‍රිය ගිණුම',
    error: 'දෝෂය',
    somethingWrong: 'යමක් වැරදී ඇත',
  },
  ta: {
    title: 'POS அமைப்பு',
    subtitle: 'தொழில்முறை விற்பனை புள்ளி தீர்வு',
    loginTitle: 'உங்கள் கணக்கில் உள்நுழையவும்',
    loginDescription: 'அமைப்பை அணுக உங்கள் நற்சான்றிதழ்களை உள்ளிடவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    emailPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    passwordPlaceholder: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    loginButton: 'உள்நுழை',
    loggingIn: 'உள்நுழைகிறது...',
    quickLogin: 'விரைவு உள்நுழைவு (செயல்விளக்கம்)',
    admin: 'நிர்வாகி',
    cashier: 'பணம் வசூலிப்பவர்',
    salesman: 'விற்பனையாளர்',
    orLogin: 'அல்லது இதன் மூலம் உள்நுழையவும்',
    googleLogin: 'Google உடன் தொடரவும்',
    mosipLogin: 'MOSIP உடன் உள்நுழையவும்',
    mosipDescription: 'பாதுகாப்பான உயிரியல் அங்கீகாரம்',
    language: 'மொழி',
    loginSuccess: 'உள்நுழைவு வெற்றியடைந்தது',
    welcomeMessage: 'POS அமைப்பிற்கு வரவேற்கிறோம்',
    loginFailed: 'உள்நுழைவு தோல்வியடைந்தது',
    invalidCredentials: 'தவறான நற்சான்றிதழ்கள் அல்லது செயலற்ற கணக்கு',
    error: 'பிழை',
    somethingWrong: 'ஏதோ தவறு நடந்துள்ளது',
  },
} as const;

type LangKey = keyof typeof translations;
type QuickRole = 'admin' | 'cashier' | 'salesman';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { toast } = useToast();

  // state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<LangKey>('en');

  const t = translations[language];

  // ---- Handlers (useAuth + useToast) ----
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: t.loginSuccess,
          description: t.welcomeMessage,
        });
        // Optional: navigate based on role here if your AuthContext provides it
      } else {
        toast({
          title: t.loginFailed,
          description: t.invalidCredentials,
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t.error,
        description: t.somethingWrong,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (role: QuickRole) => {
    const credentials: Record<QuickRole, string> = {
      admin: 'admin@pos.com',
      cashier: 'john@pos.com',
      salesman: 'mike@pos.com',
    };
    setEmail(credentials[role]);
    setPassword('password');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // integrate your real Google OAuth here
      await new Promise((r) => setTimeout(r, 1200));
      toast({ title: t.loginSuccess, description: t.welcomeMessage });
    } catch {
      toast({ title: t.error, description: t.somethingWrong, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMosipLogin = async () => {
    setIsLoading(true);
    try {
      // integrate your real MOSIP flow here
      await new Promise((r) => setTimeout(r, 1500));
      toast({ title: t.loginSuccess, description: t.welcomeMessage });
    } catch {
      toast({ title: t.error, description: t.somethingWrong, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-purple-600/5 to-pink-600/5" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div> */}

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Language selector */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg border border-white/50 hover:bg-white/90 transition-all duration-300">
              <Globe className="w-5 h-5 text-blue-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LangKey)}
                className="text-sm border-none bg-transparent focus:outline-none cursor-pointer font-medium text-gray-700"
              >
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
              </select>
            </div>
          </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl rotate-6 animate-pulse" />
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center w-full h-full shadow-lg">
                <Store className="w-10 h-10 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-bounce" />
              </div>
            </div>
            
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              {/* <p className="text-gray-600 font-medium">{t.subtitle}</p> */}
            
          </div>

          {/* Card */}
          <Card className="backdrop-blur-sm bg-white/70 border border-white/50 shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden">
            {/* <CardHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm border-b border-white/50">
              <CardTitle className="text-gray-800 text-xl font-bold">{t.loginTitle}</CardTitle>
              <CardDescription className="text-gray-600">{t.loginDescription}</CardDescription>
            </CardHeader> */}

            <CardContent className="p-8 space-y-8">
              {/* Login form (uses useAuth + useToast) */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-gray-700 font-semibold text-sm">
                    {t.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    required
                    className="pl-4 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-gray-700 font-semibold text-sm">
                    {t.password}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      required
                      className="pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isLoading && (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    <span>{isLoading ? t.loggingIn : t.loginButton}</span>
                  </div>
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 py-1 text-gray-500 font-medium rounded-full border border-gray-200">
                    {t.orLogin}
                  </span>
                </div>
              </div>

              {/* OAuth / MOSIP */}
              <div className="space-y-4">
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285f4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34a853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#fbbc05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#ea4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-medium text-gray-700">{t.googleLogin}</span>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleMosipLogin}
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl border-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Fingerprint className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-blue-700 font-semibold">{t.mosipLogin}</span>
                      <span className="text-xs text-blue-500">{t.mosipDescription}</span>
                    </div>
                  </div>
                </Button>
              </div>

              {/* Quick Login */}
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center font-medium">{t.quickLogin}</p>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('admin')}
                    className="text-xs py-3 rounded-xl border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{t.admin}</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('cashier')}
                    className="text-xs py-3 rounded-xl border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <ShoppingCart className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{t.cashier}</span>
                    </div>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => quickLogin('salesman')}
                    className="text-xs py-3 rounded-xl border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Store className="w-4 h-4 text-purple-600" />
                      <span className="font-medium">{t.salesman}</span>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
