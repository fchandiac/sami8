const states = [
  {
    name: 'Arica y Parinacota',
    romanNumber: 'XV',
    number: '15',
    cities: ['Arica', 'Camarones', 'General Lagos', 'Putre'],
  },
  {
    name: 'Tarapacá',
    romanNumber: 'I',
    number: '1',
    cities: [
      'Alto Hospicio',
      'Camiña',
      'Colchane',
      'Huara',
      'Iquique',
      'Pica',
      'Pozo Almonte',
    ],
  },
  {
    name: 'Antofagasta',
    romanNumber: 'II',
    number: '2',
    cities: [
      'Antofagasta',
      'Calama',
      'María Elena',
      'Mejillones',
      'Ollagüe',
      'San Pedro de Atacama',
      'Sierra Gorda',
      'Taltal',
      'Tocopilla',
    ],
  },
  {
    name: 'Atacama',
    romanNumber: 'III',
    number: '3',
    cities: [
      'Alto del Carmen',
      'Caldera',
      'Chañaral',
      'Copiapó',
      'Diego de Almagro',
      'Freirina',
      'Huasco',
      'Tierra Amarilla',
      'Vallenar',
    ],
  },
  {
    name: 'Coquimbo',
    romanNumber: 'IV',
    number: '4',
    cities: [
      'Andacollo',
      'Canela',
      'Combarbalá',
      'Coquimbo',
      'Illapel',
      'La Higuera',
      'La Serena',
      'Los Vilos',
      'Monte Patria',
      'Ovalle',
      'Paiguano',
      'Punitaqui',
      'Río Hurtado',
      'Salamanca',
      'Vicuña',
    ],
  },
  {
    name: 'Valparaíso',
    romanNumber: 'V',
    number: '5',
    cities: [
      'Algarrobo',
      'Cabildo',
      'Calera',
      'Calle Larga',
      'Cartagena',
      'Casablanca',
      'Catemu',
      'Concón',
      'El Quisco',
      'El Tabo',
      'Hijuelas',
      'Isla de Pascua',
      'Juan Fernández',
      'La Cruz',
      'La Ligua',
      'Limache',
      'Llaillay',
      'Los Andes',
      'Nogales',
      'Olmué',
      'Panquehue',
      'Papudo',
      'Petorca',
      'Puchuncaví',
      'Putaendo',
      'Quillota',
      'Quilpué',
      'Quintero',
      'Rinconada',
      'San Antonio',
      'San Esteban',
      'San Felipe',
      'Santa María',
      'Santo Domingo',
      'Valparaíso',
      'Villa Alemana',
      'Viña del Mar',
      'Zapallar',
    ],
  },
  {
    name: 'Metropolitana de Santiago',
    romanNumber: 'XIII',
    number: '13',
    cities: [
      'Alhué',
      'Buin',
      'Calera de Tango',
      'Cerrillos',
      'Cerro Navia',
      'Colina',
      'Conchalí',
      'Curacaví',
      'El Bosque',
      'El Monte',
      'Estación Central',
      'Huechuraba',
      'Independencia',
      'Isla de Maipo',
      'La Cisterna',
      'La Florida',
      'La Granja',
      'La Pintana',
      'La Reina',
      'Lampa',
      'Las Condes',
      'Lo Barnechea',
      'Lo Espejo',
      'Lo Prado',
      'Macul',
      'Maipú',
      'María Pinto',
      'Melipilla',
      'Ñuñoa',
      'Padre Hurtado',
      'Paine',
      'Pedro Aguirre Cerda',
      'Peñaflor',
      'Peñalolén',
      'Pirque',
      'Providencia',
      'Pudahuel',
      'Puente Alto',
      'Quilicura',
      'Quinta Normal',
      'Recoleta',
      'Renca',
      'San Bernardo',
      'San Joaquín',
      'San José de Maipo',
      'San Miguel',
      'San Pedro',
      'San Ramón',
      'Santiago',
      'Talagante',
      'Tiltil',
      'Vitacura',
    ],
  },
  {
    name: 'Libertador Gral. Bernardo O’Higgins',
    romanNumber: 'VI',
    number: '6',
    cities: [
      'Chimbarongo',
      'Chépica',
      'Codegua',
      'Coinco',
      'Coltauco',
      'Doñihue',
      'Graneros',
      'La Estrella',
      'Las Cabras',
      'Litueche',
      'Lolol',
      'Machalí',
      'Malloa',
      'Marchihue',
      'Nancagua',
      'Navidad',
      'Olivar',
      'Palmilla',
      'Paredones',
      'Peralillo',
      'Peumo',
      'Pichidegua',
      'Pichilemu',
      'Placilla',
      'Pumanque',
      'Quinta de Tilcoco',
      'Rancagua',
      'Rengo',
      'Requínoa',
      'San Fernando',
      'San Francisco de Mostazal',
      'San Vicente de Tagua Tagua',
      'Santa Cruz',
    ],
  },
  {
    name: 'Maule',
    romanNumber: 'VII',
    number: '7',
    cities: [
      'Cauquenes',
      'Chanco',
      'Colbún',
      'Constitución',
      'Curepto',
      'Curicó',
      'Empedrado',
      'Hualañé',
      'Licantén',
      'Linares',
      'Longaví',
      'Maule',
      'Molina',
      'Parral',
      'Pelarco',
      'Pelluhue',
      'Pencahue',
      'Rauco',
      'Retiro',
      'Romeral',
      'Río Claro',
      'Sagrada Familia',
      'San Clemente',
      'San Javier de Loncomilla',
      'San Rafael',
      'Talca',
      'Teno',
      'Vichuquén',
      'Villa Alegre',
      'Yerbas Buenas',
    ],
  },
  {
    name: 'Ñuble',
    romanNumber: 'XVI',
    number: '16',
    cities: [
      'Bulnes',
      'Chillán Viejo',
      'Chillán',
      'Cobquecura',
      'Coelemu',
      'Coihueco',
      'El Carmen',
      'Ninhue',
      'Ñiquén',
      'Pemuco',
      'Pinto',
      'Portezuelo',
      'Quillón',
      'Quirihue',
      'Ránquil',
      'San Carlos',
      'San Fabián',
      'San Ignacio',
      'San Nicolás',
      'Treguaco',
      'Yungay',
    ],
  },
  {
    name: 'Biobío',
    romanNumber: 'VIII',
    number: '8',
    cities: [
      'Alto Biobío',
      'Antuco',
      'Arauco',
      'Cabrero',
      'Cañete',
      'Chiguayante',
      'Concepción',
      'Contulmo',
      'Coronel',
      'Curanilahue',
      'Florida',
      'Hualpén',
      'Hualqui',
      'Laja',
      'Lebu',
      'Los Álamos',
      'Los Ángeles',
      'Lota',
      'Mulchén',
      'Nacimiento',
      'Negrete',
      'Penco',
      'Quilaco',
      'Quilleco',
      'San Pedro de la Paz',
      'San Rosendo',
      'Santa Bárbara',
      'Santa Juana',
      'Talcahuano',
      'Tirúa',
      'Tomé',
      'Tucapel',
      'Yumbel',
    ],
  },
  {
    name: 'Araucanía',
    romanNumber: 'IX',
    number: '9',
    cities: [
      'Angol',
      'Carahue',
      'Cholchol',
      'Collipulli',
      'Cunco',
      'Curacautín',
      'Curarrehue',
      'Ercilla',
      'Freire',
      'Galvarino',
      'Gorbea',
      'Lautaro',
      'Loncoche',
      'Lonquimay',
      'Los Sauces',
      'Lumaco',
      'Melipeuco',
      'Nueva Imperial',
      'Padre las Casas',
      'Perquenco',
      'Pitrufquén',
      'Pucón',
      'Purén',
      'Renaico',
      'Saavedra',
      'Temuco',
      'Teodoro Schmidt',
      'Toltén',
      'Traiguén',
      'Victoria',
      'Vilcún',
      'Villarrica',
    ],
  },
  {
    name: 'Los Ríos',
    romanNumber: 'XIV',
    number: '14',
    cities: [
      'Corral',
      'Futrono',
      'La Unión',
      'Lago Ranco',
      'Lanco',
      'Los Lagos',
      'Mariquina',
      'Máfil',
      'Paillaco',
      'Panguipulli',
      'Río Bueno',
      'Valdivia',
    ],
  },
  {
    name: 'Los Lagos',
    romanNumber: 'X',
    number: '10',
    cities: [
      'Ancud',
      'Calbuco',
      'Castro',
      'Chaitén',
      'Chonchi',
      'Cochamó',
      'Curaco de Vélez',
      'Dalcahue',
      'Fresia',
      'Frutillar',
      'Futaleufú',
      'Hualaihué',
      'Llanquihue',
      'Los Muermos',
      'Maullín',
      'Osorno',
      'Palena',
      'Puerto Montt',
      'Puerto Octay',
      'Puerto Varas',
      'Puqueldón',
      'Purranque',
      'Puyehue',
      'Queilén',
      'Quellón',
      'Quemchi',
      'Quinchao',
      'Río Negro',
      'San Juan de la Costa',
      'San Pablo',
    ],
  },
  {
    name: 'Aisén del Gral. Carlos Ibáñez del Campo',
    romanNumber: 'XI',
    number: '11',
    cities: [
      'Aisén',
      'Chile Chico',
      'Cisnes',
      'Cochrane',
      'Coihaique',
      'Guaitecas',
      'Lago Verde',
      'O’Higgins',
      'Río Ibáñez',
      'Tortel',
    ],
  },
  {
    name: 'Magallanes y de la Antártica Chilena',
    romanNumber: 'XII',
    number: '12',
    cities: [
      'Antártica',
      'Cabo de Hornos (Ex Navarino)',
      'Laguna Blanca',
      'Natales',
      'Porvenir',
      'Primavera',
      'Punta Arenas',
      'Río Verde',
      'San Gregorio',
      'Timaukel',
      'Torres del Paine',
    ],
  },
];
export default states;
