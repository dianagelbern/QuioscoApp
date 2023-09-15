import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
    //Para almacenar info en la db se necesita importar PrismaClient
    const prisma = new PrismaClient()

    //Obtener Ordenes
    const ordenes = await prisma.orden.findMany({
        where: {
            estado: false
        }
    })
    res.status(200).json(ordenes);

    //Crear Ordenes
    if(req.method === "POST"){
        //Para crear un registro se usa el "create"
        //Debemos usar el modelo en el que almacenaremos la información (en este caso "orden")
        const orden = await prisma.orden.create({
            //Se debe especificar como "data" para ingresar los datos
            data: {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha
            }
        })
        //Ahora imprimimos la instancia de la orden creada anteriormente
        res.status(200).json(orden)
    }
 
}
