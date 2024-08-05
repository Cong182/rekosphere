import React from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

interface ContactFormValues {
  photo?: string;
  connectionLevel?: string;
  name: string;
  position?: string;
  company?: string;
  placeOfMeeting?: string;
  date?: string;
  connectionToPerson?: string;
  email: string;
  linkedin?: string;
  phone?: string;
  facebook?: string;
  twitter?: string;
}

const AddContact: React.FC = () => {
  const router = useRouter();
  const initialValues: ContactFormValues = {
    photo: "",
    connectionLevel: "",
    name: "",
    position: "",
    company: "",
    placeOfMeeting: "",
    date: "",
    connectionToPerson: "",
    email: "",
    linkedin: "",
    phone: "",
    facebook: "",
    twitter: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  const handleSubmit = (values: ContactFormValues) => {
    const contact = {
      ...values,
      connections: values.connectionToPerson
        ? [values.connectionToPerson]
        : [0], // Connect to user if no other connections
    };
    console.log(contact);
    // Here you would typically send the data to your server
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Add Contact</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
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
              <label htmlFor="company">Company</label>
              <Field
                id="company"
                name="company"
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
              <label htmlFor="date">Date</label>
              <Field
                id="date"
                name="date"
                type="date"
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
            <div>
              <label htmlFor="linkedin">LinkedIn</label>
              <Field
                id="linkedin"
                name="linkedin"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <Field
                id="phone"
                name="phone"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="facebook">Facebook</label>
              <Field
                id="facebook"
                name="facebook"
                type="text"
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter</label>
              <Field
                id="twitter"
                name="twitter"
                type="text"
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
                onClick={() => router.push("/")}
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
