import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@amoctagoninfotech/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
