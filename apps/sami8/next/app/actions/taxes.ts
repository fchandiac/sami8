'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { Commerce } from '../../hooks/useCommerce';
import { PaymentMethod } from '../../hooks/useCommerce';
import { revalidatePath } from 'next/cache';

// http://localhost:8001/tax/create

interface CreateTaxProps {
  name: string;
  percentage: number;
  sell: boolean;
  purchase: boolean;
  canBeDeleted?: boolean;
  commerceId: string;
}

export async function createTax(tax: CreateTaxProps): Promise<any> {
  const response = await fetch(`${backentUrl}/tax/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: tax.name,
        percentage: tax.percentage,
        sell: tax.sell,
        purchase: tax.purchase,
        canBeDeleted: tax.canBeDeleted,
        commerceId: tax.commerceId,
    }),
  });
  return response.json();
}


interface UpdateTaxProps {
  id: string;
  name: string;
  percentage: number;
  sell: boolean;
  purchase: boolean;
}

export async function updateTax(tax: UpdateTaxProps): Promise<any> {
  const response = await fetch(`${backentUrl}/tax/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        id: tax.id,
        name: tax.name,
        percentage: tax.percentage,
        sell: tax.sell,
        purchase: tax.purchase,
    }),
  });
  return response.json();
}

interface DeleteTaxProps {
  id: string;
}
// async deleteTax(@Query('id') id: string)


export async function deleteTax(tax: DeleteTaxProps): Promise<any> {
  const response = await fetch(`${backentUrl}/tax/delete?id=${tax.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}