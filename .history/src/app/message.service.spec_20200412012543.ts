// Example of isolated unit testing a service

import { MessageService } from "./message.service";

describe("MessageService", () => {
  let service: MessageService;

  /* beforeEach(() => {
    service = new MessageService();
  }); */

  it("should have no messages at start", () => {
    service = new MessageService();
    expect(service.messages.length).toEqual(0);
  });

  it("should have a message when add is called", () => {
    service = new MessageService();
    service.add("message 1");

    expect(service.messages.length).toEqual(1);
  });

  it("should clear all the messages when clear is called", () => {
    // arrange
    service = new MessageService();
    service.add("message 1");

    // act
    service.clear();

    // assert
    expect(service.messages.length).toEqual(0);
  });
});
