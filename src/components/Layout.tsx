import { useEffect, useState } from 'react';
import { PostNode } from '../service/model';
import { PostCard } from './PostCard';
import { PostWidget } from './PostWidget';
import { Categories } from './Categories';
import { getPosts } from '../service/api';
import Loader from './Loader';

export const Layout = () => {
    const [posts, setPosts] = useState<PostNode[]>([]); // State with typed array of posts
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const result = await getPosts(); // Fetch posts using API function
                setPosts(result);
                setLoading(false);
            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto px-10 mb-8">
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

                <div className='lg:col-span-8 col-span-1'>
                    {posts.map((post) => (<PostCard post={post} key={post.title} />))}
                </div>

                <div className='lg:col-span-4 col-span-1'>
                    <div className='lg:sticky relative top-8'>
                        <PostWidget />
                        <Categories />
                    </div>
                </div>

            </div>
        </div>
    )
}
