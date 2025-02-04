import React from 'react';

// canBeDeleted
// createdAt
// deletedAt
// id
// name
// percentage
// purchase
// sell
// updatedAt

export interface Tax {
  id: string;
  name: string;
  percentage: number;
  canBeDeleted: boolean;
  sell: boolean;
  purchase: boolean;
}

export default function useTaxes() {
  return <div>useTaxes</div>;
}
