import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifdResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey = 'CAcK2dEV4iN4A5kCiS8iWmHqEHZ3zLgL';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    
    this._historial =JSON.parse( localStorage.getItem('historial')!)||[];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!)||[];
   };

  buscarGifs(query: string) {
    
    query = query.trim().toUpperCase();

    if (query.trim().length === 0) {
      return;
    }

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    
    const params = new HttpParams()
    .set('api_key',this.apikey)
    .set('limit','10')
    .set('q',query);
    
    this.http.get<SearchGifdResponse>(`${this.servicioUrl}/search`,{ params })
      .subscribe((response) => {
        this.resultados = response.data;
        console.log(response.data)
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      })
  }

}
