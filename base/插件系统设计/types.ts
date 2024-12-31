export interface Plugin {
  name: string;
  version: string;
  description?: string;
  
  install(app: any, ...options: any[]): any;
  destroy(): void;
  enable?(): void;
  disable?(): void;
  isEnabled?(): boolean;
}