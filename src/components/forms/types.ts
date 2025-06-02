
export interface ClientAttendee {
  id: string;
  name: string;
  clientName: string;
  title: string;
}

export interface InternalAttendee {
  id: string;
  name: string;
  title: string;
  department: string;
}

export interface Topic {
  id: string;
  name: string;
  category: string;
}

export interface NewInteractionFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}
