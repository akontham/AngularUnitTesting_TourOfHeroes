import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";

describe("Hero Component (shallow test)", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it("should have the correct hero", () => {});
});
