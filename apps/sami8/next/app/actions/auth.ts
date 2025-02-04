'use server';
const authUrl = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL;


export const signIn = async (userName: string, password: string) => {
  const response = await fetch(`${authUrl}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, password }),
  });

  return response.json();
};



export const findUserByEmail = async (email: string) => {
  const response = await fetch(`${authUrl}/findUserByEmail?email=${email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

