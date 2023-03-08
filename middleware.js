import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Get NextResponse from Next.js.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition.
  if (session?.user.email?.match(/@gmail.com$/) || session?.user.email?.match(/@outlook.com$/)) {
    // Authentication successful, forward request to protected route.
    return res;
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = '/login';
  redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

// Path matchers can be used to apply middleware to specific routes.
export const config = {
  matcher: ['/profile/', '/saved-jobs/', '/jobs/new'],
};
