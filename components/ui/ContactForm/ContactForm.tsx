import React from 'react';
import FormField from '../FormField';

const ContactForm: React.FC = () => {
  return (
    <section className="container mx-auto py-6 mb-12" id="contact">
      <div
        id="contact-us"
        className="overflow-hidden py-16 px-4 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="relative mx-auto max-w-xl">
          <div className="text-center">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
              Contact Us
            </h2>
            <p className="mt-4 text-lg leading-6 text-white">
              Please use the form below to contact us. Thank you!
            </p>
          </div>
          <div className="mt-12">
            <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <FormField name="name" label="Name" type="text" required={true} />
              <FormField
                name="email"
                label="Email"
                type="email"
                required={true}
              />
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    required={true}
                    name="message"
                    id="message"
                    rows={4}
                    className="border border-gray-300 block w-full rounded-md py-3 px-4"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end sm:col-span-2">
                <button
                  className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
