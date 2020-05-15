/* we arey trying to write a unit test for a more complicated component because,
this has a child component and also has a dependency on heror service */

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";

describe("Heroes Componet (complex shallow test)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("", () => {});
});
