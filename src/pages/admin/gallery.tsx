import { useState, useEffect } from 'react';
import { Button, message, Modal, Spin, Image } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/router';

interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  createdAt: any;
}

const GalleryAdmin = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  // Fetch images from Firestore
  const fetchImages = async () => {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const imageList: GalleryImage[] = [];
      querySnapshot.forEach((documentRef) => {
        imageList.push({
          id: documentRef.id,
          ...documentRef.data(),
        } as GalleryImage);
      });
      setImages(imageList);
    } catch (error) {
      console.error('Error fetching images:', error);
      message.error('Lỗi khi tải danh sách ảnh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      message.error('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      message.error('Kích thước ảnh không được vượt quá 10MB');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;

        // Upload to Cloudinary via API route
        const uploadRes = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });

        const uploadData = await uploadRes.json();

        if (!uploadData.success) {
          throw new Error(uploadData.error);
        }

        // Save to Firestore
        await addDoc(collection(db, 'gallery'), {
          url: uploadData.url,
          publicId: uploadData.publicId,
          createdAt: new Date(),
        });

        message.success('Tải ảnh lên thành công!');
        fetchImages();
      };
    } catch (error: any) {
      console.error('Upload error:', error);
      message.error(`Lỗi khi tải ảnh: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (image: GalleryImage) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa ảnh này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          // Delete from Cloudinary
          await fetch('/api/delete-image', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId: image.publicId }),
          });

          // Delete from Firestore
          await deleteDoc(doc(db, 'gallery', image.id));

          message.success('Xóa ảnh thành công!');
          fetchImages();
        } catch (error: any) {
          console.error('Delete error:', error);
          message.error(`Lỗi khi xóa ảnh: ${error.message}`);
        }
      },
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      message.error('Lỗi khi đăng xuất');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Quản lý Gallery</h1>
            <Button onClick={handleLogout}>Đăng xuất</Button>
          </div>

          {/* Upload button */}
          <div className="mb-6">
            <label htmlFor="upload-input">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                loading={uploading}
                onClick={() => document.getElementById('upload-input')?.click()}
              >
                {uploading ? 'Đang tải lên...' : 'Thêm ảnh mới'}
              </Button>
            </label>
            <input
              id="upload-input"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              style={{ display: 'none' }}
            />
          </div>

          {/* Image grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              Chưa có ảnh nào. Hãy thêm ảnh đầu tiên!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.url}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      placeholder={<div className="w-full h-full bg-gray-200 animate-pulse" />}
                    />
                  </div>

                  {/* Delete button overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(image)}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GalleryAdmin;
