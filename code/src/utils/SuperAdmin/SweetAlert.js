import Swal from "sweetalert2";

export const fireAlert = (
    row,
    message,
    onConfirm // function to run on confirm
) => {
  Swal.fire({
    title: message,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    icon: "warning",
    allowOutsideClick: false,
    customClass: {
      confirmButton: "tusk-swal2-confirm",
      icon: "tusk_swal2-icon"
    }
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        customClass: {
          icon: "tusk_swal2-icon"
        },
        timer: 1500
      });
      onConfirm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Cancelled",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};
