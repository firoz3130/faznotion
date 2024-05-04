import { useState } from 'react';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [interests, setInterests] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Add your app bar component here */}
            <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                                Bio
                            </label>
                            <input
                                type="text"
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                                Interests
                            </label>
                            <input
                                type="text"
                                id="interests"
                                value={interests}
                                onChange={(e) => setInterests(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
