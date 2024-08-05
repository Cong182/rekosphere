import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface ContactFormValues {
  photo: string;
  connectionLevel: string; // Required field
  name: string; // Required field
  position?: string;
  placeOfMeeting?: string;
  connectionToPerson?: string;
  email?: string;
}

interface AddContactProps {
  onAddContact: (values: ContactFormValues) => void;
  onCancel: () => void; // Add a new prop for cancel
}

const AddContact: React.FC<AddContactProps> = ({ onAddContact, onCancel }) => {
  // Use the new prop
  const initialValues: ContactFormValues = {
    photo: "",
    connectionLevel: "",
    name: "",
    position: "",
    placeOfMeeting: "",
    connectionToPerson: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    connectionLevel: Yup.string().required("Required"),
  });

  return (
    <div>
      <h1 className="text-2xl mb-4">Add Contact</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAddContact(values);
          resetForm();
        }}
      >
        {({ setFieldValue, resetForm }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="photo">Photo</label>
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    setFieldValue("photo", URL.createObjectURL(file));
                  }
                }}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="connectionLevel">Connection Level</label>
              <Field
                as="select"
                id="connectionLevel"
                name="connectionLevel"
                className="mt-1 block w-full"
              >
                <option value="">Select Level</option>
                <option value="A">Level 1</option>
                <option value="B">Level 2</option>
                <option value="C">Level 3</option>
                <option value="D">Level 4</option>
              </Field>
            </div>
            <div>
              <label htmlFor="name">Name and Surname</label>
              <Field
                id="name"
                name="name"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="position">Position</label>
              <Field
                id="position"
                name="position"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="placeOfMeeting">Place of Meeting</label>
              <Field
                id="placeOfMeeting"
                name="placeOfMeeting"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="connectionToPerson">Connection to a Person</label>
              <Field
                id="connectionToPerson"
                name="connectionToPerson"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded"
                // Update this onClick handler to use onCancel
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddContact;
