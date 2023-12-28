import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Region } from '../interfaces/region.type';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // constructor() {}

  private http = inject(HttpClient)

  private apiUrl : string = 'https://restcountries.com/v3.1';
  private _countryList = signal<Country[]>([]);
  private _capitalList = signal<Country[]>([]);
  private _regionList = signal<Country[]>([]);

  public countryList = computed( () => this._countryList() );
  public capitalList = computed( () => this._capitalList() );
  public regionList = computed( () => this._regionList() );

  public cacheStore = signal<CacheStore>({
      termCountry:   { term: '', country: []},
      termCapital:   { term: '', country: []},
      regionCountry: { region:'', countries: []}
    })

    constructor(){
      this.loadCacheStore();
    }



  searchTagByCountry( tag : string ) : Observable<Country[]> {
    console.log(tag);
    return this.http.get<Country[]>(`${ this.apiUrl }/name/${tag}`)
              .pipe(
                tap( resp => this.cacheStore.update( (data)=> { 
                  return { ...data,
                    termCountry: {
                      term: tag,
                      country: resp
                    }
                  }
                  
                })),
                tap( () => this.saveCacheStore() ),
                catchError( () => {
                  this.cacheStore.update( (data)=> { 
                    return { ...data,
                      termCountry: {
                        term: '',
                        country: []
                      }
                    }
                    
                  })
                  return of([])
                })
                )

  }

  searchTagCapital( tag : string ) : Observable<Country[]|null> {
    console.log(tag);
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${tag}`)
              .pipe(
                tap( resp => this.cacheStore.update( (data) => {
                  return { ...data,
                  termCapital: {
                    term: tag,
                    country: resp
                  }}
                } ) ),
                tap( () => this.saveCacheStore() ),
                catchError( () => {
                  this.cacheStore.update( (data) => {
                    return { ...data,
                    termCapital: {
                      term: '',
                      country: []
                    }}
                  } ) 
                  return of([])
                })
                )
  }

  searchByRegion( region : Region ) {
    return this.http.get<Country[]>(`${ this.apiUrl }/region/${region}`)

              .pipe(
                tap( resp => this.cacheStore.update( (data) =>{
                  return {
                    ...data,
                    regionCountry:{
                      region: region,
                      countries: resp
                    }
                  }
                } ) ),
                tap( () => this.saveCacheStore()),
                catchError( () => {
                  this.cacheStore.update( (data) =>{
                    return {
                      ...data,
                      regionCountry:{
                        region: '',
                        countries: []
                      }
                    }
                  } )
                  return of([])
                })
                )
  }

  searchByAlphaCode( cca : string ){
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${cca}`)
                .pipe(
                  map( country => country.length > 0 ? country[0] : null ),
                  catchError( err => of(null))
                )

  }

  saveCacheStore() {
   if(!this.cacheStore()) return;
   localStorage.setItem('token', JSON.stringify(this.cacheStore()));
  }

  loadCacheStore(){
    if( !localStorage.getItem('token') ) return;
    this.cacheStore.set( JSON.parse( localStorage.getItem('token')! ) )
    
  }
}
