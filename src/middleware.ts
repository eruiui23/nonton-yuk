import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Ambil kunci (token) dan jabatan (role) dari Cookie
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  // 2. Kenali tujuan user
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isProfilePage = request.nextUrl.pathname.startsWith('/profile'); // <-- TAMBAHAN BARU

  // SKENARIO A: Mencoba masuk halaman Admin tapi BELUM LOGIN
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // SKENARIO B: Mencoba masuk halaman Admin tapi ROLE BUKAN ADMIN
  if (isAdminPage && token && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // SKENARIO C: Mencoba masuk halaman Profile tapi BELUM LOGIN <-- TAMBAHAN BARU
  if (isProfilePage && !token) {
    // Tendang ke halaman login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // SKENARIO D: Orang yang sudah login mencoba buka halaman /login atau /register
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');
  if (isAuthPage && token) {
    // Buat apa login lagi? Suruh dia kembali ke beranda
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika semua aman, silakan lewat!
  return NextResponse.next();
}

// 3. Daftarkan rute mana saja yang mau dijaga oleh satpam ini
export const config = {
  matcher: [
    '/admin/:path*',   // Menjaga semua yang berbau /admin
    '/profile/:path*', // Menjaga semua yang berbau /profile <-- TAMBAHAN BARU
    '/login',          // Menjaga halaman login
    '/register'        // Menjaga halaman register
  ],
};