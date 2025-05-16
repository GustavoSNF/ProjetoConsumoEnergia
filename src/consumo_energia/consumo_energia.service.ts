import { Injectable } from '@nestjs/common';
import { ConsumoEnergia } from './consumo_energia.model';

@Injectable()
export class ConsumoEnergiaService {
  private registros: ConsumoEnergia[] = [];

registrarConsumo(dado: ConsumoEnergia): ConsumoEnergia {
  dado.dataLeitura = new Date(dado.dataLeitura); // força tipo Date
  this.registros.push(dado);
  return dado;
}


  consultarHistorico(idUsuario: string, inicio: Date, fim: Date): ConsumoEnergia[] {
    return this.registros.filter((registro) =>
      registro.idUsuario === idUsuario &&
      registro.dataLeitura >= inicio &&
      registro.dataLeitura <= fim
    );
  }

  verificarAlerta(idUsuario: string): string | null {
    const historico = this.registros
      .filter((r) => r.idUsuario === idUsuario)
      .sort((a, b) => a.dataLeitura.getTime() - b.dataLeitura.getTime());

    if (historico.length < 2) return null;

    const penultimo = historico[historico.length - 2];
    const ultimo = historico[historico.length - 1];

    if (ultimo.consumoKwh > penultimo.consumoKwh) {
      return '⚠️ Alerta: Consumo de energia maior do que o mês anterior!';
    }

    return null;
  }
}
