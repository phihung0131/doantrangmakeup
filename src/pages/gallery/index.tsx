import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Modal, Spin } from 'antd';
import { CloseOutlined, CalendarOutlined } from '@ant-design/icons';
import Masonry from 'react-masonry-css';

interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  createdAt: any;
}

const GalleryPage = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageLoaded, setImageLoaded] = useState<{ [key: string]: boolean }>({});

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const imageList: GalleryImage[] = [];
        querySnapshot.forEach((doc) => {
          imageList.push({ id: doc.id, ...doc.data() } as GalleryImage);
        });
        setImages(imageList);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  // Masonry breakpoints
  const breakpointColumns = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 2,
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10">
            <Header />
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Title Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 font-display">
            Gallery
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập những khoảnh khắc đẹp nhất của chúng tôi
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Chưa có ảnh nào trong gallery</p>
          </div>
        ) : (
          /* Masonry Grid */
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="mb-4 group cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white">
                  {/* Image skeleton while loading */}
                  {!imageLoaded[image.id] && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}

                  {/* Image */}
                  <div className="relative">
                    <img
                      src={image.url}
                      alt="Gallery"
                      loading="lazy"
                      className={`w-full h-auto object-cover transition-all duration-300 group-hover:scale-105 ${
                        imageLoaded[image.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() =>
                        setImageLoaded((prev) => ({
                          ...prev,
                          [image.id]: true,
                        }))
                      }
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <CalendarOutlined className="mr-2" />
                            <span>{formatDate(image.createdAt)}</span>
                          </div>
                          <div className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            Xem chi tiết
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>

      {/* Lightbox Modal */}
      <Modal
        open={!!selectedImage}
        onCancel={() => setSelectedImage(null)}
        footer={null}
        width="90vw"
        style={{ top: 20, maxWidth: '1200px' }}
        closeIcon={
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
            <CloseOutlined className="text-white text-xl" />
          </div>
        }
        className="gallery-modal"
        styles={{
          body: { padding: 0 },
          content: { background: 'transparent', boxShadow: 'none' },
        }}
      >
        {selectedImage && (
          <div className="relative">
            {/* Main Image */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <img
                src={selectedImage.url}
                alt="Gallery detail"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 text-white">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center text-sm">
                  <CalendarOutlined className="mr-2 text-lg" />
                  <span className="text-base">Thêm vào: {formatDate(selectedImage.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .gallery-modal .ant-modal-content {
          background: transparent !important;
          box-shadow: none !important;
        }

        .gallery-modal .ant-modal-close {
          top: 10px;
          right: 10px;
        }

        .gallery-modal .ant-modal-close:hover {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;
