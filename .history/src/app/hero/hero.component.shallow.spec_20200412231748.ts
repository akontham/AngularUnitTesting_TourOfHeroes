import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

describe("Hero Component (shallow test)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],

      /*
        We might run into below errors as there is reference of routerLink inside the template.
          Error: Template parse errors:
          Can't bind to 'routerLink' since it isn't a known property of 'a'. ("<a [ERROR ->]routerLink="/detail/{{hero.id}}">

        We can get rid of this by importing RouterTestingModule/ RouterLinkDirective.

        We don't want our angular app to route in the middle of the test if you want to test the link click operation.

        So, we can say angular spec runner to ignore any unknown elements or attributes using Schemas property.

        [NO_ERROS_SCHEMA] --> overusing this will be problem, as it might hide other issues.
        For ex: when the below anchor element is changed to ZA, the above unit test will still pass. In an ideal scenario, your angular unit test will say element za was not found.
      */
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it("should have the correct hero", () => {});
});
