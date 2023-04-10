import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@amoctagoninfotech/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
