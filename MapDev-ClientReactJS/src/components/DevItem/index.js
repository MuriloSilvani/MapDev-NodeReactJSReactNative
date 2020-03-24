import React from 'react';

import './styles.css';

export default function DevItem({ dev }) {
    return (
        <li className='dev-item'>
            <header>
                <img alt={dev.github_username} src={dev.avatar_url} />
                <div className='user-info'>
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github!</a>
        </li>
    )
}