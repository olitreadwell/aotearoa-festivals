import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  if (!token) return Response.redirect(new URL('/unsubscribe/invalid', request.url))
  await prisma.emailSubscription.deleteMany({ where: { token } })
  return Response.redirect(new URL('/unsubscribe/confirmed', request.url))
}
