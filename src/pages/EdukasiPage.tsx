import React from 'react';
import { useTranslation } from 'react-i18next';

const EdukasiPage = () => {
  const { t } = useTranslation();
  const videos = [
    { id: '3lWja7H9_Zw', title: t('edukasi.video1.title') },
    { id: 'LeFkkFCFbmE', title: t('edukasi.video2.title') },
    { id: 'MKJppZ18FYU', title: t('edukasi.video3.title') },
    { id: 'S7sv5U38c_0', title: t('edukasi.video4.title') },
    { id: '_50igeHW7vw', title: t('edukasi.video5.title') },
    { id: 'M5vu9vs0olc', title: t('edukasi.video6.title') },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-primary font-heading">
        {t('edukasi.title')}
      </h1>
      <p className="text-muted-foreground mb-10 max-w-3xl mx-auto text-justify">
        {t('edukasi.description')}
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
