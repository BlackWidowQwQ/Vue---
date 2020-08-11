type TagItem = {
  name: string;
  value: string;
};

type RecordItem = {
  type: string;
  tag: TagItem;
  notes: string;
  amount: number;
  createdAt?: Date;
};
