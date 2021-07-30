const cargarMedidas = async()=>{
    let medidas = await getMedidas();
    let medidaSelect = document.querySelector("#medida-select");
    medidas.forEach(m=>{
        let option = document.createElement("option");
        option.innerText=m;
        medidaSelect.appendChild(option);
    });
};

document.addEventListener("DOMContentLoaded",()=>{
    cargarMedidas();
});

document.querySelector("#registrar-btn").addEventListener("click", async()=>{
    let fecha=document.querySelector("#fecha-txt").value;
    let hora=document.querySelector("#hora-txt").value.trim();
    let medidor=document.querySelector("#medidor-select").value;
    let direccion=document.querySelector("#direccion-txt").value.trim();
    let valor=document.querySelector("#valor-txt").value;
    let tipoMedida=document.querySelector("#medida-select").value.trim();

    let errores = [];
    
    if (fecha === ""){
        errores.push("Debe ingresar una fecha");
    }
    if(isNaN(hora[0]+hora[1]+hora[3]+hora[4])||hora[2]!=":"){
            errores.push("Formato de hora incorrecto");
        }
    if((valor<0 || valor>500)||valor===""){
        errores.push("Valor incorrecto")
    }
    if(direccion===""){
        errores.push("Debe ingresar una direccion");
    }
    if(errores.length==0){
        let lectura={};
        lectura.fecha=fecha;
        lectura.hora=hora;
        lectura.medidor=medidor;
        lectura.direccion=direccion;
        lectura.valor=valor;
        lectura.tipo_medida=tipoMedida;

        console.log(lectura);
        let resultado = await crearLectura(lectura);
        await Swal.fire("Lectura registrada", "Lectura registrada de manera exitosa","info");
        window.location.href="mediciones_existentes";
    }else{
        Swal.fire({
            title:"Errores de validacion",
            icon:"waring",
            html:errores.join("<br />")
        });
    }
});