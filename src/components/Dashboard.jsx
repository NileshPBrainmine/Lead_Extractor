import React from 'react';

const Dashboard = () => {
    const cardData = [
        {
            title: "Social Media Lead Extractor",
            url: "https://n8n.srv915056.hstgr.cloud/form/c9ae96c1-65fc-4be8-bcc4-58392c042e3c"
        },
        {
            title: "Domain Lead Extractor",
            url: "https://n8n.srv915056.hstgr.cloud/form/d10147d7-f0da-43fc-be33-b08f87c078b9"
        }
    ];

    return (
        <div className="text-center w-full max-w-4xl">
            <img src="https://i.imgur.com/O9M4D4z.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-3xl font-semibold text-gray-800 mb-10">Select an Extractor</h1>

            <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
                {cardData.map((card) => (
                    <div key={card.title} className="bg-white p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between text-center transition hover:-translate-y-1.5 hover:shadow-2xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">{card.title}</h3>
                        <button 
                            className="w-full py-3 rounded-lg text-white font-semibold transform transition hover:-translate-y-0.5 hover:shadow-lg bg-gradient-to-r from-green-400 to-teal-500"
                            onClick={() => window.location.href = card.url}
                        >
                            Open Extractor
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;