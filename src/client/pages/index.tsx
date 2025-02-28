import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Post } from '../../server/blog/interfaces/post.interface';
import { GetServerSideProps } from 'next';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  console.log('前端打印 ++');
  
  return (
    <div className={styles.container}>
      <Head>
        <title>2N Blog</title>
        <meta name="description" content="A blog built with NestJS and NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>2N Blog</span>
        </h1>

        <p className={styles.description}>
          A full-stack blog application built with NestJS and NextJS
        </p>

        <div className={styles.grid}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link href={`/posts/${post.id}`} key={post.id} className={styles.card}>
                <h2>{post.title}</h2>
                <p>By {post.author}</p>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
              </Link>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/posts/new" className={styles.button}>
            Create New Post
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p> 2025 2N Blog</p>
      </footer>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // 本地开发或生产环境，使用传入的主机名并固定使用http协议
    // 更可靠的方式是通过请求头或配置文件确定协议
    const protocol = 'http';
    
    // 获取主机名，优先使用环境变量
    const host = process.env.API_HOST || req.headers.host || 'localhost:3000';
    
    // 构建baseUrl
    const baseUrl = `${protocol}://${host}`;
    
    console.log(`Fetching data from: ${baseUrl}/api/posts`);
    const response = await fetch(`${baseUrl}/api/posts`);
    const posts: Post[] = await response.json();
    
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error('获取文章失败:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}
