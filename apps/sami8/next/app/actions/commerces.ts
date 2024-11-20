'use server';

const authUrl = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL;

export interface Commerce {
  id: string;
  name: string;
  userId: string;
  liorenToken: string;
}

// findCommerceByUserId

export const findCommercesByUserId = async (userId: string) => {
  const response = await fetch(`${authUrl}/findCommercesByUserId`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  return response.json();
};
