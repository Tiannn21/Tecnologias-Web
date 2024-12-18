/* eslint-disable react/prop-types */
import './memes.css'

export default function Memes({ memes }) {
    return (
        <ul className='memes'>
            {
                memes.map((meme) => (
                    <article className='meme-card' key={meme._id}>
                        <li className='meme-interior'>
                            <strong>{meme.user}</strong>
                            <p>{meme.title}</p>
                            <p>{meme.description}</p>
                            <img width='400px' height='400px' src={meme.img_url} alt={meme.title} />
                            <div className='likes'>
                                <img width="25" height="25" src="https://img.icons8.com/ios/50/like--v1.png" alt="imagen de corazon para likes" />
                                <p>{meme.likes}</p>
                            </div>
                        </li>
                    </article>
                )
                )
            }
        </ul>
    )
}