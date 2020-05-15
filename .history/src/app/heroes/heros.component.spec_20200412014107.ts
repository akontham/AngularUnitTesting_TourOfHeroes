// Example of isolated unit testing a component

import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

describe("HerosComponent", () => {
  let componet: HeroesComponent;
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
      HeroService - so provide these method names to the array
    */
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero",
    ]);
    componet = new HeroesComponent(mockHeroService);
  });
});
