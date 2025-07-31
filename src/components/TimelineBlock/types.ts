export interface EventItem {
  year: number;
  title: string;
  description: string;
}

export interface TimeSlice {
  id: string;     
  from: number;   
  to  : number;   
  label?: string; 
  events: EventItem[];
}
