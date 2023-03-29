import { Publisher, Subjects, TicketUpdatedEvent } from "@amoctagoninfotech/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
