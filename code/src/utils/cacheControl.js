// Cache control strategies
export const cacheStrategies = {
  // No caching at all
  noCache: {
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0'
  },

  // Cache for a specific time (in seconds)
  cacheFor: (seconds) => ({
    'Cache-Control': `public, max-age=${seconds}`,
    'Expires': new Date(Date.now() + seconds * 1000).toUTCString()
  }),

  // Cache but must revalidate
  mustRevalidate: {
    'Cache-Control': 'must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache'
  },

  // Private cache only
  privateCache: {
    'Cache-Control': 'private, no-cache'
  }
};

// Endpoint-specific cache configurations
export const endpointCacheConfig = {
  // No cache for sensitive endpoints
  noCacheEndpoints: [
    '/auth/login',
    '/auth/logout',
    '/auth/refresh',
    '/api/user/profile',
    '/api/admin/*',
    '/api/dashboard/*'
  ],

  // Cache for 5 minutes
  shortCacheEndpoints: [
    '/api/public/*',
    '/api/static/*'
  ],

  // Cache for 1 hour
  longCacheEndpoints: [
    '/api/reference/*',
    '/api/lookup/*'
  ]
};

// Function to determine cache strategy for an endpoint
export const getCacheStrategy = (endpoint) => {
  // Check for no-cache endpoints
  if (endpointCacheConfig.noCacheEndpoints.some(pattern => 
    endpoint.match(new RegExp(pattern.replace('*', '.*'))))) {
    return cacheStrategies.noCache;
  }

  // Check for short cache endpoints
  if (endpointCacheConfig.shortCacheEndpoints.some(pattern => 
    endpoint.match(new RegExp(pattern.replace('*', '.*'))))) {
    return cacheStrategies.cacheFor(300); // 5 minutes
  }

  // Check for long cache endpoints
  if (endpointCacheConfig.longCacheEndpoints.some(pattern => 
    endpoint.match(new RegExp(pattern.replace('*', '.*'))))) {
    return cacheStrategies.cacheFor(3600); // 1 hour
  }

  // Default to no cache
  return cacheStrategies.noCache;
};

// Function to apply cache headers to API request
export const applyCacheHeaders = (endpoint, headers = {}) => {
  const cacheStrategy = getCacheStrategy(endpoint);
  return {
    ...headers,
    ...cacheStrategy
  };
}; 