
export class Category {
  id: string;
  name: string;
  url: string;
  order: number;
  subcategories: SubCategory[];
}

export class SubCategory {
  id: string;
  name: string;
  url: string;
}
