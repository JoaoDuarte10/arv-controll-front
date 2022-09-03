import { v4 as uuid } from 'uuid';

export function randomId(): string {
  return uuid();
}
