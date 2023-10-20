export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/travel/:path*", "/admin/:path*", "/reservations/:path*"],
};
