
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Song, Beat, Video, PressRelease, Project, ProjectUpdate, InvestorProfile } from '../types';
import { MOCK_PRESS, INCUBATOR_TEXT, KANTA_BIO, INVESTMENT_PROJECTS, MOCK_VIDEOS, MOCK_SONGS } from '../constants';

interface MusicRepository {
    id: string;
    url: string;
    label: string;
}

interface SiteData {
    hero: {
        image: string;
        title: string;
        sub: string;
    };
    incubator: {
        vision: string;
        mission: string;
    };
    architect: {
        image: string;
        bio: string;
        quote: string;
    };
    music: {
        description: string;
        creditsUrl: string;
        repositories: MusicRepository[];
    };
    placements: {
        description: string;
    };
}

interface GlobalState {
    siteData: SiteData;
    songs: Song[];
    beats: Beat[];
    videos: Video[];
    pressReleases: PressRelease[];
    projects: Project[];
    investors: InvestorProfile[];
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  
  siteData: SiteData;
  updateSiteData: (section: keyof SiteData, updates: Partial<any>) => void;

  songs: Song[];
  updateSong: (id: string, data: Partial<Song>) => void;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  moveSong: (id: string, direction: 'up' | 'down') => void;

  beats: Beat[];
  updateBeat: (id: string, data: Partial<Beat>) => void;
  addBeat: (beat: Beat) => void;
  removeBeat: (id: string) => void;
  moveBeat: (id: string, direction: 'up' | 'down') => void;

  videos: Video[];
  addVideo: (video: Video) => void;
  updateVideo: (id: string, data: Partial<Video>) => void;
  removeVideo: (id: string) => void;
  moveVideo: (id: string, direction: 'up' | 'down') => void;

  pressReleases: PressRelease[];
  addPressRelease: (press: PressRelease) => void;
  updatePressRelease: (id: string, data: Partial<PressRelease>) => void;
  removePressRelease: (id: string) => void;

  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addProjectUpdate: (projectId: string, update: ProjectUpdate) => void;

  investors: InvestorProfile[];
  addInvestor: (investor: InvestorProfile) => void;
  updateInvestor: (id: string, data: Partial<InvestorProfile>) => void;
  removeInvestor: (id: string) => void;

  publish: () => Promise<void>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  exportFullState: () => void;
  importFullState: (json: string) => Promise<boolean>;
  resetToFactory: () => void;
  
