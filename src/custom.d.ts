type TagItem = {
  name: string;
  value: string;
};

type RecordItem = {
  id: number;
  type: string;
  tag: TagItem;
  notes: string;
  amount: number;
  createdAt?: string;
};

// interface Window {}
