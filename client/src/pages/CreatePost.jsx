import React, { useEffect, useState } from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setImage(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/post/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Needed to send JWT cookie
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message || 'Failed to publish post');
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          name="title"
          required
          onChange={handleChange}
        />
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TextInput
            type="text"
            placeholder="Category (e.g., react, java)"
            name="category"
            required
            onChange={handleChange}
          />
          <Select name="visibility" onChange={handleChange} required>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Select>
        </div>

        <FileInput
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {imageUploadProgress && (
          <p className="text-sm text-slate-500">
            Uploading: {imageUploadProgress}%
          </p>
        )}
        {imageUploadError && (
          <p className="text-sm text-red-500">{imageUploadError}</p>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-cover"
          />
        )}
        <textarea
          rows="10"
          placeholder="Write something..."
          className="w-full border p-2 rounded-md"
          name="content"
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
        >
          Publish
        </Button>
        {publishError && (
          <p className="text-sm text-red-500 text-center">{publishError}</p>
        )}
      </form>
    </div>
  );
}
