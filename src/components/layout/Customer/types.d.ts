export interface CustomerFormValuesType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: number;
  gender: string;
  dateOfBirth: string;
  profile: File | null;
  notes: string;
  tags: string;
  shippingAddressId?: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  city: string;
  state: string;
  district: string;
  postalCode: string;
  country: string;
  shippingAddress: {
    id?: string;
    shippingAddressLine1: string;
    shippingAddressLine2: string;
    city: string;
    state: string;
    district: string;
    postalCode: string;
    country: string;
  }[];
}
