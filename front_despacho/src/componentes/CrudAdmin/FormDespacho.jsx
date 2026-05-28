import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

export const FormDespacho = ({ venta, onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log("onSubmit ejecutado");

    // Datos para el microservicio de Despachos (MATCH EXACTO con Despacho.java)
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      despachado: false,
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra
    };

    // Datos para actualizar la Venta (enviamos el objeto completo para evitar errores de validación)
    const jsonDataSales = {
      ...venta,
      despachoGenerado: true
    };

    console.log("Enviando despacho:", jsonData);
    console.log("Actualizando venta:", jsonDataSales);

    try {
      // 1. POST a Despachos
      await axios.post("/api/v1/despachos", jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // 2. PUT a Ventas para marcar como generado
      await axios.put(`/api/v1/ventas/${venta.idVenta}`, jsonDataSales, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // 3. Éxito
      Swal.fire({
        title: "Despacho registrado 🛻!",
        text: "La orden ha sido actualizada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      onClose();

    } catch (error) {
      console.error("Error en la solicitud:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center text-center px-24 text-xl"
      >
        <div className="mx-auto text-3xl font-bold mb-10 text-teal-600">
          Ingreso de orden de despacho
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Fecha de despacho</label>
          <input
            type="date"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("fechaDespacho", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Patente de camión</label>
          <input
            type="text"
            placeholder="Ej: AB-CD-12"
            className="border border-gray-300 rounded-lg block w-full p-1"
            {...register("patenteCamion", { required: true })}
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Orden de compra asociada</label>
          <input
            type="number"
            disabled
            value={venta.idVenta}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Dirección de entrega</label>
          <input
            type="text"
            disabled
            value={venta.direccionCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-2">Valor de compra</label>
          <input
            type="number"
            disabled
            value={venta.valorCompra}
            className="border border-gray-300 rounded-lg block w-full text-slate-400 p-1"
          />
        </div>

        <button
          className="py-6 px-14 rounded-lg bg-teal-600 text-white font-bold mb-14 hover:bg-teal-700 transition-colors"
          type="submit"
        >
          Asignar despacho
        </button>
      </form>
    </>
  );
};