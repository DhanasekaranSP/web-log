import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Categories } from '../../components/Categories';
import { PostWidget } from '../../components/PostWidget';
import { getPostDetails } from '../../service/api';
import Loader from '../../components/Loader';
import PostDetail from '../../components/PostDetail';
import { Post } from '../../service/model';
import Author from '../../components/Author';
import AdjacentPosts from '../../sections/AdjacentPosts';

const PostDetails: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            getPostDetails(slug)
                .then((data) => {
                    setPost(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return <Loader />;

    if (!post) return <p>Post not found.</p>;

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
                    {/* <CommentsForm slug={post.slug} />
                    <Comments slug={post.slug} /> */}
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        {/* Ensure categories is safely accessed */}
                        <PostWidget
                            slug={post.slug}
                            categories={post.categories?.map((category) => category.slug) || []}
                        />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
