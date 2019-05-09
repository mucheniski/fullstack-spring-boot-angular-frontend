
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';


import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe
    ) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
          .then(lancamentos => {
            this.pieChartData = {
              labels: lancamentos.map(lancamentoEstatisticaCategoria => lancamentoEstatisticaCategoria.categoria.nome),
              datasets: [
                {
                  data: lancamentos.map(lancamentoEstatisticaCategoria => lancamentoEstatisticaCategoria.total),
                  backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
                }
              ]
            };
          });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(lancamentos => {
        const diasDoMes = this.configurarDiasMes();
        const totaisReceitas = this.totaisPorCadaDiaMes(lancamentos.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
        const totaisDespesas = this.totaisPorCadaDiaMes(lancamentos.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);
        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            { label: 'Receitas', data: totaisReceitas, borderColor: '#3366CC' },
            { label: 'Despesas', data: totaisDespesas, borderColor: '#D62B00' }
          ]
        }
      });
  }

  private totaisPorCadaDiaMes(lancamentos, diasDoMes) {
    const totais: number[] = [];
    for (const dia of diasDoMes) {
      let total = 0;
      for (const lancamento of lancamentos) {
        if (lancamento.dia.getDate() === dia) {
          total = lancamento.total;
          break;
        }
      }
      totais.push(total);
    }
    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);
    const quantidade = mesReferencia.getDate();
    const dias: number[] = [];
    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }
    return dias;
  }

}
