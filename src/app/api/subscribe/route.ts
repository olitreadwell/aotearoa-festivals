import { prisma } from '@/lib/prisma'
import { Region } from '@/generated/prisma'

export async function POST(request: Request) {
  const data = await request.formData()
  const email = (data.get('email') as string | null)?.trim().toLowerCase()
  const regionRaw = data.get('region') as string | null

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!regionRaw || !Object.values(Region).includes(regionRaw as Region)) {
    return Response.json({ error: 'Invalid region' }, { status: 400 })
  }

  await prisma.emailSubscription.upsert({
    where: { email_region: { email, region: regionRaw as Region } },
    update: {},
    create: { email, region: regionRaw as Region },
  })

  return Response.redirect(new URL('/subscribe/confirmed', request.url))
}
