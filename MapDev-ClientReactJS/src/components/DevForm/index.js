import React, { useState, useEffect } from 'react';

import './styles.css';

export default function DevForm({ onSubmit, infoMessage }) {

    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            }, (error) => {
                console.log(error);
            },
            {
                timeout: 30000,
            }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        })

        setGithub_username('');
        setTechs('');

    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='input-block'>
                <label htmlFor='github_username'> Usuário doGithub </label>
                <input name='github_username' id='github_username'
                    value={github_username} onChange={e => { setGithub_username(e.target.value) }} />
            </div>

            <div className='input-block'>
                <label htmlFor='techs'> Tecnologias </label>
                <input name='techs' id='techs'
                    value={techs} onChange={e => { setTechs(e.target.value) }} />
            </div>

            <div className='input-group'>
                <div className='input-block'>
                    <label htmlFor='latitude'> Latitude </label>
                    <input name='latitude' id='latitude'
                        type='number' value={latitude} onChange={e => { setLatitude(e.target.value) }} />
                </div>

                <div className='input-block'>
                    <label htmlFor='longitude'> Longitude </label>
                    <input name='longitude' id='longitude'
                        type='number' value={longitude} onChange={e => { setLongitude(e.target.value) }} />
                </div>
            </div>

            {
                infoMessage && (
                    <div className='input-block'>
                        <input className={`input-info ${infoMessage.status}`} type='text' value={infoMessage.message} disabled />
                    </div>
                )
            }

            <button type='submit'> Salvar </button>


        </form>
    )
}