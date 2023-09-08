export const numberFormatter = Intl.NumberFormat('en', {notation: 'compact'})
interface StatusesType {
  [key: string]: number;
}


export const Statuses: StatusesType = {
  Pending: 1,
  Live: 2,
  primary: 3,
  Deleted:4,
  secondary: 5,
  Suspended: 6,
  Draft: 7,
  Paused: 8,
  Rejected: 9,
}
