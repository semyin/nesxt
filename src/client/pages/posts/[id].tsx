import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Post.module.css';
import { Post } from '../../../server/blog/interfaces/post.interface';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error || 'Post not found'}</p>
        <Link href="/" className={styles.backButton}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{post.title} | 2N Blog</title>
        <meta name="description" content={`${post.title} by ${post.author}`} />
      </Head>

      <main className={styles.main}>
        <article className={styles.post}>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <p>By {post.author}</p>
            <p>Published on {new Date(post.createdAt).toLocaleDateString()}</p>
            {post.updatedAt !== post.createdAt && (
              <p>Last updated on {new Date(post.updatedAt).toLocaleDateString()}</p>
            )}
          </div>

          <div className={styles.content}>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className={styles.actions}>
          <Link href="/" className={styles.backButton}>
            Back to Home
          </Link>
          <Link href={`/posts/edit/${post.id}`} className={styles.editButton}>
            Edit Post
          </Link>
          <button 
            onClick={handleDelete} 
            className={styles.deleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
      </main>
    </div>
  );
}
