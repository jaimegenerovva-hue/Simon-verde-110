export interface Property {
  id: string;
  name: string;
  location: {
    country: string;
    city: string;
    area: string;
    coordinates: [number, number];
    address: string;
  };
  price: number;
  bedrooms: number;
  bathrooms: number;
  interiorArea: number;
  plotSize: number;
  yearBuilt: number;
  propertyType: string;
  narrative: string[];
  amenities: {
    icon: string;
    label: string;
    description: string;
  }[];
  images: string[];
  agent: {
    name: string;
    role: string;
    image: string;
  };
  proximity: {
    label: string;
    time: string;
  }[];
}
