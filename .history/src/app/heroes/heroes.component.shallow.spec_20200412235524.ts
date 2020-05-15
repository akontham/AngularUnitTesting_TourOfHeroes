/* we arey trying to write a unit test for a more complicated component because,
this has a child component and also has a dependency on heror service */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("Heroes Componet (complex shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;

  /* We don't want to inject the actual Hero Service as a dependency
  because it makes http calls and we don't want to test two unit simultaneously.
  Create a mock hero service

  Errors:

  We get the below error because a child component is referenced in the parent component .
  You can resolve this unknown element by adding the schemas property to [NO_ERRORS_SCHEMA]
    Error: Template parse errors:
    Can't bind to 'hero' since it isn't a known property of 'app-hero'.

  */
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("", () => {});
});
