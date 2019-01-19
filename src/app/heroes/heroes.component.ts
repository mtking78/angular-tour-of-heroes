import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  // selectedHero: Hero;
  heroes: Hero[];

  // Add a private heroService parameter of type HeroService to the constructor.
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  // Assign the clicked hero from the template to the component's slectedHero.
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

  // Waits for the Observable to emit the array of heroes— which could happen now or several minutes from now. Then subscribe passes the emitted array to the callback, which sets the component's heroes property.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // In response to a click event, call the component's click handler and then clear the input field so that it's ready for another name.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero)
      .subscribe();
  }
}
