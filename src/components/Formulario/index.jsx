import { useState, useEffect } from "react"

const Formulario = () => {
    const [materiaA, setmateriaA] = useState(0);
    const [materiaB, setmateriaB] = useState(0);
    const [materiaC, setmateriaC] = useState(0);
    const [nome, setNome] = useState('');

    useEffect(()=>{
        console.log('Componente inicializado')

        return () => {
            console.log('Componente finalizado')
        }
    },[])

    useEffect(()=>{
        console.log('Você alterou o nome')
    },[nome])

    const alteraNome = (evento) => {
        //console.log(evento.target.value)
        //setNome(evento.target.value);
        setNome(estadoAnterio => {
            return evento.target.value
        })

    }

    const renderizaResultado = () => {
        const soma = Number(materiaA) + Number(materiaB) + Number(materiaC);
        const media = soma/3
        if(media >= 7){
            return <p>O aluno {nome} foi aprovado</p>
        }
        else{
            return <p>O aluno {nome} foi reprovado</p>
        }
    }

    return (
        <form>
            <ul>
            {[1,2,3,4,5].map(item => (
                <li key={item}>{item}</li>
            ))}
            </ul>            
            <input type="text" placeholder="Nome do aluno" onChange={alteraNome}/>
            <input type="number" placeholder="Nota materia A" onChange={({target}) => setmateriaA(target.value)}/>
            <input type="number" placeholder="Nota materia B" onChange={evento => setmateriaB(evento.target.value)}/>
            <input type="number" placeholder="Nota materia C" onChange={evento => setmateriaC(evento.target.value)}/>
            {renderizaResultado()}
        </form>
    )
}

export default Formulario