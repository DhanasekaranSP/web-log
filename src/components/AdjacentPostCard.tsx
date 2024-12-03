import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

interface AdjacentPostCardProps {
    post: {
        featuredImage: {
            url: string;
        };
        createdAt: string;
        title: string;
        slug: string;
    };
    position: "LEFT" | "RIGHT";
}

const AdjacentPostCard: React.FC<AdjacentPostCardProps> = ({ post, position }) => (
    <div className="relative w-full h-72">
        {/* Background Image */}
        <div
            className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"
            style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
        {/* Content */}
        <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
            <p className="text-white text-shadow font-semibold text-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
            </p>
            <p className="text-white text-shadow font-semibold text-2xl text-center">{post.title}</p>
        </div>
        {/* Link */}
        <Link to={`/post/${post.slug}`} className="z-10 absolute w-full h-full cursor-pointer" />
        {/* Arrow Buttons */}
        {position === "LEFT" && (
            <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 left-4 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </div>
        )}
        {position === "RIGHT" && (
            <div className="absolute arrow-btn bottom-5 text-center py-3 cursor-pointer bg-pink-600 right-4 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        )}
    </div>
);

export default AdjacentPostCard;
