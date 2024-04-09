import React, { useState } from "react";
import { Carousel, Form, InputNumber, Button, Input } from 'antd';

const carouselStyles = {
    width: "640px", 
    margin: "20px auto",
    border: "solid 1px #000"
};

const headerStyles = {
    textAlign: 'center',
    marginTop: '20px',
};

export default function App() {
    const [tracks, setTracks] = useState([]);

    async function fetchData(searchTerm, limit) {
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=track&limit=${limit}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (!Array.isArray(data)) {
                setTracks([]);
            } else {
                setTracks(data.slice(0, limit));
            }
        } catch (error) {
            console.error("There was an error fetching the tracks:", error);
            setTracks([]);
        }
    }

    const onFinish = (values) => {
        fetchData(values.searchTerm, values.numberOfSongs);
    };

    return (
        <div>
            <h1 style={headerStyles}>Spotify Demo</h1>
            <div style={carouselStyles}>
                <Form layout="vertical" onFinish={onFinish} style={{marginBottom: "20px"}}>
                    <Form.Item name="searchTerm" label="Search Term" rules={[{ required: true, message: 'Please input a search term!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="numberOfSongs" label="Number of Songs (max 20)" rules={[{ required: true, message: 'Please specify the number of songs!' }]}>
                        <InputNumber min={1} max={20} initialValue={5} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form.Item>
                </Form>
                <Carousel dotPosition="top" autoplay>
                    {tracks.map(track => (
                        <iframe
                            key={track.id}
                            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
                            width="100%"
                            height="80"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{marginBottom: "20px"}}></iframe>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
