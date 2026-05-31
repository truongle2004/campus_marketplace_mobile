export type Listing = {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
};

export const categories = [
  "All",
  "Books",
  "Electronics",
  "Furniture",
  "Clothing",
] as const;

export const featuredListings: Listing[] = [
  {
    id: "1",
    title: "Calculus Textbook (9th ed.)",
    price: 25,
    category: "Books",
    location: "North Campus",
  },
  {
    id: "2",
    title: "Mini Fridge",
    price: 60,
    category: "Furniture",
    location: "West Dorms",
  },
  {
    id: "3",
    title: "TI-84 Calculator",
    price: 45,
    category: "Electronics",
    location: "Engineering Hall",
  },
  {
    id: "4",
    title: "University Hoodie (M)",
    price: 20,
    category: "Clothing",
    location: "Student Center",
  },
];
