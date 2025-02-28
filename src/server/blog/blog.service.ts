import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogService {
  private posts: Post[] = [];

  findAll(): Post[] {
    console.log('abc ---');
    
    const posts: Post[] = [
      {
        id: uuidv4(),
        title: 'Hello World',
        content: 'This is my first post',
        author: '2N',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: 'Hello World 2',
        content: 'This is my second post',
        author: '2N',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    return posts;
  }

  findOne(id: string): Post | null {
    return this.posts.find(post => post.id === id) || null;
  }

  create(createPostDto: CreatePostDto): Post {
    const post: Post = {
      id: uuidv4(),
      ...createPostDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.posts.push(post);
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto): Post | null {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts[index] = {
        ...this.posts[index],
        ...updatePostDto,
        updatedAt: new Date().toISOString(),
      };
      return this.posts[index];
    }
    return null;
  }

  remove(id: string): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
