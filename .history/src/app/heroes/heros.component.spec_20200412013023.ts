// Example of isolated unit testing a component

import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";

describe("HerosComponent", () => {
  let componet: HeroesComponent;
  let HEROES: Hero[];

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpideMan", strength: 8 },
      { id: 2, name: "Wonder Woman", strength: 10 },
      { id: 3, name: "He Man", strength: 20 },
    ];
  });
});
