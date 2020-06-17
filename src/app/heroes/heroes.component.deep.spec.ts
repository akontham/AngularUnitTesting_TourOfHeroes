
/* Deep Integration Test with a Live component */

/*
  Create a stub directive for RouterLink  
*/

import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { NO_ERRORS_SCHEMA, Component, Input, Directive } from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
  
}

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
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA], // add this to resolve the ERROR: Template parse errors: Can't bind to 'routerLink' since it isn't a known property of 'a'. ("<a [ERROR ->]routerLink="/detail/{{hero.id}}">
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

  // Emitting events on elements
  it(`should call parent components delete method when child components delete event is triggered
        by clicking the button on the child component's template`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // Now we have 3 child components using ngFor, get the child component using debug element.
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    // Get the handle to delete element on one of the child components html template.
    const deleteButton = heroComponentDEs[0].query(By.css("button"));

    // trigger the (click) event tied to the element using triggerEventHander - which takes 2 arguments (eventName, eventObj)
    // click event is using stop propagation method - so lets create a dummy object which has stop propagation method which does nothing
    deleteButton.triggerEventHandler("click", { stopPropagation: () => {} });

    // so we expect delete event from child is raised, parent listens to it and calls its delete method.
    // in order to listen on delete method in the component, we need jasmin to spy on the method using the below line of code.
    // spyOn(fixture.componentInstance, "delete"); // this tells to watch and see if the delete method is invoked.

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  // Emitting events directly from children - rather than clicking the button directly.
  it(`should call parent components delete method when child components delete event is triggered
        the event directly using the child component`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    // Now we have 3 child components using ngFor, get the child component using debug element.
    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    // we know that @Output() delete = new EventEmitter(); delete is an eventemitter, so get the public isntance of the component and emit the event.
    // we are just using undefined and not send HERO object because in the delete event emit we are sending the HERO object (this.delete.next())
    // had next had HERO object, we would have done that.
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // so we expect delete event from child is raised, parent listens to it and calls its delete method.
    // in order to listen on delete method in the component, we need jasmin to spy on the method using the below line of code.
    // spyOn(fixture.componentInstance, "delete"); // this tells to watch and see if the delete method is invoked.

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  // Interacting with Input boxes
  it(`should add a new hero to the hero list when the add button is clicket`, () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const name = "Mr. Ice";
    const hero: Hero = { id: 4, name: name, strength: 11 };
    mockHeroService.addHero.and.returnValue(of(hero));

    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.query(By.css('button[data-test="addButton"]'));

    inputElement.vlaue = name; // this simulates typing Mr. Ice into the input element.
    addButton.triggerEventHandler('click', null); // pass null to the event object as no $event is being triggered on the button.

    // tick(1500);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;
    expect(mockHeroService.addHero).toHaveBeenCalled();
    expect(heroText).toContain(name);
  });

  it('should have correct route to the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    let routerLink = heroComponents[0]
                      .query(By.directive(RouterLinkDirectiveStub))
                      .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');

  })
});
