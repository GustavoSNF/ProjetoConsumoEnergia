import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoEnergia } from './consumo_energia.model';
import { ConsumoEnergiaService } from './consumo_energia.service';

@Controller('consumo')
export class ConsumoEnergiaController {
  constructor(private readonly consumoService: ConsumoEnergiaService) {}

  @Post()
  registrarConsumo(@Body() dado: ConsumoEnergia) {
    const registro = this.consumoService.registrarConsumo(dado);
    const alerta = this.consumoService.verificarAlerta(dado.idUsuario);
    return { registro, alerta };
  }

  @Get()
  consultarHistorico(
    @Query('idUsuario') idUsuario: string,
    @Query('inicio') inicio: string,
    @Query('fim') fim: string
  ) {
    const registros = this.consumoService.consultarHistorico(
      idUsuario,
      new Date(inicio),
      new Date(fim)
    );
    return registros;
  }
}
