'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import FormData from '@/app/types/data/FormData';

const LocationDataForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        area: '',
        name: '',
        difficulty: 0,
        hint: '',
        coordinates: {
            lat: 0,
            lng: 0,
        },
        keywords: [],
    });

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCoordinatesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            coordinates: {
                ...prevData.coordinates,
                [name]: parseFloat(value),
            },
        }));
    };

    const handleKeywordsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            keywords: value.split(',').map((keyword) => keyword.trim()),
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 border rounded-lg bg-gray-100"
        >
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="difficulty" className="block font-bold">
                    Difficulty:
                </label>
                <input
                    type="number"
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="hint" className="block font-bold">
                    Hint:
                </label>
                <textarea
                    id="hint"
                    name="hint"
                    value={formData.hint}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lat" className="block font-bold">
                    Latitude:
                </label>
                <input
                    type="number"
                    id="lat"
                    name="lat"
                    value={formData.coordinates.lat}
                    onChange={handleCoordinatesChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lng" className="block font-bold">
                    Longitude:
                </label>
                <input
                    type="number"
                    id="lng"
                    name="lng"
                    value={formData.coordinates.lng}
                    onChange={handleCoordinatesChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="keywords" className="block font-bold">
                    Keywords (comma-separated):
                </label>
                <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={formData.keywords.join(', ')}
                    onChange={handleKeywordsChange}
                    className="w-full border rounded px-3 py-2"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white border rounded px-4 py-2 cursor-pointer"
            >
                Submit
            </button>
        </form>
    );
};

export default LocationDataForm;
