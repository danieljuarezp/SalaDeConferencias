export class Reservation {
    constructor(
      public PartyRoomId: number,
      public CustomerId: number,
      public StartTime: Date,
      public EndTime: Date,
      public TotalPrice: number,
      public AlreadyPaid: boolean,
      public Confirmed: boolean,
      public ReservationId?: number
    ) {}
}
