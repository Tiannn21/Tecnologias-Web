/* eslint-disable react/prop-types */
import { useState } from 'react'
import './memes.css'
import { likeMeme } from '../../services/memes'

export default function Memes({ memes, token, recargarMemes }) {
    const [urlImagen, setUrlimagen] = useState("")
    const [abrirImagen,setAbrirImagen] = useState(false)

    const handleAbrirImagen = (img_url) =>{
        setAbrirImagen(!abrirImagen)
        setUrlimagen(img_url)
    }

    const handleLikes = async (id) =>{
        const [likes, error] = await likeMeme(token,id)
        if(error) return
        if(likes)
            console.log(error)
            console.log(likes)
            recargarMemes()        
    }

    return (
        <>
        <ul className='memes'>
            {
                memes.map((meme) => (
                    <article className='meme-card' key={meme._id}>
                        <li className='meme-interior'>
                            <strong>{meme.user}</strong>
                            <p>{meme.title}</p>
                            <p>{meme.description}</p>
                            <img onClick={()=>handleAbrirImagen(meme.img_url)} width='400px' height='400px' src={meme.img_url} alt={meme.title} />
                            <div className='likes'>
                                <img onClick={()=>handleLikes(meme._id)} width="25" height="25" src="https://img.icons8.com/color/48/like--v3.png" />
                                <p>{meme.likes}</p>
                            </div>
                        </li>
                    </article>
                )
                )
            }
        </ul>
        {
            abrirImagen &&(
                <div className='overlay' onClick={()=>setAbrirImagen(false)}>
                    <div className='dialog-imagen'>
                        <img src={urlImagen} width='700' height='700'></img>
                    </div>
                </div>
            )
        }
        </>
    )
}