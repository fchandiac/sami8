import React from 'react';

// color
// size
// weightNet
// weightGross

interface AttributeOption {
  name: string;
  value: string | number;
}

interface Attribute {
  id: number;
  name: string;
  description: string;
  options: string[];
}

const initialAttributes = [];

export default function Attributes() {
  const attributesList = [
    {
      id: 0,
      name: 'Color',
      description: 'Color del producto',
      options: [
        {
          name: 'Rojo',
          value: 'red',
        },
        {
          name: 'Azul',
          value: 'blue',
        },
        {
          name: 'Verde',
          value: 'green',
        },
      ],
    },
    {
      id: 1,
      name: 'Tamaño',
      description: 'Tamaño del producto',
      options: [
        {
          name: 'Pequeño',
          value: 'small',
        },
        {
          name: 'Mediano',
          value: 'medium',
        },
        {
          name: 'Grande',
          value: 'large',
        },
      ],
    },
    {
      id: 2,
      name: 'Peso Neto',
      description: 'Peso neto del producto',
      options: [],
    },
    {
      id: 3,
      name: 'Peso Bruto',
      description: 'Peso con embalaje del producto',
      options: [],
    },
  ];

  return <div>Attributes</div>;
}

// const attributesList = () => {
//   const color : Attribute = {
//     id: 0,
//     name: 'Color',
//     description: 'Color del producto',
//     options: [
//       {
//         name: 'Rojo',
//         value: 'red'
//       },
//       {
//         name: 'Azul',
//         value: 'blue'
//       },
//       {
//         name: 'Verde',
//         value: '

//       }
//     ]
//   }
// }
