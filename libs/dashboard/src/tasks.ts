export interface Tasks {
  id: number;
  title: string;
  status: string;
  description?: string;
  startTime: string;
  endTime: string;
  dependencies: Array<{ dependency: string }>;
}
