export type GenericItem = {
    genericItemId?: number; 
    itemDetailsId?: number;
    previewImage?: string;
    name: string;
    price: number;
    onDiscount?: boolean;
    isInStock?: boolean;
    discountValue?: number;
}

export type ItemDetails = {
    itemDetailsId?: number;
    sizes?: string[];
    mainDescription?: string;
    features?: string[];
    designers?: string[];
    images: string[];
    Category?: string;
    details?: string[];
    additionalInformation?: string[];
}

export type ItemView = {
    id: number;
    genericItemId?: number;
    itemDetailsId?: number;
    previewImage?: string;
    name: string;
    price: number;
    onDiscount?: boolean;
    isInStock?: boolean;
    discountValue?: number;
    sizes?: string[];
    mainDescription?: string;
    features?: string[];
    designers?: string[];
    images: string[];
    category?: string;
    details?: string[];
    additionalInformation?: string[];
}

export type SizeOption = {
    name: string;
    className: string;
}

export type cartItem = {
    item: GenericItem;
    quantity: number;
    parentCallBack?: () => void;
}

export type Image = {
    imageLink: string;
    active: boolean;
    className: string;
}

export type dropdownProps = {
    items: any[];
    selected?: any;
}