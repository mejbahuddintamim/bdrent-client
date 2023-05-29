import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AddServiceForm from "../../Components/Form/AddServiceForm";
import { imageUpload } from "../../api/imageUpload";
import { addHome } from "../../api/services";
import { AuthContext } from "../../contexts/AuthProvider";

const AddHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const category = event.target.category.value;
    const location = event.target.location.value.toLowerCase();
    const price = event.target.price.value;
    const guest_capacity = event.target.guestcapacity.value;
    const from = event.target.from.value;
    const to = event.target.to.value;
    const bedrooms = event.target.bedroom.value;
    const bathrooms = event.target.bathroom.value;
    const description = event.target.description.value;
    const image = event.target.image.files[0];

    if (category === "") {
      return toast.error("Please select a category");
    }

    setLoading(true);
    imageUpload(image)
      .then((data) => {
        const homeData = {
          title,
          category,
          location,
          price: parseInt(price),
          guest_capacity,
          from,
          to,
          bedrooms,
          bathrooms,
          description,
          image: data,
          host: {
            name: user?.displayName,
            image: user?.photoURL,
            email: user?.email,
          },
        };

        addHome(homeData).then((data) => {
          console.log(data);
          setLoading(false);
          if (data.insertedId) {
            toast.success("Home added successfully");
            navigate("/dashboard/manage-homes");
          }
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // image preview
  const handleImageChange = (image) => {
    console.log(image);
    setPreview(window.URL.createObjectURL(image));
  };
  return (
    <div className="container mx-auto px-5 sm:px-8 py-8 flex justify-center items-center">
      <div className="w-full sm:w-7/12">
        <h1 className="text-3xl font-bold text-gray-600 py-4 text-center shadow rounded-lg bg-gray-50">
          Add Home
        </h1>
        <AddServiceForm
          handleSubmit={handleSubmit}
          loading={loading}
          preview={preview}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default AddHome;
