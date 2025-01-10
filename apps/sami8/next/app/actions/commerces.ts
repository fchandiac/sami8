'use server';

const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface Commerce {
  id: string;
  name: string;
  userId: string;
  liorenToken: string;
}

// findCommerceByUserId

//http://localhost:8001/commerce/findCommerceByUserId?userId=bd65761e-7f0c-444d-8d95-22b4c47971a4

export async function findCommerceByUserId(userId: string): Promise<Commerce> {
  const response = await fetch(`${backentUrl}/commerce/findCommerceByUserId?userId=${userId}`);
  return response.json();
}
