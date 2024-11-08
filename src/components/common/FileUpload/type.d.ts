export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "accept"> {
    id: string;
    label?: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    files: File[];
    accept?: string[];
}

export interface ProfileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "accept"> {
    id: string;
    label?: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    files: File | null;
    accept?: string[];
}