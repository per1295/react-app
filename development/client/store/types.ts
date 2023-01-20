import type { IContactData } from "../../types/contact";

export interface State {
    isMenuOpen: boolean;
    isMobile: boolean;
    isOnDocument: boolean;
    isTablet: boolean;
    userData: IContactData | null;
}