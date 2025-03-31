"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import DetailSaleDialog from "@/components/layout/sales/detailSaleDialog"
import SaleStatusDialog from "@/components/layout/sales/saleStatusDialog"
import { getStatusBadge, formatPrice } from '@/utils/productUtils';
import { SaleCardProps, Sale } from '@/types/sales';

export function SaleCard({ sales, fetchSales }: SaleCardProps) {
    const [statusSale, setStatusSale] = useState<Sale | null>(null)
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const stockStatus = getStatusBadge(sales.status);

    const handleSuccess = () => {
        fetchSales();
    };

    return (
        <>
            <Card className="h-full flex flex-col">
                <CardContent className="flex-1 pt-6">
                    <div className="space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-lg">{sales.customerName}</h3>
                                <p className="text-sm text-muted-foreground">{sales.email}</p>
                            </div>
                            <Badge variant={stockStatus.variant}>
                                {stockStatus.label}
                            </Badge>
                        </div>
                        <p className="text-2xl font-bold">{formatPrice(sales.totalAmount)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm" onClick={() => setShowDetailsDialog(true)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                    </Button>
                    {sales.status !== "Completed" && (
                        <Button
                            onClick={() => setStatusSale({ ...sales, status: "Completed" })}
                            variant="success"
                        >
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                    )}

                    {sales.status !== "Canceled" && (
                        <Button
                            onClick={() => setStatusSale({ ...sales, status: "Canceled" })}
                            variant="destructive"
                        >
                            <XCircle className="h-4 w-4" />
                        </Button>
                    )}

                </CardFooter>
            </Card>

            {showDetailsDialog && (
                <DetailSaleDialog
                    open={showDetailsDialog}
                    onOpenChange={(open) => setShowDetailsDialog(open)}
                    sale={sales}
                />
            )}

            {statusSale && (
                <SaleStatusDialog
                    open={!!statusSale}
                    onOpenChange={(open) => !open && setStatusSale(null)}
                    sale={statusSale}
                    onSuccess={handleSuccess}
                />
            )}

        </>
    );
}