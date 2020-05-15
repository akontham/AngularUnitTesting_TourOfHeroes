import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe("HeroService (Integration with Component)", () => {
  let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj("add");

    TestBed.configureTestingModule({
      providers: [
        HeroService, // live service
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
  });
});
