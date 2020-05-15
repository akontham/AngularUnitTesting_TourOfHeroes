// Example of isolated unit testing of a component

import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";
import { of } from "rxjs";

describe("HerosComponent", () => {
  let component: HeroesComponent;
  let HEROES: Hero[];
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpideMan", strength: 8 },
      { id: 2, name: "Wonder Woman", strength: 10 },
      { id: 3, name: "He Man", strength: 20 },
    ];

    /* since we are trying to test only component unit,
    we don't want to test two units at a time by injecting
    HeroService, so we try to acheive that by mocking the Service -
    So pass an object that looks like Hero Service by using Jasmine*/

    /*
      spy object takes array of method names, in this case inside
      compoent we are using getHeroes, addHero, deleteHero methods from
      HeroService - so provide these method names to the array. And now
      you can pass the mocked object to the component, so it wont complain.
    */
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should remove the indicated hero from the heroe list", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      /*
        TypeError: Cannot read property 'subscribe' of undefined. We might run into this
        issue if not handled properly becuase if you look the delete method in the component,
        the Hero Service deleteHero method is returning an observable which we subscribe to,
        so we need our mock object to return an observable when delete hero was called.

        thats handled on line 40 using jasmine and rxJS of observable which returns true.
        and the return of observable doesn't matter as of now.
      */
      expect(component.heroes.length).toEqual(2);

      /*
      The above method just tests the filter line this.heroes = this.heroes.filter(h => h !== hero);
      and not the actual deleteHero method of the service is not tested and we are not sure
      it its correct. That can be verified only if we test whether the passed hero parameter to the service
      was deleted. This is called interaction test. and is acheived in the below test.
      */
    });

    it("should call deleteHero", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalled();
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
      mockHeroService.deleteHero(HEROES[1]).subscribe((data) => {
        expect(data).toBe(true);
      });
    });
  });
});
