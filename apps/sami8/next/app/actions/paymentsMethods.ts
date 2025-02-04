'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { Commerce } from '../../hooks/useCommerce';
import { PaymentMethod } from '../../hooks/useCommerce';
import { revalidatePath } from 'next/cache';

export async function deletePymentMethod(id: string): Promise<any> {
  console.log(`Deleting payment method with id: ${id}`);
  const response = await fetch(`${backentUrl}/payment-method/delete?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response);
  return response.json();
}

// name: string;
// credit: boolean;
// allowsInstallments?: boolean;
// maxInstallments?: number;
// comission?: number;
// canBeDeleted?: boolean;
// commerceId?: string; // ID del comercio asociado

interface CreatePaymentMethodProps {
  name: string;
  credit: boolean;
  allowsInstallments?: boolean;
  maxInstallments?: number;
  comission?: number;
  canBeDeleted?: boolean;
  commerceId?: string;
  sell: boolean;
  purchase: boolean;
}

export async function createPaymentMethod(
  paymentMethod: CreatePaymentMethodProps,
): Promise<any> {
  console.log(`Creating payment method`);
  console.log(`Creating payment method`);
  console.log(paymentMethod);

  const response = await fetch(`${backentUrl}/payment-method/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentMethod),
  });
  console.log(response);
  return response.json();
}

// http://localhost:8001/payment-method/update

interface UpdatePaymentMethodProps {
  id: string;
  name: string;
  credit: boolean;
  allowsInstallments?: boolean;
  maxInstallments?: number;
  comission?: number;
  canBeDeleted?: boolean;
  commerceId?: string;
  sell: boolean;
  purchase: boolean;
}

export async function updatePaymentMethod(
  paymentMethod: UpdatePaymentMethodProps,
): Promise<any> {
  // console.log(`Updating payment method`, paymentMethod);

  const response = await fetch(`${backentUrl}/payment-method/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentMethod),
  });

  return response.json();

  // return paymentMethod;
}
