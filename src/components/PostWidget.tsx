import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Replace Next.js Link with React Router
import moment from 'moment';
import { Post, PostWidgetProps } from '../service/model';
import { getSimilarPosts, getRecentPosts } from '../service/api';


export const PostWidget: React.FC<PostWidgetProps> = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories || [], slug).then((result: Post[]) => {
                setRelatedPosts(result);
            });
        } else {
            getRecentPosts().then((result: Post[]) => {
                setRelatedPosts(result);
            });
        }
    }, [slug, categories]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? 'Related Posts' : 'Recent Posts'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.slug} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        {/* Use regular <img> tag instead of Next.js Image */}
                        <img
                            alt={post.title}
                            height={60}
                            width={60}
                            className="align-middle rounded-full"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4">
                        <p className="text-gray-500 font-xs">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                        <Link to={`/post/${post.slug}`} className="text-md">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

