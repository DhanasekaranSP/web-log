import React, { useState, useEffect } from "react";
import AdjacentPostCard from "../components/AdjacentPostCard";
import { getAdjacentPosts } from "../service/api";

interface AdjacentPost {
    previous?: {
        title: string;
        slug: string;
        createdAt: string;
        featuredImage: { url: string };
    };
    next?: {
        title: string;
        slug: string;
        createdAt: string;
        featuredImage: { url: string };
    };
}

interface AdjacentPostsProps {
    createdAt: string;
    slug: string;
}

const AdjacentPosts: React.FC<AdjacentPostsProps> = ({ createdAt, slug }) => {
    const [adjacentPost, setAdjacentPost] = useState<AdjacentPost | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getAdjacentPosts(createdAt, slug).then((result) => {
            setAdjacentPost(result);
            setDataLoaded(true);
        });
    }, [slug, createdAt]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
            {dataLoaded && adjacentPost && (
                <>
                    {adjacentPost.previous && (
                        <div
                            className={`${adjacentPost.next
                                ? "col-span-1 lg:col-span-4"
                                : "col-span-1 lg:col-span-8"
                                } adjacent-post rounded-lg relative h-72`}
                        >
                            <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />
                        </div>
                    )}
                    {adjacentPost.next && (
                        <div
                            className={`${adjacentPost.previous
                                ? "col-span-1 lg:col-span-4"
                                : "col-span-1 lg:col-span-8"
                                } adjacent-post rounded-lg relative h-72`}
                        >
                            <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdjacentPosts;
