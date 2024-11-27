import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { PostsData, PostNode } from '../service/model';
import { GET_POSTS } from '../service/queries';
import { PostCard } from './PostCard';
import { PostWidget } from './PostWidget';
import { Categories } from './Categories';

export const Layout = () => {

    const [posts, setPosts] = useState<PostNode[]>([]); // State with typed array of posts
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const client = new GraphQLClient('https://ap-south-1.cdn.hygraph.com/content/cm3vuc0n703mb07w956nceuiv/master');
        const fetchData = async () => {
            try {
                const data: PostsData = await client.request(GET_POSTS); // Fetching data with types
                setPosts(data.postsConnection.edges.map(edge => edge.node)); // Map over edges to extract nodes
                setLoading(false);
            } catch (err) {
                setError((err as Error).message); // Catching errors
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
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
