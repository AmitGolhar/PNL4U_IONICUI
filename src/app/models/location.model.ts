export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
}

export interface Area {
  id: number;
  name: string;
  cityId: number;
}
