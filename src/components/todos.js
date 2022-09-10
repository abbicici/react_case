import { useState, useEffect } from 'react';
import "../App.css"

function Getodo() {
    const [liste, setListe] = useState({});
    const [deger, setDeger] = useState("")
    const [son, setSon] = useState("")

    const onDelete = (e) => {
        let silin = e.target.previousSibling.previousSibling.previousSibling; fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos/' + silin.textContent, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => console.log(res))
        setListe([...liste])
    };

    const complete = (e) => {
        let cmplete = e.target.previousSibling.previousSibling;
        fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos/' + cmplete.textContent, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "isCompleted": true, "id": `${cmplete.textContent}`
            })
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }

    const onEdit = (e) => {
        let silin = e.target.previousSibling.previousSibling.previousSibling.previousSibling;
        let deger1 = prompt("Content:", "");
        setDeger(deger1)
        fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos/' + silin.textContent, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "content": `${deger}`, "id": `${silin.textContent}`
            })
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }
    const addNew = (e) => {
        if (deger.length >= 3 || deger !== "") {
            fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos/', {
                method: 'GET'
            })
                .then(res => res.json())
                .then(res => res[res.length - 1].id)
                .then(res => setSon(res))
                .then(setSon(parseInt(son) + 1)
                )
            fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos/' + son, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "content": `${deger}`, "isCompleted": false, "id": `${son}`
                })
            })
        } else {
            alert("Not Empty and minlen=3")
        }
        setDeger("")
    }


    const onChan = (e) => { setDeger(e.target.value) }


    useEffect(() => {
        fetch('https://6313d960fc9dc45cb4e6e9bc.mockapi.io/todos')
            .then((res) => res.json())
            .then((result) => {
                setListe(result);
            });
    }, [liste, deger]);



    return (<>
        <ul> {Object.values(liste).map((value, i) => <li className='todokutu' key={i}>
            {value.id} ==--
            {value.content}
            {value.iscompleted}
            <button className='comp' onClick={complete}>Completed</button>
            <button className='delete' key={i} onClick={onDelete}>Del</button>
            <button className='edit' onClick={onEdit}>Edit</button></li >)}
        </ul>
        <input onChange={onChan} placeholder="Add New ToDo"></input>
        <button className='add' onClick={addNew} placeholder='New Todo'>Add</button>

    </>
    )
}

export default Getodo;
