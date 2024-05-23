
export interface FileDisplayProps {
    fileUrl: string;
    fileType?: "image" | "video" | "pdf" | "";
    file?: Blob | null;
  }
  
export interface CreatePostAPIType {
  content: string;
  creatorId: string;
  media?: Blob | null;
}