export class PartyRoom {
    constructor(
      public Name: string,
      public Description: string,
      public Type: number,
      public Screens: boolean,
      public Sound: boolean,
      public AirConditioner: boolean,
      public VideoBeam: boolean,
      public LuxuryArmchairs: boolean,
      public PricePerHour: number,
      public PartyRoomId?: number
    ) {}
}