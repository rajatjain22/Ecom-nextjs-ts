export interface VariantType {
    name: string;
    values: string[];
    done: boolean;
}

export interface VariantItemType {
    variant: VariantType;
    variantIndex: number;
    onNameChange: (index: number, name: string) => void;
    onValueChange: (variantIndex: number, valueIndex: number, value: string) => void;
    onRemoveValue: (variantIndex: number, valueIndex: number) => void;
    onRemoveVariant: (index: number) => void;
    onDone: (index: number) => void;
    onEdit: (index: number) => void;
    errors?: any
}

export interface ProductFormValuesType {
    title: string;
    descriptions: string;
    category: string;
    status: string;
    price: string;
    compareAtPrice: string;
    productType: string;
    vendor: string;
    collections: string;
    tags: string;
    variants: VariantType[];
    sku: string,
    barcode: string,
    quantity: number,
    brand: string,
    weight: string,
    weightType: string,
    discount: string,
}