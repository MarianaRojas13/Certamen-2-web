const getMedidas = async ()=>{
    let resultado = await axios.get("api/medidas/get");
    return resultado.data
};

const eliminarLectura = async(id)=>{
    try{
        let resp=await axios.post("api/lecturas/delete", {id}, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return resp.data == "ok";
    }catch(e){
        return false;
    }
};

const getLecturas = async(filtro="todas")=>{
    let resp;
    if (filtro=="todas"){
        resp = await axios.get("api/lecturas/get");
    }else{
        resp = await axios.get(`api/lecturas/filtrar?filtro=${filtro}`);
    }
    return resp.data;
};