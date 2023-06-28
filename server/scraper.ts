import puppeteer, { Page } from 'puppeteer';
import { Client } from 'pg';
import { DB_PASSWORD, DB_USERNAME } from './utils/config';

interface ScrapedItem {
    title: string;
    imageUrl: string;
}

const client = new Client({
    host: 'localhost',
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'propertydb',
});

const MAX_ITEMS = 500;
const BASE_URL = 'https://www.sreality.cz/en/search/for-sale/apartments?page=';

async function scrapePage(page: Page, pageIterator: number): Promise<ScrapedItem[]> {
    const url = `${BASE_URL}${pageIterator}`;
    await page.goto(url, { waitUntil: 'networkidle2' });

    return page.evaluate(() => {
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
}

async function saveToDatabase(scrapedItems: ScrapedItem[]) {
    await client.connect();

    for (const item of scrapedItems) {
        await client.query(`INSERT INTO properties ("propertyId", title, "imageUrl") VALUES(DEFAULT, $1, $2)`, [item.title, item.imageUrl]);
    }

    await client.end();
}

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const scrapedItems: ScrapedItem[] = [];
    let pageIterator = 1;

    while (scrapedItems.length < MAX_ITEMS) {
        const properties = await scrapePage(page, pageIterator);
        scrapedItems.push(...properties);
        pageIterator += 1;
    }

    console.log(`Scraped ${scrapedItems.length} items from ${pageIterator - 1} pages.`);

    await saveToDatabase(scrapedItems);

    await browser.close();
})();
