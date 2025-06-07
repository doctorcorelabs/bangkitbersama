import React from 'react';

const EdukasiPage = () => {
  const videos = [
    { id: '3lWja7H9_Zw', title: 'Video Edukasi 1' },
    { id: 'LeFkkFCFbmE', title: 'Video Edukasi 2' },
    { id: 'MKJppZ18FYU', title: 'Video Edukasi 3' },
    { id: 'S7sv5U38c_0', title: 'Video Edukasi 4' },
    { id: '_50igeHW7vw', title: 'Video Edukasi 5' },
    { id: 'M5vu9vs0olc', title: 'Video Edukasi 6' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary font-heading">
        Video Edukasi Kesehatan Mental
      </h1>
      <p className="text-center text-muted-foreground mb-10 max-w-3xl mx-auto">
        Selamat datang di halaman edukasi kami. Di sini Anda akan menemukan kumpulan video yang informatif dan mendukung, dirancang untuk membantu Anda memahami lebih dalam tentang kesehatan mental, strategi pengelolaan stres, dan berbagai teknik untuk meningkatkan kesejahteraan emosional Anda. Kami percaya bahwa pengetahuan adalah langkah pertama menuju perubahan positif. Saksikan video-video pilihan kami untuk memulai perjalanan Anda menuju pikiran yang lebih sehat.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <div key={index} className="bg-card p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            {/* You could add a title below the video if needed: */}
            {/* <h2 className="text-lg font-semibold mt-3 text-foreground">{video.title}</h2> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EdukasiPage;
