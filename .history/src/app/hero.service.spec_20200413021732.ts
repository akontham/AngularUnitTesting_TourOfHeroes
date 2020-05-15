import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { inject } from "@angular/core";

describe("HeroService (Integration with Component)", () => {
  let mockMessageService;
  // creates a handle to the http mock service (mock http client testing module)
  let httpTestingController: HttpTestingController;
  let heroService: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);

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
    heroService = TestBed.get(HeroService);
  });

  describe("getHero", () => {
    it("should call get with correct URL", () => {
      /*
        getting handle to Hero Service to call getHero() method can be done in two ways
        1. Simple way using TestBed get
            Ex: TestBed.get(HeroService)
        2. Complex way using inject()

          it('should call get with correct URL',
            inject([HeroService, HttpTestingController],
              (service: HeroService, controller: HttpTestingController) => {


          }));
      */

      heroService.getHero(4).subscribe();
      // heroService.getHero(4).subscribe(); when you add this line you will run into error saying found 2 requests.
      // heroService.getHero(3).subscribe(); with this line your test will pass even though you are making a call to one
      // correct url and one wrong url - use verify on testing controller to verify exactly what we expected.

      const req = httpTestingController.expectOne("api/heroes/4");
      req.flush({ id: 4, name: "SuperDude", strength: 100 });
    });
  });
});
