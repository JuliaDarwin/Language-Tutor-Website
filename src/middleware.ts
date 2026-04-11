import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/* this runs before every request in your next.js 
the goal here is to protect routes and enforce authentication
aka if someone not admin tries to go to admin pahge, or someone not signed in tries a not public page, 
they should be redirected to homepage
*/
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/about(.*)", "/contact(.*)", "/lessons(.*)", "/api/webhooks(.*)"]);

//we create the protected admin route
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  //if(!isPublicRoute(req)) await auth.protect();

  const { userId, redirectToSignIn } = await auth();
  //here says if the route is an admin route but the user is not admin, we redirect to homepage
  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
  //if the route is not public and user is not signed in
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 