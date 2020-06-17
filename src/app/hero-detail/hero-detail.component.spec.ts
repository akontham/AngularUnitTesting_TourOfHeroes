/*
    Mocking & Testing Activated Route,
    Mocking & Testing Router Link - Hero's component deep spec
*/

import { FormsModule } from '@angular/forms';
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "./../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { of } from "rxjs";
fdescribe("HeroDetailComponent", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockActivatedRoute, mockLocation;

  mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => { 
            return '3'; 
        }
      }
    }
  };
  mockHeroService = jasmine.createSpyObj(["getHero", "updateHero"]);
  mockLocation = jasmine.createSpyObj(["back"]);

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [HeroDetailComponent],
        providers: [
          { provide: HeroService, useValue: mockHeroService },
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Location, useValue: mockLocation },
          
        ]
      });
      fixture = TestBed.createComponent(HeroDetailComponent);
  
      mockHeroService.getHero.and.returnValue(of({id:  3, name: 'SuperDude', strength: 100}));
  });

  it ('should render hero name in h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
});
    
});

