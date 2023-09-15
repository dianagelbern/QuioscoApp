import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";
import { useEffect, useState } from "react";

export default function ModalProducto() {
  const { producto, hanldeChangeModal, handleAgregarPedido, pedido } = useQuiosco();

  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find(
        (pedidoState) => pedidoState.id === producto.id
      );
      setEdicion(true);
      setCantidad(productoEdicion.cantidad);
    }
  }, [producto, pedido]);
  

  return (
    <>
      <div className="flex justify-end">
        <button onClick={hanldeChangeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="md:flex gap-10">
        <div className="md:w-1/3">
          <Image
            className="rounded-xl"
            width={300}
            height={400}
            alt={`Imagen Producto ${producto.nombre}`}
            src={`/assets/img/${producto.imagen}.jpg`}
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
          <p className="mt-5 font-black text-3xl text-amber-500">
            {formatearDinero(producto.precio)}
          </p>
          <div className="flex gap-4 mt-5">
            <button
              type="button"
              onClick={() => {
                if (cantidad <= 1) return;
                setCantidad(cantidad - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={cantidad<= 1 ? `text-gray-400 h-7 w-7` : `h-7 w-7`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <p className="text-2xl">{cantidad}</p>
            <button
              type="button"
              onClick={() => {
                if (cantidad >= 10) return;
                setCantidad(cantidad + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={cantidad>= 10 ? `text-gray-400 h-7 w-7` : `h-7 w-7`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button 
            onClick={() => handleAgregarPedido({...producto, cantidad})}
            type="button" 
            className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 text-white font-bold rounded">
              {edicion ? 'Guardar Cambios' : 'Añadir al pedido'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
