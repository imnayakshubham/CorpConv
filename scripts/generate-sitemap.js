import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dirname } from 'path';
import axios from 'axios';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '..');
dotenv.config({ path: path.join(rootDir, '.env') });

if (process.env.VITE_APP_ENV !== 'production') {
    console.log('Skipping sitemap generation in development');
    process.exit(0);
}

const BASE_URL = process.env.VITE_APP_APP_URL || 'https://corpconv.vercel.app/';
const API_URL = process.env.VITE_APP_API_URL;

const routes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'posts', priority: '0.8', changefreq: 'daily' },
    { path: 'jobs', priority: '0.8', changefreq: 'daily' },
    { path: 'users', priority: '0.7', changefreq: 'daily' },
    { path: 'answerlink', priority: '0.8', changefreq: 'daily' },
];


const getDynamicRoutes = async () => {
    try {
        const data = await axios.get(`${API_URL}site_map/data`)
        if (data.status === 200) {

            const changefreqs = ['daily', 'weekly']
            const randomChangefreq = changefreqs[Math.floor(Math.random() * changefreqs.length)]

            const priorities = [0.7, 0.8]
            const randomPriority = priorities[Math.floor(Math.random() * priorities.length)]

            const routes = data?.data?.data?.map((route) => ({
                path: route,
                priority: randomPriority,
                changefreq: randomChangefreq
            }))
            return routes
        }
        return []
    } catch (error) {
        console.error('Error fetching dynamic routes:', error);
        return [];
    }


}

const generateSitemap = async () => {
    const dynamicRoutes = await getDynamicRoutes();

    const allRoutes = [...routes, ...dynamicRoutes]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
            .map(
                (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');

    // Create public directory if it doesn't exist
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap to public directory
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
};

try {
    generateSitemap();
} catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
}