  isSyncing: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// INITIAL_STATE now uses the high-quality MOCK data from constants
const INITIAL_STATE: GlobalState = {
      siteData: {
          hero: {
              // Pointing to local file which will be uploaded on deployment
              image: "/hero.mp4", 
              title: "KANTALAND HOLLYWOOD",
              sub: "INCUBATOR — THE LIGHT CAPITAL"
          },
          incubator: {
              vision: INCUBATOR_TEXT.vision,
              mission: "To create a global ecosystem where creativity, strategic insight, and culture converge. We provide the tools, the guidance, and the capital — light, fast, and intentional."
          },
          architect: {
              image: "", // Removed as requested. Placeholder will show in Admin/Editable.
              bio: KANTA_BIO.desc,
              quote: "KANTALAND is the living blueprint of a global cultural architect."
          },
          music: {
              description: "Powered by Tech Partners: AWAL / Sony music UK. Empowering artists with global reach.",
              creditsUrl: "https://credits.muso.ai/profile/d3a0d803-06ce-40e6-a7e0-80aeb0efb9b1",
              repositories: [
                  { id: 'repo-1', label: 'Master Portfolio', url: 'https://open.spotify.com/artist/1sb3bbYGpYX84TKUvdw2dO' }
              ] 
          },
          placements: {
              description: "Global publishing administration & rights management powered by our tech partner Kobalt Music."
          }
      },
      songs: MOCK_SONGS, 
      beats: [], 
      videos: MOCK_VIDEOS, 
      pressReleases: MOCK_PRESS,
      projects: INVESTMENT_PROJECTS,
      investors: [
          {
              id: 'inv-demo',
              name: 'Kanta Partner',
              email: 'kantaland@gmail.com',
              accessKey: 'KANTA0910',
              assignedProjectIds: ['inv-001', 'inv-002', 'inv-003']
          }
      ]
};

const DB_NAME = 'KantaLandDB';
const STORE_NAME = 'AppState';
const STATE_KEY = 'kantalnad_site_data_v7';

// Determine API URL based on environment
const getApiUrl = () => {
    // Always use relative path - backend serves both API and frontend
    return '/api/sync';
};

// LOCAL INDEXED DB HELPERS (FALLBACK)
const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = (e.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

const dbSave = async (data: any) => {
    try {
        const db = await initDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, STATE_KEY);
    } catch (e) {
        console.error("Local save failed", e);
    }
};

const dbLoad = async (): Promise<any> => {
    try {
        const db = await initDB();
        return new Promise((resolve) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const req = tx.objectStore(STORE_NAME).get(STATE_KEY);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => resolve(null);
        });
    } catch { return null; }
};

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState<GlobalState>(INITIAL_STATE);
  const [history, setHistory] = useState<GlobalState[]>([]);
  const [future, setFuture] = useState<GlobalState[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // AUTOMATIC SYNC LOGIC
  useEffect(() => {
      const initialize = async () => {
          setIsSyncing(true);
          const apiUrl = getApiUrl();
          
          // 1. Try to fetch from Vercel Postgres API
          try {
              const timestamp = new Date().getTime();
              const response = await fetch(`${apiUrl}?t=${timestamp}`, {
                  cache: 'no-store',
                  headers: { 
                      'Pragma': 'no-cache', 
                      'Cache-Control': 'no-cache, no-store, must-revalidate' 
                  }
              });
              
              if (response.ok) {
                  const cloudData = await response.json();
                  if (cloudData && cloudData.siteData) {
                      console.log("Loaded FRESH data from Vercel Postgres");
                      setState(cloudData);
                      dbSave(cloudData); // Update local cache with fresh cloud data
                      setIsSyncing(false);
                      return; // STOP HERE if cloud sync worked.
                  } else if (cloudData.empty) {
                      console.log("DB Empty. Using built-in defaults.");
                      // If DB is empty, we keep INITIAL_STATE (which now has high quality data)
                  }
              }
          } catch (e) {
              console.warn("Cloud sync unavailable, using local or default.", e);
          }

          // 2. Fallback to Local IndexedDB (Only if Cloud failed)
          const localData = await dbLoad();
          if (localData) {
               console.log("Loaded from Local Storage (Fallback)");
               setState(prev => ({ ...prev, ...localData }));
          }

          setIsSyncing(false);
      };

      initialize();
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (email === 'kantaland@gmail.com' && pass === 'KANTA0910') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const persist = async (newState: GlobalState) => {
      // 1. Always save locally immediately for speed
      await dbSave(newState);
  };

  const publish = async (retryCount = 0) => {
      setIsSyncing(true);
      
      // PRE-CHECK: Payload Size
      const payload = JSON.stringify(state);
      const sizeInBytes = new Blob([payload]).size;
      const sizeInMB = sizeInBytes / (1024 * 1024);
      console.log(`Payload size: ${sizeInMB.toFixed(2)} MB`);
      
      // Strict Vercel Limit
      if (sizeInMB > 4.4) {
          alert(`Sync Error: Data size (${sizeInMB.toFixed(2)}MB) exceeds Cloud limit (4.5MB).\n\nPlease delete large images/videos from the Archive to continue.`);
          setIsSyncing(false);
          return;
      }

      const apiUrl = getApiUrl();
      try {
          // 2. Push to Vercel Postgres
          const res = await fetch(apiUrl, {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer KANTA0910'
              },
              body: payload
          });
          
          if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              
              if (res.status === 413) {
                  throw new Error("Payload Too Large. Please remove some media.");
              }
              if (res.status === 500) {
                   // Retry logic for connection issues
                   if (retryCount < 1) {
                       console.log("Retrying publish...");
                       setTimeout(() => publish(retryCount + 1), 1000);
                       return;
                   }
                   throw new Error("Database Connection Error. Check Vercel Dashboard.");
              }
              
              throw new Error(errData.error || `Server Error: ${res.statusText}`);
          }
          
          if (retryCount === 0) alert("Successfully Synced to KANTALAND Cloud.");
      } catch (e: any) {
          console.error("Publish Error", e);
          if (retryCount === 0) alert(`Cloud sync failed: ${e.message}\n\nData is saved locally on this device.`);
      } finally {
          setIsSyncing(false);
      }
  };

  const updateState = (updater: (prev: GlobalState) => GlobalState) => {
      setHistory(prev => [...prev.slice(-19), state]);
      setFuture([]);
      setState(prev => {
          const next = updater(prev);
          persist(next);
          return next;
      });
  };

  const exportFullState = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
      const anchor = document.createElement('a');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", `kanta_backup.json`);
      anchor.click();
  };

  const importFullState = async (json: string) => {
      try {
          const data = JSON.parse(json);
          updateState(() => data);
          return true;
      } catch { return false; }
  };

  const resetToFactory = () => {
      if (confirm("Reset everything to factory code defaults? This will overwrite the DB on next publish.")) {
          setState(INITIAL_STATE);
          persist(INITIAL_STATE);
          window.location.reload();
      }
  };

  return (
    <AdminContext.Provider value={{
        isAuthenticated, login, logout,
        siteData: state.siteData,
        songs: state.songs,
        beats: state.beats,
        videos: state.videos,
        pressReleases: state.pressReleases,
        projects: state.projects,
        investors: state.investors,
        isSyncing,
        updateSiteData: (sec, upd) => updateState(p => ({ ...p, siteData: { ...p.siteData, [sec]: { ...p.siteData[sec], ...upd } } })),
        addVideo: (v) => updateState(p => ({ ...p, videos: [v, ...p.videos] })),
        updateVideo: (id, d) => updateState(p => ({ ...p, videos: p.videos.map(v => v.id === id ? { ...v, ...d } : v) })),
        removeVideo: (id) => updateState(p => ({ ...p, videos: p.videos.filter(v => v.id !== id) })),
        moveVideo: (id, dir) => updateState(p => {
            const idx = p.videos.findIndex(v => v.id === id);
            const nextIdx = dir === 'up' ? idx - 1 : idx + 1;
            if (nextIdx < 0 || nextIdx >= p.videos.length) return p;
            const vids = [...p.videos];
            [vids[idx], vids[nextIdx]] = [vids[nextIdx], vids[idx]];
            return { ...p, videos: vids };
        }),
        addSong: (s) => updateState(p => ({ ...p, songs: [s, ...p.songs] })),
        updateSong: (id, d) => updateState(p => ({ ...p, songs: p.songs.map(s => s.id === id ? { ...s, ...d } : s) })),
        removeSong: (id) => updateState(p => ({ ...p, songs: p.songs.filter(s => s.id !== id) })),
        moveSong: (id, dir) => updateState(p => {
             const idx = p.songs.findIndex(s => s.id === id);
             const nIdx = dir === 'up' ? idx - 1 : idx + 1;
             if (nIdx < 0 || nIdx >= p.songs.length) return p;
             const sngs = [...p.songs];
             [sngs[idx], sngs[nIdx]] = [sngs[nIdx], sngs[idx]];
             return { ...p, songs: sngs };
        }),
        addBeat: (b) => updateState(p => ({ ...p, beats: [b, ...p.beats] })),
        updateBeat: (id, d) => updateState(p => ({ ...p, beats: p.beats.map(b => b.id === id ? { ...b, ...d } : b) })),
        removeBeat: (id) => updateState(p => ({ ...p, beats: p.beats.filter(b => b.id !== id) })),
        moveBeat: (id, dir) => updateState(p => {
            const idx = p.beats.findIndex(b => b.id === id);
            const nIdx = dir === 'up' ? idx - 1 : idx + 1;
            if (nIdx < 0 || nIdx >= p.beats.length) return p;
            const bts = [...p.beats];
            [bts[idx], bts[nIdx]] = [bts[nIdx], bts[idx]];
            return { ...p, beats: bts };
        }),
        addPressRelease: (pr) => updateState(p => ({ ...p, pressReleases: [pr, ...p.pressReleases] })),
        updatePressRelease: (id, d) => updateState(p => ({ ...p, pressReleases: p.pressReleases.map(pr => pr.id === id ? { ...pr, ...d } : pr) })),
        removePressRelease: (id) => updateState(p => ({ ...p, pressReleases: p.pressReleases.filter(pr => pr.id !== id) })),
        addProject: (pj) => updateState(p => ({ ...p, projects: [pj, ...p.projects] })),
        updateProject: (id, d) => updateState(p => ({ ...p, projects: p.projects.map(pj => pj.id === id ? { ...pj, ...d } : pj) })),
        removeProject: (id) => updateState(p => ({ ...p, projects: p.projects.filter(pj => pj.id !== id) })),
        addProjectUpdate: (pid, u) => updateState(p => ({ ...p, projects: p.projects.map(pj => pj.id === pid ? { ...pj, updates: [u, ...(pj.updates || [])] } : pj) })),
        addInvestor: (i) => updateState(p => ({ ...p, investors: [...p.investors, i] })),
        updateInvestor: (id, d) => updateState(p => ({ ...p, investors: p.investors.map(i => i.id === id ? { ...i, ...d } : i) })),
        removeInvestor: (id) => updateState(p => ({ ...p, investors: p.investors.filter(i => i.id !== id) })),
        publish, undo: () => {
            if (!history.length) return;
            const prev = history[history.length - 1];
            setFuture([state, ...future]);
            setHistory(history.slice(0, -1));
            setState(prev);
            persist(prev);
        }, redo: () => {
            if (!future.length) return;
            const next = future[0];
            setHistory([...history, state]);
            setFuture(future.slice(1));
            setState(next);
            persist(next);
        }, canUndo: history.length > 0, canRedo: future.length > 0,
        exportFullState, importFullState, resetToFactory
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin error');
  return ctx;
};
