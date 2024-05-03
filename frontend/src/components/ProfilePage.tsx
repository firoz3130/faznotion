import { Appbar } from "./Appbar";

const ProfilePage = () => {
    const user = {
        name: 'Yttes AkimahS',
        email: 'yttesakimahs@gmail.com',
        bio: `
        Just as the moon orbits the earth, my heart gravitates towards you, bound by a love as enduring and constant as the lunar cycle `,
        profilePicture: 'https://via.placeholder.com/150',
        location: 'Mangaluru, Karnataka, India',
        interests: ['Reading', 'Writing', 'Coding', 'Music']
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Appbar />
            <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mx-auto">
                        <img className="w-full h-full object-cover" src={user.profilePicture} alt="Profile" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 text-center">{user.name}</h2>
                    <h3 className="text-lg text-gray-600 text-center">{user.email}</h3>
                    <p className="text-gray-700 text-center">{user.bio}</p>
                    <p className="text-gray-700 text-center">Location: {user.location}</p>
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Follow</button>
                    <div>
                        <h4 className="font-bold text-lg text-gray-700">Interests:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {user.interests.map((interest, index) => (
                                <li key={index}>{interest}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
