import puppeteer from 'puppeteer';
import { Client } from 'pg';


interface ScrapedItem {
    title: string,
    imageUrl: string
}

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'propertydb'
});

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const scrapedItems: ScrapedItem[] = [];

    for (let i = 1; i <= 25; i++) {
        const url = `https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        const properties = await page.evaluate(() => {
            const properties = document.querySelectorAll('.property');
            const items: ScrapedItem[] = [];
            properties.forEach((property) => {
                const title = property.querySelector('.title')?.textContent?.trim();
                const imageUrl = property.querySelector('img')?.getAttribute('src');
                if (title && imageUrl) {
                    items.push({ title, imageUrl });
                }
            });
            return items;
        });

        scrapedItems.push(...properties);
    }

    console.log(scrapedItems);
    saveToDatabase(scrapedItems)

    await browser.close();
})();

export async function saveToDatabase(scrapedItems: ScrapedItem[]) {
    await client.connect();

    for (const item of scrapedItems) {
        await client.query(`INSERT INTO properties("propertyId", title, "imageUrl") VALUES(DEFAULT, $1, $2)`, [item.title, item.imageUrl]);
    }

    await client.end();
}

