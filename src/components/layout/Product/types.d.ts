export interface VariantType {
    name: string;
    values: string[];
    done: boolean;
}

export interface OptionItemType {
    option: VariantType;
    optionIndex: number;
    onNameChange: (index: number, name: string) => void;
    onValueChange: (variantIndex: number, valueIndex: number, value: string) => void;
    onRemoveValue: (variantIndex: number, valueIndex: number) => void;
    onRemoveOption: (index: number) => void;
    onDone: (index: number) => void;
    onEdit: (index: number) => void;
    errors?: any
}

export interface ProductFormValuesType {
    title: string;
    descriptions: string;
    media:any;
    category: string;
    status: string;
    price: number;
    productType: string;
    vendor: string;
    collections: string;
    tags: string;
    options: VariantType[];
    sku: string,
    barcode: string,
    quantity: number,
    brand: string,
    weight: string,
    weightType: string,
    discount: string,
}