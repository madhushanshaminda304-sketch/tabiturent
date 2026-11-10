const { chromium } = require('playwright');
const path = require('path');

async function capture() {
    console.log('Launching browser...');
    const browser = await chromium.launch({
        headless: true
    });

    const context1440 = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page1440 = await context1440.newPage();
    console.log('Navigating 1440px...');
    await page1440.goto('https://tabiturient.ru/', { waitUntil: 'networkidle', timeout: 30000 });
    await page1440.screenshot({ path: path.join('.pipeline', 'before', 'desktop-1440.png'), fullPage: false });
    console.log('Saved desktop-1440.png');
    await context1440.close();

    const context375 = await browser.newContext({
        viewport: { width: 375, height: 812 },
        isMobile: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    });
    const page375 = await context375.newPage();
    console.log('Navigating 375px...');
    await page375.goto('https://tabiturient.ru/', { waitUntil: 'networkidle', timeout: 30000 });
    await page375.screenshot({ path: path.join('.pipeline', 'before', 'mobile-375.png'), fullPage: false });
    console.log('Saved mobile-375.png');
    await context375.close();

    await browser.close();
    console.log('Done screenshots!');
}

capture().catch(err => {
    console.error('Capture failed:', err);
    process.exit(1);
});
