import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
  const { categoriaActual, handleClickCategoria } = useQuiosco();

  const { nombre, icono, id } = categoria;
  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
    >
      <Image
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
        width={50}
        height={50}
      />
      <button 
      onClick={() => handleClickCategoria(id)}
      type="button" 
      className="text-2xl font-bold hover:cursor-pointer">
        {nombre}
      </button>
    </div>
  );
}
