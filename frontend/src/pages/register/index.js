import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapps, setWhatsapps] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()


    async function handleRegister(e) {
        e.preventDefault()
        const data = {
            name,
            email,
            whatsapps,
            city,
            uf
        }

        try {
        const response = await api.post('ongs', data)
        alert(`Your acess ID: ${response.data.id}`)
        history.push('/')
        }
        catch(err) {
            alert('Error in the register, try again')
        }

    }
    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Register</h1>
                    <p>Register, enter in the platform and make it easier for people to help your Institution</p>
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#e02041' />
                        Already registered
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder='Institution name'
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input
                        placeholder='Whatsapps'
                        value={whatsapps}
                        onChange={e => setWhatsapps(e.target.value)} />

                    <div className="input-group">
                        <input
                            placeholder='City'
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input
                            placeholder='State'
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 95 }} />
                    </div>
                    <button className='button' type='submit'>Register</button>

                </form>
            </div>
        </div >
    )
}