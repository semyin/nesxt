import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post as BlogPost } from './interfaces/post.interface';

@Controller('api/posts')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(): BlogPost[] {
    console.log('findAll ++');
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): BlogPost | null {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): BlogPost | null {
    return this.blogService.create(createPostDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): BlogPost | null {
    return this.blogService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.blogService.remove(id);
  }
}
