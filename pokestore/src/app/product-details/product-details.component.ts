import { PokeApiService } from './../service/poke-api.service';
import { Component, OnInit } from '@angular/core';
import { Product, products, PokemonProduct } from '../products';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  public pokemon: any;
  public pokemonSpecie: any;
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private pokeApiService: PokeApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.getPokemon;
    this.pokemon;
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.product = products.find(product => product.id === productIdFromRoute);

  }

  get getPokemon() {
    const takeId = this.route.snapshot.paramMap;
    const id =takeId.get('productId')
    console.log(id)
    const pokemon = this.pokeApiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res
        console.log("dados",this.pokemon);
        
      });
    return console.log( id)
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  addToCartP(product: PokemonProduct) {
    this.cartService.addToCartP(product);
    window.alert('Seu Pokemon foi adicionado ao Carrinho');
  }

}
