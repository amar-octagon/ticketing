import { Publisher, OrderCancelledEvent, Subjects } from "@amoctagoninfotech/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
