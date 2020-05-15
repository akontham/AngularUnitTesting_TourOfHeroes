// Example of isolated unit testing a service

import { MessageService } from "./message.service";

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("should have no messages at start", () => {
    expect(service.messages.length).toEqual(0);
  });
});
