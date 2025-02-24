export const FEATURE_NAME = 'clients';

export interface ClientsState {
  data: ClientEntity[];
}

export interface ClientEntity {
  id: number;
  clientName: string;
}

export interface ClientAddPayload {
  clientName: string;
}

export interface ClientAddResponse extends ClientEntity {}
