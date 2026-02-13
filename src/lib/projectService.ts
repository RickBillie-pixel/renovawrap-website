import { supabase } from "./supabase";

export interface Project {
    id: string;
    name: string;
    category: string;
    before_image_url: string | null;
    after_image_url: string | null;
    Uitdaging: string | null;
    Oplossing: string | null;
    is_featured: boolean;
    date: string | null;
    created_at?: string;
}

// Global cache outside of React lifecycle
let projectsCache: Project[] | null = null;
let fetchPromise: Promise<Project[]> | null = null;

// Persist Image objects so they don't get garbage collected before downloading
const preloadedImages: HTMLImageElement[] = [];

function preloadImageUrls(projects: Project[]) {
    // Guard: Image() is only available in the browser
    if (typeof window === 'undefined') return;
    projects.forEach((project) => {
        if (project.after_image_url) {
            const img = new window.Image();
            img.src = project.after_image_url;
            preloadedImages.push(img);
        }
        if (project.before_image_url) {
            const img = new window.Image();
            img.src = project.before_image_url;
            preloadedImages.push(img);
        }
    });
}

export const projectService = {
    /**
     * Preloads the projects into cache without returning them.
     * Safe to call multiple times - deduplicates automatically.
     */
    async preload(): Promise<void> {
        if (projectsCache || fetchPromise) return;
        try {
            await this.getProjects();
        } catch (e) {
            console.error("Failed to preload projects", e);
        }
    },

    /**
     * Gets projects. Returns cached data immediately if available.
     * If a fetch is ongoing, returns that promise.
     * If no data, fetches from Supabase and preloads images.
     */
    async getProjects(): Promise<Project[]> {
        if (projectsCache) {
            return projectsCache;
        }

        if (fetchPromise) {
            return fetchPromise;
        }

        fetchPromise = (async () => {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("is_featured", { ascending: false })
                .order("created_at", { ascending: false });

            if (error) {
                fetchPromise = null;
                throw error;
            }

            projectsCache = data || [];

            // Preload ALL images (persisted so they don't get GC'd)
            preloadImageUrls(projectsCache);

            return projectsCache;
        })();

        return fetchPromise;
    },

    /**
     * Synchronously returns the cache if available.
     */
    getCachedProjects(): Project[] | null {
        return projectsCache;
    },
};

// AUTO-START: begin preloading immediately when this module is imported
// This runs once at app startup, before any component mounts
// Guard: only preload in browser (skip during SSR prerender)
if (typeof window !== 'undefined') {
    projectService.preload();
}
