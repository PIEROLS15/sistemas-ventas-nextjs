export interface Sale {
    id: number;
    saleCode: string;
    customerName: string;
    email: string;
    totalAmount: string;
    seller: {
        firstName: string;
        lastName: string;
    };
    status: string;
    createdAt: string;
    updatedAt: string;
    identification: {
        type: string,
    },
    identificationNumber: string;
    SaleDetail: [
        {
            product: {
                name: string
            },
            quantity: number,
            unitPrice: string,
            subtotal: string,
        }
    ]
}

export interface Identification {
    id: number
    type: string
}

export interface SaleReport {
    id: number
    saleCode: string
    customerName: string
    email: string
    identificationNumber: string
    identification: {
        type: string
    }
    totalAmount: string
    totalProducts: number
    status: string
    createdAt: string
}

export interface SalesReportResultsCardProps {
    filteredSales: SaleReport[]
    isExporting: "excel" | "pdf" | "csv" | null
    setIsExporting: (type: "excel" | "pdf" | "csv" | null) => void
}


export interface SaleData {
    customerName: string;
    identificationType: string;
    identificationNumber: string;
    email: string;
    products: { id: string; quantity: number }[];
}

export interface SalesHeaderProps {
    fetchSales: () => void;
}

export interface SalesTableProps {
    sales: Sale[];
    loading: boolean;
    error: string | null;
    fetchSales: () => void;
}

export interface SaleDetailsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    sale: Sale
}

export interface SaleStatusDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    sale: Sale
    onSuccess: () => void;
}

export interface CreateSaleDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
}
