export class Customer {
  constructor(
    public Name: string,
    public IdentificationNumber: string,
    public CurrentBalance: number,
    public PhoneNumber: number,
    public CustomerId?: number
  ) {}
}
