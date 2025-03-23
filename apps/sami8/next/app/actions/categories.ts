'use server';
const backentUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// http://localhost:8001/category/findAllByCommerceId?commerceId=b608c292-5d3c-41d0-8e01-7c9707537e8e

export async function findAllCategoriesByCommerceId(
  commerceId: string,
): Promise<any> {
  const response = await fetch(
    `${backentUrl}/category/findAllByCommerceId?commerceId=${commerceId}`,
  );
  return response.json();
}

// http://localhost:8001/category/create

interface createCategory {
  name: string;
  description: string;
  commerceId: string;
  familyId: string;
}

export async function createCategory(category: createCategory): Promise<any> {
  const response = await fetch(`${backentUrl}/category/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
}



//http://localhost:8001/category/update

interface UpdateCtegory {
  id: string;
  name: string;
  description: string;
  familyId: string;
}

export async function updateCategory(category: UpdateCtegory ): Promise<any> {
  const response = await fetch(`${backentUrl}/category/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  });
  return response.json();
}
