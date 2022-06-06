export type Events = {
  id: number;
  name: string;
  date: string
  starts: string
  ends: string
  created_at: string
  updated_at: string
  deleted_at: string | null;
  image: any[];
  media: any[];
};

export interface EventsResponses {
  data: Events[];
}
