export interface OptionType {
  name: string;
  values: { id?: string; option_id?: string; value?: string[] }[];
  done: boolean;
}

export interface OptionItemType {
  option: OptionType;
  optionIndex: number;
  onNameChange: (index: number, name: string) => void;
  onValueChange: (
    variantIndex: number,
    valueIndex: number,
    value: string
  ) => void;
  onRemoveValue: (variantIndex: number, valueIndex: number) => void;
  onRemoveOption: (index: number) => void;
  onDone: (index: number) => void;
  onEdit: (index: number) => void;
  errors?: any;
}

export interface ProductFormValuesType {
  title: string;
  descriptions: string;
  media: any;
  category: string;
  status: boolean;
  price: number;
  productType: string;
  collections: string;
  tags: string;
  options: OptionType[];
  variants: boolean;
  brand: string;
  sku: string;
  barcode: string;
  quantity: number;
  weight: string;
  weightType: string;
  discount: string;
}

export interface ProductvariantFormValuesType {
  media: any;
  price: number;
  sku: string;
  barcode: string;
  quantity: number;
  weight: string;
  weightType: string;
  discount: string;
}
