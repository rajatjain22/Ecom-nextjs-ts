export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "accept"> {
    id: string;
    label?: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    files: File[];
    accept?: string[];
}
