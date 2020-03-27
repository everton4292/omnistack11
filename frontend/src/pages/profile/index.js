import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function Profile() {
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)

        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))

        } catch{
            alert('Error deleting incident, try again')
        }

    }

    function handleLogout() {
        localStorage.clear()
        history.push('/')

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt='Be the Hero' />
                <span>Welcome, {ongName}</span>
                <Link className='button' to='/incidents/new'>
                    Register a new incident
                    </Link>
                <button onClick={handleLogout} type='button'>
                    <FiPower size={18} color='#e02041' />
                </button>


            </header>
            <h1>Registered incidents</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Incident:</strong>
                        <p>{incident.title}</p>

                        <strong>Description</strong>
                        <p>{incident.description}</p>

                        <strong>Value</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

