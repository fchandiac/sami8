'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// http://localhost:8001/customer/findAll

export async function findAllCustomers(): Promise<any> {
  const response = await fetch(`${backentUrl}/customer/findAll`);
  return response.json();
}

//http://localhost:8001/customer/findAllByCommerceId?commerceId=c5f7db33-4326-4a57-bc5f-5704ed2df0f1

export async function findAllCustomersByCommerceId(commerceId: string): Promise<any> {
  const response = await fetch(`${backentUrl}/customer/findAllByCommerceId?commerceId=${commerceId}`);
  return response.json();
}

interface CreateCustomerProps {
  commerceId: string;
  name: string;
  socialReason?: string;
  rut: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  state?: string | null;
  city?: string | null;
}
  


//http://localhost:8001/customer/create

export async function createCustomer(data: CreateCustomerProps): Promise<any> {
  const response = await fetch(`${backentUrl}/customer/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}