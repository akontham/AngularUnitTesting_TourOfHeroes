/* we arey trying to write a unit test for a more complicated component because,
this has a child component and also has a dependency on heror service */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";

describe("Heroes Componet (complex shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];

  /* We don't want to inject the actual Hero Service as a dependency
  because it makes http calls and we don't want to test two unit simultaneously.
  Create a mock hero service

  Errors:

    Error: Template parse errors:
    Can't bind to 'hero' since it isn't a known property of 'app-hero'.

    We get the above error because a child component is referenced in the parent component .
    You can resolve this unknown element by adding the schemas property to [NO_ERRORS_SCHEMA].
    because we don't want to add a dependency and test two units at a time.

    Also, inorder for us not run into any realtime template unknown elements issue lets remove the
    remove the [NO_ERRORS_SCHEMA] & inject a mocked component.

      Copy the component along with directive & class signature with members.
      you can deletet the methods. replace templateUrl with just div tags.
      remove the export before class.
      and inject into providers.

    Error: StaticInjectorError(DynamicTestModule)[HeroesComponent -> HeroService]:
      StaticInjectorError(Platform: core)[HeroesComponent -> HeroService]:
        NullInjectorError: No provider for HeroService!

    Configure the testing service to handle the injected Service using
      LONG HANDLE METHOD

      providers: [
        HeroService
      ]
      change above to -->

      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
      what the above object says is when someone asks for HeroService use MockHeroService object.
  */

  @Component({
    selector: "app-hero",
    templateUrl: "<div></div>",
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpideMan", strength: 8 },
      { id: 2, name: "Wonder Woman", strength: 10 },
      { id: 3, name: "He Man", strength: 20 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // import { NO_ERRORS_SCHEMA } from "@angular/core";
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should set heroes correctly from service", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    /* Act - inside before each we are creating the compnent,
    which will call ngOnInit, which will calll the service,
    and we have mocked the service to return HEROES when HeroService.getHeroes is called

    So, we have to tell the angular testing module to detect changes using the below statement.
    */
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });
});
