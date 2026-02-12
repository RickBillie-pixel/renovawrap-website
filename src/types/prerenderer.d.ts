declare module '@prerenderer/renderer-puppeteer' {
    interface RendererOptions {
        headless?: boolean;
        renderAfterDocumentEvent?: string;
        renderAfterTime?: number;
        [key: string]: any;
    }

    export default class PuppeteerRenderer {
        constructor(options?: RendererOptions);
        renderRoutes(routes: string[]): Promise<any[]>;
        destroy(): void;
    }
}
