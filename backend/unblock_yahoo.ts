import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function injectSession() {
  // Your cookie string (Keep it exactly as you had it)
  const browserCookies = "A1=d=AQABBCyk7GkCEB6mD-HQwizfn7l1oI5EzLYFEgEACAIFAmooatxmzSMA_eMDAAcILKTsaY5EzLYID0-D8Vg1uAD8TmHo_bBF2QkBBwoBhw&S=AQAAAhO16fG7DgQZ7W48LJu9hl0; A3=d=AQABBCyk7GkCEB6mD-HQwizfn7l1oI5EzLYFEgEACAIFAmooatxmzSMA_eMDAAcILKTsaY5EzLYID0-D8Vg1uAD8TmHo_bBF2QkBBwoBhw&S=AQAAAhO16fG7DgQZ7W48LJu9hl0; _cb=DUhcyC5cgdXDgqYQP; _chartbeat2=.1777116211013.1778433252406.1100000010000001.7_9TIBWOTTYBzLnNXBLgxVSBjZDTm.3; PRF=dock-collapsed%3Dtrue%26t%3DSOFI%252BMTN.JO; GUC=AQEACAJqAgVqKEIgWASM&s=AQAAAMrTE7XE&g=agC8Pg; A1S=d=AQABBCy…6c5c31ead747769faacf877c&gk=x1a9z-qJCjBBcc&sk=x1a9z-qJCjBBcc&bk=x1a9z-qJCjBBcc&iv=1620D98CF7665662C4E5973ACB9DAB01&v=1&u=0; F=d=RjGN6.c9vFAo31nMXGWvARfcbvOUT4X.lziytmAtAOpkA6hDmOs65YlUefv.WD9oRA--; PH=l=en-US; Y=v=1&n=2vakq3eaiijse&l=9u1w4x4os3km4e2s2lhug9tid29n5e6wlosjotia/o&p=034vvng00000000&r=1gl&intl=us; ySID=v=1&d=8vYAqkOICA--; cmp=t=1778433063&j=0&u=1YNN; _ebd=bid-bdj24hpkup91c&d=39059b1b77d8ff7eaca9fdeaf985b4fc&s=bidhashk-EhWPKBbF; _chartbeat4=t=O3rZmtSoMTz9myJhbVQDHV97C&E=16&x=0&c=1.81&y=3598&w=713";

  const parsedCookies = browserCookies.split('; ').map(c => {
    const [key, ...vals] = c.split('=');
    return { 
      key: key?.trim(), 
      value: vals.join('=').trim(), 
      domain: '.yahoo.com', 
      path: '/' 
    };
  }).filter(c => c.key && c.value);

  const cookieJar = { cookies: parsedCookies };

  try {
    // This Key must match exactly what marketservice.ts uses
    await prisma.systemConfig.upsert({
      where: { key: 'yahoo-finance-cookies' },
      update: { value: JSON.stringify(cookieJar) },
      create: { key: 'yahoo-finance-cookies', value: JSON.stringify(cookieJar) }
    });
    console.log("--------------------------------------------------");
    console.log("✅ SESSION INJECTED SUCCESSFULLY!");
    console.log("--------------------------------------------------");
    console.log("Please restart your server now.");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

injectSession();
