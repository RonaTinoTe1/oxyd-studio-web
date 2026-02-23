/**
 * OXYD Studio Service Worker
 *
 * Caching strategy:
 * - Static assets: Cache First (fonts, images, JS/CSS)
 * - HTML/API: Network First with cache fallback
 * - Offline fallback page
 */

const CACHE_VERSION = 'oxyd-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
];

// ============================================================================
// INSTALL
// ============================================================================

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// ============================================================================
// ACTIVATE
// ============================================================================

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('oxyd-') && name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// ============================================================================
// FETCH
// ============================================================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip cross-origin requests (except fonts)
  if (url.origin !== location.origin && !url.hostname.includes('fonts')) {
    return;
  }

  // Strategy based on request type
  if (isStaticAsset(url)) {
    // Static assets: Cache First
    event.respondWith(cacheFirst(request));
  } else {
    // HTML/API: Network First
    event.respondWith(networkFirst(request));
  }
});

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Check if URL is a static asset.
 */
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.woff', '.woff2'];
  return staticExtensions.some((ext) => url.pathname.endsWith(ext)) || url.pathname.includes('/assets/');
}

/**
 * Cache First strategy.
 * Try cache, fall back to network, then cache the response.
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Return offline fallback for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    throw new Error('Network request failed');
  }
}

/**
 * Network First strategy.
 * Try network, fall back to cache.
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Offline fallback for HTML
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }

    throw new Error('Network request failed and no cache available');
  }
}
