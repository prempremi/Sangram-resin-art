import { AnalyticsData, VisitEvent } from './auth';

const STORAGE_KEY_ANALYTICS = 'sangram_analytics_events_v2';
const STORAGE_KEY_SESSION = 'sangram_visitor_session_id';

const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const trackPageView = async (path: string = window.location.pathname) => {
  try {
    const event: VisitEvent = {
      id: `vis_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      path: path || '/',
      timestamp: new Date().toISOString(),
      device: getDeviceType(),
      referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct Visit',
      city: 'Odisha, IN'
    };

    // 1. Try sending to backend server
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(() => {
      // offline fallback
    });

    // 2. Save locally for client display
    let events: VisitEvent[] = [];
    const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (raw) {
      try {
        events = JSON.parse(raw);
      } catch {
        events = [];
      }
    }

    events.unshift(event);
    if (events.length > 200) {
      events = events.slice(0, 200);
    }
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(events));
  } catch (err) {
    console.debug('Analytics track error', err);
  }
};

export const getAnalyticsData = async (token?: string | null): Promise<AnalyticsData> => {
  // 1. Try real server endpoint
  if (token) {
    try {
      const res = await fetch('/api/analytics', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // offline fallback
    }
  }

  // 2. Compute from local storage
  let events: VisitEvent[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (raw) events = JSON.parse(raw);
  } catch {
    events = [];
  }

  // Device counts
  let mobileCount = 0;
  let desktopCount = 0;
  let tabletCount = 0;
  const pathCounts: Record<string, number> = {};

  events.forEach((ev) => {
    if (ev.device === 'mobile') mobileCount++;
    else if (ev.device === 'tablet') tabletCount++;
    else desktopCount++;

    const p = ev.path || '/';
    pathCounts[p] = (pathCounts[p] || 0) + 1;
  });

  const topPages = Object.entries(pathCounts)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalVisitors: Math.max(events.length > 0 ? 1 : 0, Math.round(events.length * 0.8)),
    pageViews: events.length,
    recentVisits: events.slice(0, 25),
    deviceBreakdown: {
      mobile: mobileCount,
      desktop: desktopCount,
      tablet: tabletCount
    },
    topPages: topPages.length > 0 ? topPages : [
      { path: '/', count: events.length }
    ]
  };
};
