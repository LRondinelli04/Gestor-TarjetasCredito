import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css'],
})
export class TarjetaCreditoComponent {
  // Variables
  listTarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _tarjetaService: TarjetaService
  ) {
    // Validaciones del formulario
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
    // Guardo los valores ingresados en el formulario en la constante tarjeta
    const tarjeta: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
    };

    // Si la accion es agregar
    if (this.id == undefined) {
      // Agrego una nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(
        (data) => {
          this.toastr.success(
            'Se registro correctamente la tarjeta',
            'Tarjeta Registrada'
          );
          this.obtenerTarjetas();
          this.form.reset();
        },
        (error) => {
          this.toastr.error('Error al registrar la tarjeta', 'Error');
          console.log(error);
        }
      );

      // Reseteo el formulario
      this.form.reset();
    } else {
      tarjeta.id = this.id;
      // Edito la tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(
        (data) => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.toastr.info('Se actualizo correctamente la tarjeta', 'Tarjeta Actualizada');
          // Cargo nuevamente las tartejas
          this.obtenerTarjetas();
        },
        (error) => {
          this.toastr.error('Error al actualizar la tarjeta', 'Error');
          console.log(error);
        }
      );
    }
  }

  eliminarTarjeta(index: number) {
    this._tarjetaService.deleteTarjeta(index).subscribe(
      (data) => {
        this.toastr.error(
          'Se elimino correctamente la tarjeta',
          'Tarjeta Eliminada'
        );
        this.obtenerTarjetas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    // Seteo el id con el id de la tarjeta seleccionada
    this.id = tarjeta.id;

    // Seteo los valores de la tarjeta seleccionada en el formulario para luego poder editarlo
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    });
  }
}
