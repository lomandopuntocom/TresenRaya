import { Component } from '@angular/core';
import { Casilla } from '../appservice/models/Casilla';
import { CasillaService } from '../appservice/services/Casilla.Service';
import { Estado_Juego } from '../appservice/models/EstadoJuego';


@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  providers: [CasillaService]
})
export class TableroComponent {

  tablero: Casilla[][];
  jugadorActual: string;
  ganador: string | null;
  estado_juego: Estado_Juego;
  estado_casilla: boolean;
  tablero2: Casilla[][];

  constructor(private casillaService: CasillaService) {
    this.tablero2 = [];
    this.tablero = [];
    this.jugadorActual = 'X';
    this.ganador = null;
    this.iniciar_juego();
    this.estado_juego = Estado_Juego.jugando
    this.estado_casilla = false;
  }

  iniciar_juego() {
    this.tablero = this.casillaService.crear_tablero();
    this.jugadorActual = 'X';
    this.ganador = null;
  }

  hacer_jugada(fila: number, columna: number) {
    console.log(fila, columna);
    console.log(this.estado_juego)
    if (this.ganador == null && !this.tablero[fila][columna].ocupado) {
      let turno: string = this.casillaService.jugada(
        fila,
        columna,
        this.jugadorActual,
        this.tablero
      );
      if (turno !== null) {
        this.ganador = this.casillaService.detectar_ganador(
          this.tablero
        );
        if(this.ganador != null){
          this.estado_juego = Estado_Juego.juego_terminado
        }
      }
      this.jugadorActual = this.jugadorActual === 'X' ? 'O' : 'X';
    }
    this.estado_casilla = true;
  }

  reiniciar_juego() {
    this.iniciar_juego();
    this.estado_casilla = false;
    this.estado_juego = Estado_Juego.jugando
  }
}
