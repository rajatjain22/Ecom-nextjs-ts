interface SideMenuItemChildren {
    label: string;
    route: string;
}

export interface SideMenuItem {
    icon?: React.ComponentType<any>;
    label: string;
    route?: string;
    badge?: number
    children?: SideMenuItemChildren[];
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => Promise<void>;
}

export interface SidebarType {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }