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

  it("should have a message when add is called", () => {
    service.add("message 1");

    expect(service.messages.length).toEqual(1);
  });
});
