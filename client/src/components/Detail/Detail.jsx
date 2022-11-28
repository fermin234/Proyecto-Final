import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail } from '../../redux/actions/index'
import { useEffect } from "react";
import { getProductById } from "../../redux/actions/index";
import { useParams } from "react-router-dom";


export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const phones = useSelector(state => state.detail)
  console.log(phones, "celulares")
  useEffect(() => {
    dispatch(getProductById(id))
  }, [dispatch])

  useEffect(() => {
    return function () {
      dispatch(cleanDetail())
    }
  }, [dispatch])



  return (
<div class="bg-white">
  {
    phones.length ? 
    <div class="pt-6">
    <nav aria-label="Breadcrumb">
      <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div class="flex items-center">
            <a href="#" class="mr-2 text-sm font-medium text-gray-900"></a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li>
          <div class="flex items-center">
            <a href="#" class="mr-2 text-sm font-medium text-gray-900"></a>
            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li class="text-sm">
          <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600"></a>
        </li>
      </ol>
    </nav>

   
    <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div class="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
        <img src={phones.map(e=> e.image)} alt="Two each of gray, white, and black shirts laying flat." class="h-full w-full object-cover object-center"/>
      </div>
      <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
          <img src={phones.map(e=> e.image)} alt="Model wearing plain black basic tee." class="h-full w-full object-cover object-center"/>
        </div>
        <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
          <img src={phones.map(e=> e.image)} alt="Model wearing plain gray basic tee." class="h-full w-full object-cover object-center"/>
        </div>
      </div>
      <div class="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
        <img src={phones.map(e=> e.image)} alt="Model wearing plain white basic tee." class="h-full w-full object-cover object-center"/>
      </div>
    </div>


    <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{phones.map(e=> e.name)}</h1>
      </div>


      <div class="mt-4 lg:row-span-3 lg:mt-0">
        <h2 class="sr-only">Product information</h2>
        <p class="text-3xl tracking-tight text-gray-900">${phones.map(e=>e.price)}</p>

        <div class="mt-6">
          <h3 class="sr-only">Reviews</h3>
          <div class="flex items-center">
            <div class="flex items-center">
        
              <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

              
              <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

            
              <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

         
              <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>

  
              <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
              </svg>
            </div>
    

          </div>
        </div>

          <div>
            <h3 class="text-sm font-medium text-gray-900">Color</h3>

            <fieldset class="mt-4">
              <legend class="sr-only">Choose a color</legend>
              <div class="flex items-center space-x-3">
              
                <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400">
                  <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label"/>
                  <span id="color-choice-0-label" class="sr-only"> White </span>
                  <span aria-hidden="true" class="h-8 w-8 bg-white border border-black border-opacity-10 rounded-full"></span>
                </label>

         
                <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-blue-400">
                  <input type="radio" name="color-choice" value="Blue" class="sr-only" aria-labelledby="color-choice-1-label"/>
                  <span id="color-choice-1-label" class="sr-only"> Blue </span>
                  <span aria-hidden="true" class="h-8 w-8 bg-blue-200 border border-black border-opacity-10 rounded-full"></span>
                </label>

              
                <label class="-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-black-900">
                  <input type="radio" name="color-choice" value="Black" class="sr-only" aria-labelledby="color-choice-2-label"/>
                  <span id="color-choice-2-label" class="sr-only"> Black </span>
                  <span aria-hidden="true" class="h-8 w-8 bg-gray-900 border border-black border-opacity-10 rounded-full"></span>
                </label>
              </div>
            </fieldset>
          </div>

     

          <button type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Comprar</button>
    

      <div class="py-10 lg:col-span-2 lg:col-start-10 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">

        <div>
          <h3 class="sr-only">Description</h3>

          <div class="space-y-6">
            <p class="text-base text-gray-900">En CellWolrd ofrecemos los mejores celulares al mejor precio del mercado ,equipos nuevos de fabrica con garantia</p>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-sm font-medium text-gray-900">Ficha Tecnica</h3>

          <div class="mt-4">
            <ul role="list" class="list-disc spacey -4 pl-4 text-sm">
              <li class="text-gray-400"><span class="text-gray-600">Marca: {phones.map(e => e.brand.name)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">RAM: {phones.map(e => e.ram)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Camara Trasera: {phones.map(e => e.rear_camera)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Camara Frontal: {phones.map(e => e.front_camera)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Memoria interna: {phones.map(e => e.internal_storage)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Bateria: {phones.map(e => e.battery)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Sistema Opertivo: {phones.map(e => e.o.name)}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">Pantalla: {phones.map(e => e.screen)}</span></li>
             
            </ul>
          </div>
        </div>




        <div class="mt-10">
          

          <div class="mt-4 space-y-6">
          
          </div>
        </div>
      </div>
    </div>
     </div>

                   
  </div> 
    : (
  <div >
  <img src='https://tenor.com/es/ver/loading-thinking-shiba-inu-gif-25291442' alt="logoload" />
  </div>)
  }
</div>
 

 


)
}



// :
// } 