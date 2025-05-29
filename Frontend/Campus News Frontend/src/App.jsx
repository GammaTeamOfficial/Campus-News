import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchWelcomeMessage = async () => {
            try {
                const response = await axios.get('https://campus-news-8sjx.onrender.com/')
                setMessage(response.data.message)
            } catch (error) {
                console.error('Error fetching message:', error)
                setMessage('Error connecting to server')
            }
        }

        fetchWelcomeMessage()
    }, [])

    return (
        <div style={{ padding: '20px' }}>
            <h1>Campus News</h1>
            <p>{message}</p>
        </div>
    )
}

export default App