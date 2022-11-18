import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarritoCard from "../CarritoCard/CarritoCard.jsx";



export default function Carrito() {
  const [update, setUpdate] = useState(false)
  const navigate = useNavigate();


  function handelClear() {
    let boolean = window.confirm("Desea vaciar todo el carrito?")
    if (boolean) {
      localStorage.setItem("products", JSON.stringify([]))
      setUpdate(!update)
    }
  }

  function handelBuy() {
    let productsStorage = JSON.parse(localStorage.getItem("products"))
    if (productsStorage.length) {
      setUpdate(!update)
      navigate("/detailCart")
    } else {
      alert("Para continuar con la compra, primero debes agregar productos a tu carrito.")
    }
  }
  const elementsCart = JSON.parse(localStorage.getItem("products"))

  let total = elementsCart?.map(e => e.price.replace("$", "") * 1)

  total = total.length > 1 ? total.reduce((a, b) => a + b, 0) : total

  return (
    <>
      <div className={elementsCart.length > 3 ? "h-full flex pb-5" : "flex pb-5 h-screen"}>
        <div className="flex h-full bg-stone-300 mx-5 w-1/3 justify-center rounded-3xl px-5 border border-blue-500">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Carrito de compras
            </h1>
            <div className="flex flex-col h-full w-full">
              {

                elementsCart?.map((e, index) => {
                  return (
                    <div key={index}>
                      <div className="flex justify-between my-1 w-full py-1" >
                        <div>
                          <h1>{e.name}</h1>
                        </div>
                        <div>{e.cant > 1 ? `${e.cant} x ${e.price.replace("$", "")}: ${JSON.parse(e.price?.replace("$", "")) * e.cant}` : e.price.replace("$", "")}</div>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <div className="flex justify-between my-1 w-full py-1">
              <h1>Total: </h1>{`${total} $`}
            </div>
            <div className="flex justify-between py-5 w-full">
              <button onClick={() => handelClear()} className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                Vaciar carrito
              </button>
              <button onClick={() => handelBuy()} className="bg-transparent hover:bg-green-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded">
                Comprar carrito
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full mr-5 justify-center rounded-3xl items-start border border-blue-500 bg-stone-300">
          <div className="flex justify-center flex-wrap gap-10 p-4">
            {elementsCart?.map(e => <CarritoCard update={update} setUpdate={setUpdate} image={e.image} rom={e.rom} price={e.price} id={e.id} name={e.name} key={e.id} stock={e.stock} />)}
          </div>
        </div>
      </div>

    </>
  )
}