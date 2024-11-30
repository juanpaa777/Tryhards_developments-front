import { AppModule } from './../../../../app.module';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-lector',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.componen.css']
})
export class RegistroLectorComponent {
  lector = {
    NumeroControl: '',
    NombreCompleto:'',
    Correo:'',

  };
  showConfirmationModal = true;
  confirmationCode = '';
  errorMessage = '';
  NombreCompleto = '' ;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onSubmit() {
    if (this.lector.NombreCompleto && this.lector.NumeroControl && this.lector.Correo) {
      this.http.post('https://biblioteca-aobw.onrender.com/lector', this.lector).subscribe(
        (response: any) => {
          this.snackBar.open('Lector registrado exitosamente', 'Cerrar', {});
        },
        (error) => {
          console.error('Error al registrar el lector:', error);
          this.snackBar.open('Error al registrar el lector: ' + error.message, 'Cerrar', {});
        }
      );
    } else {
      this.errorMessage = 'Todos los campos son obligatorios';
    }
  }

  

  openConfirmationModal() {
    this.showConfirmationModal = true;
  }

  closeModal(event: MouseEvent) {
    this.showConfirmationModal = false;
  }

  onSubmitCode() {
    if (this.confirmationCode === '123456') { // Aquí deberías validar el código real
      console.log('Código confirmado');
      this.closeModal(new MouseEvent('click'));
    } else {
      this.errorMessage = 'Código incorrecto';
    }
  }

  resendCode() {
    console.log('Código reenviado');
  }
  
}