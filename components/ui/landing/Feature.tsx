import React from 'react';
import Image from 'next/image';
import featureImage from '@/public/feature.webp';
import Button from '../Button';
import Email from '@/components/icons/Email';
import Schedule from '@/components/icons/Schedule';
import Statistic from '@/components/icons/Statistic';
import Link from 'next/link';

const Feature = () => {

    return (
        <>
            <section className="bg-white py-8" id='features'>
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                    <div className="flex flex-col w-full md:w-2/4 justify-center items-start text-center md:text-left">
                        <div className="lg:max-w-lg">
                            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
                                Features
                            </h2>
                            <div className="w-full mb-4">
                                <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                            </div>
                            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                <div className="relative pl-10">
                                    <dt className="inline text-2xl font-semibold text-gray-900 mr-3">
                                        <Email className="absolute left-1" />
                                        Effortless Mortgage Rates
                                    </dt>
                                    <dd className="inline">Send rates with one click</dd>
                                </div>
                                <div className="relative pl-10">
                                    <dt className="inline text-2xl font-semibold text-gray-900 mr-3">
                                        <Statistic className="absolute left-1" />
                                        Analytics Dashboard
                                    </dt>
                                    <dd className="inline">Track performance in real-time</dd>
                                </div>
                                <div className="relative pl-10">
                                    <dt className="inline text-2xl font-semibold text-gray-900 mr-3">
                                        <Schedule className="absolute left-1" />
                                        Schedule Your Email
                                    </dt>
                                    <dd className="inline">Plan and Send Effortlessly</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                href="/signin"
                                id="navAction"
                                className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg transform transition hover:scale-105 duration-300 ease-in-out">
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-2/4 py-6 text-center">
                        <Image src={featureImage} alt="feature" />
                    </div>
                </div>
            </section>

        </>
    );
};

export default Feature;
