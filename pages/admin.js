import useSWR from "swr";
import AdminLayout from "../layout/AdminLayout";
import axios from "axios";
import Orden from "../components/Orden";

export default function Admin() {
  //fetcher es una función que permite la conexión al api
  const fetcher = () => axios("/api/ordenes").then((datos) => datos.data);

  //data: Son los datos resultantes de la consulta a la db
  //error: Para identificar de dónde viene el error
  //isLoading: Está como true por default hasta realizar la consulta,
  //al hacerlo se convierte en false (cosa que nos permite implementar un spinner)
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, {refreshInterval: 100});

  return (
    <AdminLayout pagina={"Admin"}>
      <h1 className="text-4xl font-black">Panel de Administración</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>
      {data && data.length ? (
        data.map((orden) => 
          <Orden 
            key={orden.id} 
            orden={orden} 
            />)
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </AdminLayout>
  );
}
