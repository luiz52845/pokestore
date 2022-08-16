import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeApiService } from '../service/poke-api.service';
import { products } from '../products';

interface Result {
  name: string;
  url: string;
}

interface PokeList {
  count: number;
  next?: any;
  previous?: any;
  results: Result[];
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  private setAllPokemons: any;
  public getAllPokemons: any;


  products = products;

  constructor(
    private pokeApiService: PokeApiService
  ) { }

  ngOnInit(): void {
    this.pokeApiService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
        console.log(this.getAllPokemons)
      }
    );
  }

  public getSearch(value: string) {
    console.log(value)
    const filter = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    })
    this.getAllPokemons = filter;
  }

}
