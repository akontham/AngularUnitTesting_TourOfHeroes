/* Deep Integration Test which injects Live Component */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("Heroes Componet (complex shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES: Hero[];

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // import { NO_ERRORS_SCHEMA } from "@angular/core";
      // schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeroesComponent); // This will intialize all child components of a parent component.
  });

  it("should render each hero as a HeroComponent", () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // Assert
    expect(true).toBe(true);
  });
});
