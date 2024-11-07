export interface ButtonTypes extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    type?: "button" | "submit" | "reset";
    size?: string;
    variant?: "primary" | "secondary";
    className?: string;
    icon?: string;
    iconPosition?: "left" | "right";
    iconSize?: { width: number; height: number };
    loading?: boolean;
    disabled?: boolean;
}

// Define a type for the platforms
export type PlatformNameTypes = "Google" | "GitHub";

export interface SocialButtonTypes {
    platform: PlatformNameTypes;
}

export interface SocialPlatformTypes {
    className: string;
    icon: JSX.Element;
}