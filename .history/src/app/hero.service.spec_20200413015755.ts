import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("HeroService (Integration with Component)", () => {
  let mockMessageService;
  // creates a handle to the http mock service (mock http client testing module)
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj("add");

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService, // live service
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    /* looks inside the Test Bed moduel and figuren out the dependency being injected
    and finds the service correlates to that type and returns the handle.
    messageService = TestBed.get('MessageService'); and you can call
    messageService.add('Test Message');
    */
    httpTestingController = TestBed.get(HttpTestingController);
  });
});
