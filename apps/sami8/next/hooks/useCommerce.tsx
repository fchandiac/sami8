'use client';
import React, { useState } from 'react';
import { findCommerceByUserId } from '@/app/actions/commerces';


export interface PaymentMethod {
  id?: string;
  name: string;
  credit: boolean;
  sell: boolean;
  purchase: boolean;
  canBeDeleted: boolean;
  allowsInstallments: boolean;
  maxInstallments: number;
  commerceId: string;
  comission: number;
}



export interface Commerce {
  paymentMethods: PaymentMethod[];
  id?: string;
  name?: string;
  rut?: string;
  address?: string;
  phone?: string;
  email?: string;
  identity?: string;
}

const defaultCommerce: Commerce = {
  name: '',
  rut: '',
  address: '',
  phone: '',
  email: '',
  identity: '',
  id: '',
  paymentMethods: [],
};

function useCommerce() {
  const [userCommerce, setUserCommerce] = useState<Commerce>(defaultCommerce);

  const findCommerceByUserAndSetUserComerce = async (userId: string) => {
    const findUserCommerce = await findCommerceByUserId(userId);
    setUserCommerce(findUserCommerce);
  };

  const updateBasicInformation = async (
    address: string,
    phone: string,
    email: string,
  ) => {
    setUserCommerce({
      ...userCommerce,
      address,
      phone,
      email,
    });
  };

  const updateSetCommerce = async () => {
    const findUserCommerce = await findCommerceByUserId(userCommerce.id? userCommerce.id : '');
    setUserCommerce(findUserCommerce);
  }


  return {
    userCommerce,
    setUserCommerce,
    findCommerceByUserAndSetUserComerce,
    updateBasicInformation,
    updateSetCommerce,
  };
}

export { useCommerce };
