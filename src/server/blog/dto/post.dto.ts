export class CreatePostDto {
  title!: string;
  content!: string;
  author!: string;
}

export class UpdatePostDto {
  title?: string;
  content?: string;
  author?: string;
}
