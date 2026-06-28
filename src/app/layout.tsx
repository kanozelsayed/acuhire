import { AuthProvider } from '@/context/AuthContext'; // Update path as needed
import '@/app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}





/* // اخر حاجه عشان لو عدلت تاني ميفرقعش ف وشي */