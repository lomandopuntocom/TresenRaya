import { Casilla } from "../models/Casilla";

export class CasillaService {

    crear_tablero(): Casilla[][] {
        let tablero: Casilla[][] = [];
        for (let i = 0; i < 3; i++) {
            let fila: Casilla[] = [];
            for (let j = 0; j < 3; j++) {
                let columna: Casilla = { jugador: '', ocupado: false };
                fila.push(columna);
            }
            tablero.push(fila);
        }
        return tablero;
    }

    jugada(fila: number, columna: number, jugador: string, tablero: Casilla[][]){
        if(!tablero[fila][columna].ocupado){
            tablero[fila][columna].ocupado = true;
            if(jugador == 'X'){
                tablero[fila][columna].jugador = 'X'
                jugador = 'O'
            }
            else if(jugador == 'O'){
                tablero[fila][columna].jugador = 'O'
                jugador = 'X'
            }
          }
          return jugador
    }

    detectar_ganador(tablero: Casilla[][]): string | null{
        const jugadores: [string, string] = ['X', 'O'];
        let hayEspaciosVacios = false;
        for (const jugador of jugadores) {
            for (let i = 0; i < 3; i++) {
                if (tablero[i][0].jugador === jugador && tablero[i][1].jugador === jugador && tablero[i][2].jugador === jugador) {
                    return jugador;
                }
                if (tablero[0][i].jugador === jugador && tablero[1][i].jugador === jugador && tablero[2][i].jugador === jugador) {
                    return jugador;
                }
            }
            if (tablero[0][0].jugador === jugador && tablero[1][1].jugador === jugador && tablero[2][2].jugador === jugador) {
                return jugador;
            }
            if (tablero[0][2].jugador === jugador && tablero[1][1].jugador === jugador && tablero[2][0].jugador === jugador) {
                return jugador;
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (!tablero[i][j].jugador) {
                    hayEspaciosVacios = true;
                    break;
                }
            }
            if (hayEspaciosVacios) break;
        }
    
        if (!hayEspaciosVacios) {
            return 'Empate';
        }
    
        return null;
    }
}
