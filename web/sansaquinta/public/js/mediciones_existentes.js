const cargarMedidas = async()=>{
    let medidas= await getMedidas();
    let filtroCbx = document.querySelector("#filtro-cbx");
    medidas.forEach(m=>{
        let option=document.createElement("option");
        option.innerText=m;
        option.value=m;
        filtroCbx.appendChild(option);
    });
};

const eliminacion=async function(){
    let id=this.idLectura;
    let resp= await Swal.fire({
        title: "Esta seguro?",
        text: "Esta opcion es irreversible",
        icon:"error",
        showCancelButton:true
    });
    if (resp.isConfirmed){
        if(await eliminarLectura(id)){
            let lecturas = await getLecturas();
            cargarTabla(lecturas);
            Swal.fire("Lectura Eliminada","Lectura eliminada exitosamente","info");
        }else{
            Swal.fire("Error","No se puede atender la solicitud", "error");
        }
    }else{
        Swal.fire("Accion canelada por el usuario");
    }
};

const cargarTabla = (lecturas)=>{
    let tbody=document.querySelector("#tbody-medidas");
    tbody.innerHTML="";
    for(let i=0;i<lecturas.length;i++){
        let tr=document.createElement("tr");
        let tdFecha=document.createElement("td");
        let tdHora=document.createElement("td");
        let tdMedidor=document.createElement("td");
        let tdValor = document.createElement("td");
        let tdIcon = document.createElement("td");
        let tipo_medida = lecturas[i].tipo_medida;
        let agr;
        let valorT=lecturas[i].valor;

        switch(tipo_medida){
            case "Kilowatts":
                agr = "kW";
                break;
            case "Watts":
                agr = "W";
                break;
            case "Temperatura":
                agr = "C";
                break;
        }

        if (agr ==="C"&&valorT>60){
            let a= document.createElement("i");
            a.classList.add("fas","fa-fire","text-danger","fa-1x");
            tdValor.innerText=lecturas[i].valor+" "+agr+"  ";
            tdValor.appendChild(a);
            //"fas", "fa-fire", "text-danger";
        }else{
            tdValor.innerText=lecturas[i].valor+" "+agr;
        }
        tdFecha.innerText=lecturas[i].fecha;
        tdHora.innerText=lecturas[i].hora;
        tdMedidor.innerText=lecturas[i].medidor;

        let tdAcciones=document.createElement("td");
        let botonEliminar=document.createElement("button");
        botonEliminar.innerText="Descartar Lectura";
        botonEliminar.classList.add("btn","btn-danger");
        botonEliminar.idLectura=lecturas[i].id;
        botonEliminar.addEventListener("click", eliminacion);
        tdAcciones.appendChild(botonEliminar);

        tr.appendChild(tdFecha);
        tr.appendChild(tdHora);
        tr.appendChild(tdMedidor);
        tr.appendChild(tdValor);
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
    }
};

document.querySelector("#filtro-cbx").addEventListener("change", async ()=>{
    let filtro= document.querySelector("#filtro-cbx").value;
    let lecturas = await getLecturas(filtro);

    cargarTabla(lecturas);
});

document.addEventListener("DOMContentLoaded",async ()=>{
    await cargarMedidas();
    let lecturas = await getLecturas();
    cargarTabla(lecturas);
})