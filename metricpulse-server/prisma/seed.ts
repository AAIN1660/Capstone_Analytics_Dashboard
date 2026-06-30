import { PrismaClient } from '@prisma/client';

const categories = ['Electronics', 'Apparel', 'Home', 'Sports'];
const regions = ['North', 'South', 'East', 'West'];

function randomBetween(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(12, 0, 0, 0);
  return d;
}

const prisma = new PrismaClient();

async function main() {
  await prisma.sale.deleteMany();

  const rows: {
    orderDate: Date;
    category: string;
    region: string;
    revenue: number;
    orderId: string;
  }[] = [];

  for (let day = 0; day < 90; day++) {
    const ordersToday = 2 + Math.floor(Math.random() * 4);
    for (let o = 0; o < ordersToday; o++) {
      rows.push({
        orderDate: daysAgo(day),
        category: categories[Math.floor(Math.random() * categories.length)]!,
        region: regions[Math.floor(Math.random() * regions.length)]!,
        revenue: randomBetween(25, 450),
        orderId: `ORD-${day}-${o}-${Math.random().toString(36).slice(2, 8)}`,
      });
    }
  }

  await prisma.sale.createMany({ data: rows });
  console.log(`Seeded ${rows.length} sales`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
