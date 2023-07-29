import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
  ) {
  }

  enviarAlerta(tipo: SweetAlertIcon, titulo: string, mensaje: string) {
    Swal.fire({
      icon: tipo,
      title: titulo,
      text: mensaje
    });
  }

  enviarNotificacion(tipo: string, titulo: string, mensaje: string) {
    switch (tipo) {
      case 'success':
        this.toastr.success(mensaje, titulo)
        break
      case 'error':
        this.toastr.error(mensaje, titulo)
        break
      case 'warning':
        this.toastr.warning(mensaje, titulo)
        break
      case 'info':
        this.toastr.info(mensaje, titulo)
        break
      default:
        this.toastr.show(mensaje, titulo)
        break
    }
  }

  enviarAlertaConfirmacion(title: string, mensaje: string) {
    Swal.fire({
      title: title,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return result
    })
  }
}
