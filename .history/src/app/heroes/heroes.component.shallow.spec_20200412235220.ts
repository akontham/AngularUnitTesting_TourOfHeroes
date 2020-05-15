/* we arey trying to write a unit test for a more complicated component because,
this has a child component and also has a dependency on heror service */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Componet (complex shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;

  /* We don't want to inject the actual Hero Service as a dependency
  because it makes http calls and we don't want to test two unit simultaneously. */
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("", () => {});
});
