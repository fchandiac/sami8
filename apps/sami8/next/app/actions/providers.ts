'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;



//http://localhost:8001/provider/findAllByCommerceId?commerceId=c5f7db33-4326-4a57-bc5f-5704ed2df0f1

export async function findAllProvidersByCommerceId(commerceId: string): Promise<any> {
  const response = await fetch(`${backentUrl}/provider/findAllByCommerceId?commerceId=${commerceId}`);
  return response.json();
}