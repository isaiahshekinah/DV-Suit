export const SuitList = [
  {
    id: 1,
    name: 'The Regent',
    category: 'Two-Piece Suit',
    price: 550000,
    tag: 'BESTSELLER',
    description: 'A timeless tailored silhouette designed for weddings, important meetings, and evenings that call for a little more.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
    colors: [
      { name: 'Midnight Navy', hex: '#18243a' },
      { name: 'Charcoal', hex: '#444442' },
      { name: 'Black', hex: '#171717' },
      { name: 'Burgundy', hex: '#642b3a' },
    ],
  },
  {
    id: 2,
    name: 'The Kingsley',
    category: 'Three-Piece Suit',
    price: 900000,
    tag: 'SIGNATURE',
    description: 'A refined three-piece set with a confident shape and considered details for formal occasions.',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85',
    colors: [
      { name: 'Black', hex: '#171717' },
      { name: 'Midnight Navy', hex: '#18243a' },
      { name: 'Olive', hex: '#555844' },
      { name: 'Stone', hex: '#b8aa92' },
    ],
  },
  {
    id: 3,
    name: 'The Milano',
    category: 'Modern Slim Fit',
    price: 165000,
    tag: 'MODERN FIT',
    description: 'Clean lines and a contemporary fit that moves easily from office hours to after-hours plans.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85',
    colors: [
      { name: 'Charcoal', hex: '#444442' },
      { name: 'Midnight Navy', hex: '#18243a' },
      { name: 'Camel', hex: '#ad8b61' },
      { name: 'Black', hex: '#171717' },
    ],
  },
  {
    id: 4,
    name: 'The Savile',
    category: 'Wedding Suit',
    price: 1100000,
    tag: 'OCCASION',
    description: 'A statement-making tailored suit for the days you will remember long after the photographs.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
    colors: [
      { name: 'Ivory', hex: '#e6dfd0' },
      { name: 'Black', hex: '#171717' },
      { name: 'Burgundy', hex: '#642b3a' },
      { name: 'Midnight Navy', hex: '#18243a' },
    ],
  },
]

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(price)
