import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  // Variables
  private myAppUrl = 'http://localhost:5231/';
  private myApiUrl = 'api/tarjeta/';

  constructor(private http: HttpClient) {}

  // Metodos
  // Obtener todas las tarjetas
  getListTarjetas(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  // Eliminar una tarjeta
  deleteTarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  // Agregar una tarjeta
  saveTarjeta(tarjeta: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  // Editar una tarjeta
  updateTarjeta(id: number, tarjeta: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
