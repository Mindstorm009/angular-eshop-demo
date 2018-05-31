
export class Category {
  id: string;
  name: string;
  url: string;
  order: number;
  subcategories: SubCategory[];
}

export class SubCategory {
  name: string;
  url: string;
}
