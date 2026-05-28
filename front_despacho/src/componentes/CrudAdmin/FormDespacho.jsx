const onSubmit = async (data) => {
    console.log("onSubmit ejecutado");
    
    // Datos para el microservicio de Despachos (Haciendo MATCH EXACTO con Despacho.java)
    const jsonData = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion,
      intento: 0,
      despachado: false,             // Cambiado de 'entregado' a 'despachado' (como en Java)
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra
    };

    // Datos para actualizar la Venta
    const jsonDataSales = {
      ...venta,
      despachoGenerado: true,
    };

    console.log("Datos del formulario para despachos:", jsonData);
    console.log("Datos para actualizar venta:", jsonDataSales);

    try {
      // 1. POST a Despachos (Ahora con las variables correctas)
      await axios.post("/api/v1/despachos", jsonData, {
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      // 2. Si el POST fue exitoso, actualizamos la venta en la tabla principal
      await axios.put(
        `/api/v1/ventas/${venta.idVenta}`,
        jsonDataSales,
        {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // 3. Mostramos la alerta de éxito
      Swal.fire({
        title: "Despacho registrado 🛻!",
        text: "La orden ha sido actualizada con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // 4. Cerramos el modal
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

