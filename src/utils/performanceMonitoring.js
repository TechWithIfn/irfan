/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and other performance metrics
 */

// Track Core Web Vitals
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Log performance metrics to console (development only)
export const logPerformanceMetrics = () => {
  if (process.env.NODE_ENV !== 'production') {
    reportWebVitals(console.log);
  }
};

// Send metrics to analytics (production)
export const sendToAnalytics = (metric) => {
  const body = JSON.stringify(metric);
  const url = '/api/analytics'; // Replace with your analytics endpoint

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
};

// Performance observer for long tasks
export const observeLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', {
              name: entry.name,
              duration: `${entry.duration}ms`,
              startTime: entry.startTime,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Browser doesn't support longtask observation
      console.warn('Long task observation not supported');
    }
  }
};

// Monitor memory usage (Chrome only)
export const monitorMemory = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    return {
      usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
    };
  }
  return null;
};

// Get navigation timing
export const getNavigationTiming = () => {
  const timing = performance.timing;
  return {
    dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
    tcpConnection: timing.connectEnd - timing.connectStart,
    serverResponse: timing.responseEnd - timing.requestStart,
    domParsing: timing.domInteractive - timing.domLoading,
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    pageLoad: timing.loadEventEnd - timing.navigationStart,
  };
};

// Resource timing
export const getResourceTiming = () => {
  const resources = performance.getEntriesByType('resource');
  const summary = {
    scripts: [],
    stylesheets: [],
    images: [],
    fonts: [],
    other: [],
  };

  resources.forEach((resource) => {
    const data = {
      name: resource.name,
      duration: resource.duration.toFixed(2),
      size: resource.transferSize,
    };

    if (resource.initiatorType === 'script') {
      summary.scripts.push(data);
    } else if (resource.initiatorType === 'link' && resource.name.includes('.css')) {
      summary.stylesheets.push(data);
    } else if (resource.initiatorType === 'img') {
      summary.images.push(data);
    } else if (resource.name.includes('.woff') || resource.name.includes('.ttf')) {
      summary.fonts.push(data);
    } else {
      summary.other.push(data);
    }
  });

  return summary;
};

// FPS monitor
export class FPSMonitor {
  constructor(callback) {
    this.callback = callback;
    this.frames = 0;
    this.lastTime = performance.now();
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }

  tick = () => {
    if (!this.isRunning) return;

    this.frames++;
    const currentTime = performance.now();

    if (currentTime >= this.lastTime + 1000) {
      const fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.callback(fps);

      this.frames = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(this.tick);
  };
}

// Bundle size analyzer helper
export const analyzeBundleSize = () => {
  const resources = performance.getEntriesByType('resource');
  let totalSize = 0;
  const breakdown = {};

  resources.forEach((resource) => {
    const size = resource.transferSize || 0;
    const type = resource.initiatorType || 'other';
    
    totalSize += size;
    breakdown[type] = (breakdown[type] || 0) + size;
  });

  return {
    total: (totalSize / 1024).toFixed(2) + ' KB',
    breakdown: Object.keys(breakdown).reduce((acc, key) => {
      acc[key] = (breakdown[key] / 1024).toFixed(2) + ' KB';
      return acc;
    }, {}),
  };
};

// Performance budget checker
export const checkPerformanceBudget = (budget = {}) => {
  const defaults = {
    maxLoadTime: 3000, // 3 seconds
    maxFirstPaint: 1000, // 1 second
    maxLargestContentfulPaint: 2500, // 2.5 seconds
    maxCumulativeLayoutShift: 0.1,
    maxFirstInputDelay: 100, // 100ms
  };

  const finalBudget = { ...defaults, ...budget };
  const timing = getNavigationTiming();
  const violations = [];

  if (timing.pageLoad > finalBudget.maxLoadTime) {
    violations.push({
      metric: 'Page Load Time',
      value: timing.pageLoad,
      budget: finalBudget.maxLoadTime,
    });
  }

  return {
    passed: violations.length === 0,
    violations,
  };
};

// Export performance report
export const generatePerformanceReport = () => {
  return {
    timestamp: new Date().toISOString(),
    navigation: getNavigationTiming(),
    resources: getResourceTiming(),
    memory: monitorMemory(),
    bundleSize: analyzeBundleSize(),
    userAgent: navigator.userAgent,
    connection: navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
    } : null,
  };
};

export default {
  reportWebVitals,
  logPerformanceMetrics,
  sendToAnalytics,
  observeLongTasks,
  monitorMemory,
  getNavigationTiming,
  getResourceTiming,
  FPSMonitor,
  analyzeBundleSize,
  checkPerformanceBudget,
  generatePerformanceReport,
};
