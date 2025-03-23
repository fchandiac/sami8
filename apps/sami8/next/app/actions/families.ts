'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

//http://localhost:8001/family/findAllByCommerceId?commerceId=b608c292-5d3c-41d0-8e01-7c9707537e8e

export const findAllFamiliesByCommerceId = async (commerceId:string) => {
  const response = await fetch(`${backentUrl}/family/findAllByCommerceId?commerceId=${commerceId}`);
  return response.json();
}

//http://localhost:8001/family/create

interface Family {
  name: string;
  description: string;
  commerceId: string;
}

export const createFamily = async ({
  name,
  description,
  commerceId,
}: Family) => {
  const response = await fetch(`${backentUrl}/family/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      commerceId,
    }),
  });
  return response.json();
}


interface UpdateFamily {
  id: string;
  name: string;
  description: string;
}



// http://localhost:8001/family/update

export const updateFamily = async ({
  id,
  name,
  description,
}: UpdateFamily) => {


  const response = await fetch(`${backentUrl}/family/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      name,
      description,
    }),
  });
  return response.json();
}

// http://localhost:8001/family/findFamilyById?id=132962a6-2249-4775-837d-8ec0a01901f5

export const findFamilyById = async (id: string) => {
  const response = await fetch(`${backentUrl}/family/findFamilyById?id=${id}`);
  return response.json();
}