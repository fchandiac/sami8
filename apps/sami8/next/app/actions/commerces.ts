'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { Commerce } from '../../hooks/useCommerce'
import { revalidatePath } from 'next/cache';


export async function findCommerceByUserId(userId: string): Promise<Commerce> {
  const response = await fetch(`${backentUrl}/commerce/findCommerceByUserId?userId=${userId}`);
  return response.json();
}


export async function updateBasicInformation(
  { id, address, phone, email }: UpdateBasicInformationCommercePros

): Promise<any> {
  
  const response = await fetch(`${backentUrl}/commerce/updateBasicInformation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, address, phone, email }),
  });
  return response.json();
}



interface UpdateBasicInformationCommercePros {
  id: string;
  address: string;
  phone: string;
  email: string;
}