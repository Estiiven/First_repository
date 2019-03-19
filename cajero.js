// declaracion del arreglo y variables añadidas
var imagenes = [];
imagenes["50"] = "cincuenta.png";
imagenes["20"] = "veinte.png";
imagenes["10"] = "diez.png";
//constructor donde se inicializan las variables de la clase billete
class Billete
{
	constructor(v, c)
	{
		this.valor = v;
		this.cantidad = c;
		this.imagen = new Image();
		this.imagen.src = imagenes[this.valor];
	}
}
//arreglo que contiene los objeto billete que se añaden
var caja = [];
caja.push( new Billete(50, 4) );
caja.push( new Billete(20, 5) );
caja.push( new Billete(10, 5) );

contar();

var div = 0;
var papeles = 0;
//en resultado se almacena parrafo para mostrar el resultado
var resultado = document.getElementById("resultado");
//variable que almacena el input(boton) del usuario
var b = document.getElementById("retirar");
//se agrega el evento click al boton que ejecuta la funcion entregarDinero
b.addEventListener("click", entregarDinero);

function entregarDinero()
{
	//en dibujando se añaden los billetes que seran mostrados en el retiro
	var dibujado = [];
	//text contiene el input number
	var text = document.getElementById("dinero");
	//con parseInt se convierte la variable a entero
	dinero = parseInt(text.value); //dinero guarda el total de dinero pedido
	//el total de dinero en la caja es suficiente para el dinero que se está pidiendo?
	if (total >= dinero)
	{	//ciclo que recorre los billetes de la caja
		for(bi of caja)
		{	//si hay algun valor en el dinero solicitado
			if (dinero > 0)
			{	//divide: dinero pedido entre el valor del primer billet de la caja
				div = Math.floor(dinero/bi.valor);//floor para redondear la division
				//division es mayor a la cantidad de billetes que hay?
				if (div > bi.cantidad)
				{ //papales es igual a la cantidad de billetes del indice 20
					papeles = bi.cantidad;
				}
				else
				{	//papales es igual al resultado de la division
					papeles = div;
				}
				//resta : cantidad inicial de billetes con cantidad de billetes necesarios
				bi.cantidad = bi.cantidad - papeles;
				//ciclo que va agregando a dibujando la cantidad de objt billetes guardada en papeles
				for (var i = 0; i < papeles; i++)
				{
					dibujado.push ( new Billete ( bi.valor ) );
				}//resta: dinero solicitado - valor del billete por la cantidad disponibles en caja
				dinero = dinero - (bi.valor * papeles);
			}
		}//cuando el dinero solicitado sea satisfecho
		if (dinero == 0)
		{	//se escribe dentro del elemento html resultado, sin dejar de mostrar el anterior
			resultado.innerHTML = resultado.innerHTML + "Se ha retirado: <br />";
			//ciclo que recorre el arreglo los billetes agregados al arreglo dibujado
			for(var e of dibujado)
			{	//se muestran las imagenes de los billetes agregados al arreglo dibujado
				resultado.innerHTML = resultado.innerHTML + "<img src=" + e.imagen.src + " />";
			}
		//para separar los parrafos con una linea horizontal
		resultado.innerHTML += "<hr />";
		//contar();
		}
		else //si despues de hacer el recorrido en caja no se ha gestionado el dinero
		{
			resultado.innerHTML += "No tengo los billetes para esa suma, intenta otro valor <hr />";
		}

	}
	else //Si el total de dinero en caja es menor al dinero solicitado
	{
		resultado.innerHTML = resultado.innerHTML + "Saldo insuficiente para la suma <hr />";
	}
}
//funcion que cuenta la cantidad total de dinero que contiene la caja
function contar()
{
	total = 0;
	//ciclo que recorre la caja y retorna en total la cantidad de dinero en caja
	for (var tot of caja)
	{
		total = total + tot.valor * tot.cantidad;
	}
	console.log(total);
}
