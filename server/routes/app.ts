export default defineEventHandler((event) => {
  return sendRedirect(event, '/app/', 308);
});
