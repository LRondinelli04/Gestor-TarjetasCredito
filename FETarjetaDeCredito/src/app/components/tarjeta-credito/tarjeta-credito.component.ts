import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MaxValidator,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [];
  form: FormGroup;
  accion = 'Agregar';
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private _tarjetaService: TarjetaService,
    readonly _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ],
      ],
      fechaExpiracion: [
        '',
        [Validators.required, Validators.maxLength(5), Validators.minLength(5)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)],
      ],
    });
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(
      (data) => {
        console.log(data);
        this.listTarjetas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    };

    if (this.id == undefined) {
      //agregamos tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(
        (data) => {
          this.alertMessage('Tarjeta Registrada');
          this.obtenerTarjetas();
          this.form.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      tarjeta.id = this.id;
      //editamos tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe((data) => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.alertMessage('Tarjeta Actualizada');
        this.obtenerTarjetas();
      });
    }
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(
      (data) => {
        this.alertMessage('Tarjeta Eliminada');
        this.obtenerTarjetas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }

  alertMessage(text: string) {
    this._snackBar.open(`${text}`, '', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}
