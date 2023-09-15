import Image from "next/image";
import {formatearDinero} from "../helpers"
import useQuiosco from "../hooks/useQuiosco";

export default function Producto({ producto }) {
  const { hanldeSetProducto, hanldeChangeModal} = useQuiosco()
  const { nombre, imagen, precio } = producto;
  return (
    <div className="border p-3">
      <Image
      className="rounded-xl"
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={250}
        height={300}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-3xl text-amber-500">{formatearDinero(precio)}</p>
        <button 
        onClick={() =>{
          hanldeSetProducto(producto),
          hanldeChangeModal()
        }}
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded-lg"
        type="button"
        >Agregar</button>
      </div>
    </div>
  );
}
