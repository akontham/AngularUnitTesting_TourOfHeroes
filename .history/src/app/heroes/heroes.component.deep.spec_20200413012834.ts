/* Deep Integration Test with a Live component */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("Heroes Componet (deep test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "Wonderful Woman", strength: 10 },
      { id: 3, name: "BatDude", strength: 20 },
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA], // add this to resolve the ERROR: Template parse errors: Can't bind to 'routerLink' since it isn't a known property of 'a'. ("<a [ERROR ->]routerLink="/detail/{{hero.id}}">
    });

    fixture = TestBed.createComponent(HeroesComponent); // creates all the children components but are not initalized yet because we didn't call detectChanges() yet.
  });

  it("should render each hero as a HeroComponent", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // Act
    fixture.detectChanges(); // runs ngOnInit()

    // Components are subset of directives. @Component directive
    let heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    // Assert
    expect(heroComponentDEs.length).toEqual(3);
    expect(heroComponentDEs[0].componentInstance.hero.name).toEqual(
      "SpiderDude"
    );
    // Every Hero property on every Hero Component matches with the sample data received from Parent Component which was passed by Service.
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
});
